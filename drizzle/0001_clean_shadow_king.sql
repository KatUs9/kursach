CREATE TABLE IF NOT EXISTS "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"filename" varchar(24) NOT NULL,
	"width" integer NOT NULL,
	"w_units" varchar(12) NOT NULL,
	"height" integer NOT NULL,
	"h_units" varchar(12) NOT NULL,
	"mime_type" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "image_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets" ADD CONSTRAINT "pets_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
