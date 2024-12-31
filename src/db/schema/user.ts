import { SQL, ColumnBaseConfig, ColumnDataType } from "drizzle-orm";
import { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgEnum, pgTable, uniqueIndex  } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";


export const users = pgTable(
  "users",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: t.varchar("first_name", { length: 256 }),
    lastName: t.varchar("last_name", { length: 256 }),
    email: t.varchar().notNull(),
    invitee: t.integer().references((): AnyPgColumn => users.id),
    role: rolesEnum().default("guest"),
  },
  (table: { email: SQL<unknown> | Partial<t.ExtraConfigColumn<ColumnBaseConfig<ColumnDataType, string>>>; }) => {
    return {
      emailIndex: uniqueIndex("email_idx").on(table.email),
    };
  }
);

export const posts = pgTable(
    "posts",
    {
      id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
      slug: t.varchar().$default(() => generateUniqueString(16)),
      title: t.varchar({ length: 256 }),
      ownerId: t.integer("owner_id").references(() => users.id),
    },
    (table: { slug: SQL<unknown> | Partial<t.ExtraConfigColumn<ColumnBaseConfig<ColumnDataType, string>>>; title: SQL<unknown> | Partial<t.ExtraConfigColumn<ColumnBaseConfig<ColumnDataType, string>>>; }) => {
      return {
        slugIndex: t.uniqueIndex("slug_idx").on(table.slug),
        titleIndex: t.index("title_idx").on(table.title),
      };
    }
  );
  export const comments = pgTable("comments", {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    text: t.varchar({ length: 256 }),
    postId: t.integer("post_id").references(() => posts.id),
    ownerId: t.integer("owner_id").references(() => users.id),
  });


function generateUniqueString(length: number = 12): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uniqueString = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueString += characters[randomIndex];
    }
    return uniqueString;
  }
