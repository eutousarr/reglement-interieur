CREATE TABLE "alinea" (
	"id" integer PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"article_id" integer
);
--> statement-breakpoint
CREATE TABLE "article" (
	"id" integer PRIMARY KEY NOT NULL,
	"titre" text NOT NULL,
	"text" text NOT NULL,
	"chapitre_id" integer,
	"valide" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "chapitre" (
	"id" integer PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"valide" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "todo" (
	"id" integer PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"auteur" text  NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "alinea" ADD CONSTRAINT "alinea_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_chapitre_id_chapitre_id_fk" FOREIGN KEY ("chapitre_id") REFERENCES "public"."chapitre"("id") ON DELETE no action ON UPDATE no action;