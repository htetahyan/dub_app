import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fullName: text("full_name"),
    phone: varchar("phone", { length: 256 }),
    email: varchar("email", { length: 256 }),
});
export const external_providers = pgTable("external_providers", {
    id: serial("id").primaryKey(),
    provider: varchar("provider", { length: 256 }),
    provider_id: varchar("provider_id", { length: 256 }),
    provider_name: varchar("provider_name", { length: 256 }),
    user_id: serial("user_id").references(() => users.id),

})
export const usersAndExternalRelations=relations(external_providers,({one})=>({
provider:one(users,{
fields:[external_providers.user_id],
references:[users.id]
})
}))
