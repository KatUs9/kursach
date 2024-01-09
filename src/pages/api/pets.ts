import fs from "node:fs/promises";
import path from "node:path";
import stream from "node:stream";
import streamWeb from "node:stream/web";
import { createId } from "@paralleldrive/cuid2";
import probe from "probe-image-size";

import { buildErrorResponse } from "@/lib/response";

import type { APIRoute } from "astro";
import { db } from "@/lib/db";
import { images, pets } from "db/schema";

const allowedMimetypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  const file = formData.get("image");

  if (!file) {
    return buildErrorResponse("No image found in form", 400);
  }

  if (!(file instanceof File)) {
    return buildErrorResponse("Image has to be a file", 400);
  }

  if (!allowedMimetypes.includes(file.type)) {
    return buildErrorResponse("Image mimetype is forbbiden to upload", 400);
  }

  const uploadedImage = await uploadImage(file);
  const birthDate = formData.get("birthDate");
  const gender = formData.get("gender");
  const type = formData.get("type");
  const name = formData.get("name");
  const description = formData.get("description");

  if (
    typeof birthDate != "string" ||
    typeof gender != "string" ||
    typeof type != "string" ||
    typeof name != "string" ||
    typeof description != "string" ||
    (gender != "male" && gender != "female") ||
    (type != "dog" && type != "cat")
  ) {
    return buildErrorResponse("Invalid form", 400);
  }

  await db.insert(pets).values({
    birthDate: new Date(birthDate),
    gender,
    imageId: uploadedImage.id,
    description,
    name,
    type
  });

  return redirect("/");
};

async function uploadImage(file: File) {
  const filename = createId();

  const [_, { wUnits, width, hUnits, height }] = await Promise.all([
    fs.writeFile(
      path.join("images", filename),
      new Uint8Array(await file.arrayBuffer())
    ),
    probe(stream.Readable.fromWeb(file.stream() as streamWeb.ReadableStream))
  ]);

  const insertedImages = await db
    .insert(images)
    .values({
      filename,
      height,
      hUnits,
      mimeType: file.type,
      width,
      wUnits
    })
    .returning();

  return insertedImages[0];
}
