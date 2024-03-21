import { index, int, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core';
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
    slug: varchar('slug', { length: 256 }),
    type_id: int('type_id').references(() => type.id, { onDelete: 'cascade' }), // Changed to 'cascade'
    techs: varchar('techs', { length: 256 }),
    content: text('content'),
    image: varchar('image', { length: 256 }),
    author_id: int('user_id').notNull(),
    view_count: int('view_count').default(0),
    created_at: int('created_at'),
});

export const sessions = mysqlTable("sessions", {
    id: int("id").primaryKey().autoincrement(),
    user_id: int("user_id").references(() => users.id, { onDelete: 'cascade' }), // Changed to 'cascade'
    created_at: timestamp("created_at").defaultNow(),
    agent: varchar("agent", { length: 256 }),
});

export const techs = mysqlTable('techs', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 256 }),
    created_at: timestamp('created_at').defaultNow(),
});

export const type = mysqlTable('type', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 256 }),
});

export const blogs_techs = mysqlTable('blogs_techs', {
    blog_id: int('blog_id').references(() => blog.id, { onDelete: 'cascade' }), // Changed to 'cascade'
    tech_id: int('tech_id').references(() => techs.id, { onDelete: 'cascade' }), // Changed to 'cascade'
}, (t) => ({
    blogs_techsIdx: index('blogs_techs_idx').on(t.blog_id, t.tech_id)
}));

export const likes = mysqlTable('likes', {
    id: int('id').primaryKey().autoincrement(),
    user_id: int('user_id').references(() => users.id, { onDelete: 'cascade' }), // Changed to 'cascade'
    blog_id: int('blog_id').references(() => blog.id, { onDelete: 'cascade' }), // Changed to 'cascade'
});

export type USER = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type TYPE=typeof type.$inferSelect
export type BLOG = typeof blog.$inferSelect;
