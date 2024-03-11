import {integer, pgEnum, pgTable, serial, text, timestamp, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {PgTable} from "drizzle-orm/pg-core/table";
import {smallserial} from "drizzle-orm/pg-core/columns/smallserial";
import {InferInsertModel, InferModel, InferSelectModel} from "drizzle-orm/table";
const role=pgEnum('role', ['author', 'user'])
// Assuming a generic ORM syntax
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("full_name"),

    created_at: timestamp("created_at").defaultNow(),
    photo: text("photo").notNull().default("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
    email: varchar("email", { length: 256 }),
});

export const blog = pgTable('blogs', {
    id: serial('id').primaryKey(),
    title: text('title'),

    content: text('content'),
    image: text('image'), // Assuming 'image' is a text field for the URL
    author_id: integer('user_id').notNull()
  , // Assuming 'integer' is the correct type for foreign keys

    view_count: integer('view_count').default(0), // Changed to integer with default 0
    created_at: timestamp('created_at').defaultNow(),
});
export const usersRelations = relations(users, ({ many }) => ({
    blogs: many(blog)
}));

export const blogRelations = relations(blog, ({ one }) => ({
    author: one(users, {
        fields: [blog.author_id],
        references: [users.id]
    })
}));


export const sessions = pgTable("sessions", {
    id: serial("id").primaryKey(),
    user_id: serial("user_id").references(() => users.id),
    created_at: timestamp("created_at").defaultNow(),
    agent: varchar("agent", { length: 256 }),
})
export const sessionsAndUserRelations=relations(sessions,({one})=>({
user:one(users,{
fields:[sessions.user_id],
references:[users.id]
})
}))
export type InferSelectUser=InferSelectModel<typeof users>
export type InsertUser=InferInsertModel<typeof users>
export type SelectUser = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;