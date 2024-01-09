import jwt from "jsonwebtoken";
import type { z } from "zod";

export function createJwtToken<T extends Record<string, unknown>>(
  payload: T,
  secret: string
) {
  const token = jwt.sign(payload, secret, { expiresIn: "12h" });

  return token;
}

export function validateJwtToken<Schema extends z.ZodType>(
  token: string,
  secret: string,
  schema: Schema
): Schema["_output"] {
  const verified = jwt.verify(token, secret);

  return schema.parse(verified);
}
