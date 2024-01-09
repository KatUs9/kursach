import {
  integer,
  pgTable,
  serial,
  varchar,
  boolean,
  pgEnum,
  timestamp,
  text,
  numeric
} from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 24 }).notNull(),
  width: integer("width").notNull(),
  wUnits: varchar("w_units", { length: 12 }).notNull(),
  height: integer("height").notNull(),
  hUnits: varchar("h_units", { length: 12 }).notNull(),
  mimeType: varchar("mime_type", { length: 255 }).notNull()
});

export const users = pgTable("users", {
  id: serial("user_id").primaryKey(),
  login: varchar("login", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 72 }).notNull(),
  isAdmin: boolean("is_admin").notNull()
});

export const petTypeEnum = pgEnum("pet_type", ["dog", "cat"]);

export const genderEnum = pgEnum("gender", ["male", "female"]);

export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  type: petTypeEnum("type").notNull(),
  gender: genderEnum("gender").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  birthDate: timestamp("birth_date", { withTimezone: true }).notNull(),
  description: text("description").notNull(),
  imageId: integer("image_id")
    .references(() => images.id)
    .notNull()
});

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  petId: integer("pet_id")
    .references(() => pets.id)
    .notNull()
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 255 }).notNull(),
  sum: numeric("sum", { scale: 2, precision: 20 }).notNull()
});
