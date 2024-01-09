import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import "dotenv/config";

const db = drizzle(postgres(process.env.DATABASE_URL!, { max: 1 }));

await migrate(db, { migrationsFolder: "./drizzle" });

process.exit();
