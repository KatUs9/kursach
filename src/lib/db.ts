import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";
import * as schema from "db/schema";

export const db = drizzle(postgres(import.meta.env.DATABASE_URL), {
  schema,
  logger: true
});
