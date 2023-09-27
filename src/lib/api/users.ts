import { db } from "../db";

import { user } from "../db/schema/schema";

export default async function getUsers() {

  const users = await db.select({
    name: user.name,
  }).from(user).execute();
  return users;
}
