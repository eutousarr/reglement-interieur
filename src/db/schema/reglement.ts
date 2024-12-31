import { integer, text, boolean, pgTable, timestamp } from "drizzle-orm/pg-core";

// columns.helpers.ts
const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
  }
  
export const chapitre = pgTable("chapitre", {
  id: integer("id").primaryKey(),
  titre: text("text").notNull(),
  valide: boolean("valide").default(true).notNull(),
  ...timestamps

});


export const article = pgTable("article",{
  id: integer("id").primaryKey(),
  titre: text("titre").notNull(),
  text: text("text").notNull(),
  chapitreId: integer("chapitre_id").references(() => chapitre.id),
  valide: boolean("valide").default(false).notNull(),
  ...timestamps
});

export const alinea = pgTable("alinea", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  articleId: integer("article_id").references(() => article.id)
});
