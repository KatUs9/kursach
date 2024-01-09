import fs from "node:fs";
import path from "node:path";

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  return new Response(
    fs.ReadStream.toWeb(
      fs.createReadStream(path.join("images", params.filename as string))
    ) as ReadableStream
  );
};
