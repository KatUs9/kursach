import { z } from "zod";

import { validateJwtToken } from "./jwt";
import { db } from "./db";
import { users } from "db/schema";

import type { AstroCookies } from "astro";
import { eq } from "drizzle-orm";

export async function getSession(cookies: AstroCookies) {
  const authToken = cookies.get("auth-token");

  if (!authToken) {
    return null;
  }

  const parsed = validateJwtToken(
    authToken.value,
    import.meta.env.JWT_SECRET,
    z.object({
      userId: z.number()
    })
  );

  const dbUsers = await db
    .select()
    .from(users)
    .where(eq(users.id, parsed.userId));

  if (dbUsers.length != 1) {
    return null;
  }

  return dbUsers[0];
}
