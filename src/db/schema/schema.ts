import {index, int, mysqlTable, text, timestamp, varchar} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

const role = mysqlTable('role', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 256 }),
}, (role) => ({
    roleIdx: index('role_idx').on(role.name),
}));

export const users = mysqlTable("users", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("full_name", { length: 256 }),
    created_at: timestamp("created_at").defaultNow(),
    photo: varchar("photo", { length: 256 }).notNull().default("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
    email: varchar("email", { length: 256 }),
});

export const blog = mysqlTable('blogs', {
    id: int('id').primaryKey().autoincrement(),
    title: varchar('title', { length: 256 }),
techs: varchar('techs', { length: 256 }),
    content: text('content'),
    image: varchar('image', { length: 256 }), // Assuming 'image' is a text field for the URL
    author_id: int('user_id').notNull(),
    view_count: int('view_count').default(0), // Changed to integer with default 0
    created_at: int('created_at'),
});
export type BLOG = typeof blog.$inferSelect;
export const usersRelations = relations(users, ({ many }) => ({
    blogs: many(blog)
}));

export const blogRelations = relations(blog, ({ one, many }) => ({
    author: one(users, {
        fields: [blog.author_id],
        references: [users.id]
    }),
    techs: many(techs)
}));

export const sessions = mysqlTable("sessions", {
    id: int("id").primaryKey().autoincrement(),
    user_id: int("user_id").references(() => users.id),
    created_at: timestamp("created_at").defaultNow(),
    agent: varchar("agent", { length: 256 }),
})

export const sessionsAndUserRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.user_id],
        references: [users.id]
    })
}));

export const techs = mysqlTable('techs', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 256 }),
    created_at: timestamp('created_at').defaultNow(),
});

export const techsRelations = relations(techs, ({ many }) => ({
    blogs: many(blog)
}));
export type SelectUser = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
