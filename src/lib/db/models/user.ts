import { users, usersFriends } from "../schema/schema"
import {
    int,
    timestamp,
    mysqlTable as defaultMySqlTableFn,
    primaryKey,
    varchar,
    MySqlTableFn,
    MySqlDatabase,
} from "drizzle-orm/mysql-core"
import { and, eq, or, ne } from "drizzle-orm"

export interface IUser {
    username: string;
    password: string;
    email: string;
}

// [
//     ResultSetHeader {
//       fieldCount: 0,
//       affectedRows: 1,
//       insertId: 6,
//       info: '',
//       serverStatus: 2,
//       warningStatus: 0,
//       changedRows: 0
//     },
//     undefined
//   ]

type insertResult = {
    0 : {
        fieldCount: number,
        affectedRows: number,
        insertId: number,
        info: string,
        serverStatus: number,
        warningStatus: number,
        changedRows: number
    }
}

export class User {
    client: InstanceType<typeof MySqlDatabase>

    constructor(client: MySqlDatabase<any, any>) {
        this.client = client
    }

    /**
     * Create a new user from the given data
     * @param data 
     * @returns created user
     */
    async createUser(data: IUser) {
        // CHECK IF USER ALREADY EXISTS
        const user = await this.getUserByEmail(data.email)

        // if user exists, throw error
        if (user) {
            throw new Error("User already exists")
        }


        // generate random tag
        const randTag = await this.generateTag(data.username)
        console.log(randTag);

        // create user credentials object
        const userCredentials = {
            ...data,
            tag: randTag,
        }

        // insert user into database
        const id = await this.client.insert(users).values(userCredentials).execute() as insertResult

        // return user credentials
        return await this.client
            .select()
            .from(users)
            .where(eq(users.id, id[0].insertId as number))
            .then((res) => res[0])
    }

    async generateTag(username: string) {
        let tag = Math.floor(Math.random() * 8999) + 1000
        while (await this.userExistsWithTag(username, tag)) {
            tag = Math.floor(Math.random() * 8999) + 1000
        }
        return tag
    }

    async userExistsWithTag(username: string, tag: number) {
        const user = await this.client
            .select()
            .from(users)
            .where(and(eq(users.username, username), eq(users.tag, tag)))
            .then((res) => res[0])

        return user ?? false
    }

    async updateUser() {
        // ...
    }

    async deleteUser() {
        // ...
    }

    async getUser(id: number) {
        const user = await this.client
            .select()
            .from(users)
            .where(eq(users.id, id))
            .then((res) => res[0])
    }

    async getUsers() {
        const allUsers = await this.client
            .select()
            .from(users)
            .then((res) => res)

        return users
    }

    async getUserByEmail(email: string) {
        const user =
            (await this.client
                .select()
                .from(users)
                .where(eq(users.email, email))
                .then((res) => res[0])) ?? null

        return user
    }

    async getFriends(userId: number) {
        const friends = (await this.client
                .select({
                    id: users.id,
                    username: users.username,
                    tag: users.tag,
                    email: users.email,
                }
                )
                .from(usersFriends)
                .where(
                    or(
                        eq(usersFriends.fromFriendId, userId), 
                        eq(usersFriends.toFriendId, userId)
                    )
                )
                .innerJoin(users, or(
                    and(
                        eq(users.id, usersFriends.fromFriendId),
                        ne(users.id, userId)
                        ) ,
                    and(
                        eq(users.id, usersFriends.toFriendId),
                        ne(users.id, userId)
                        ),
                    )
                )
                .then((res) => res)) ?? null
        return friends
    }
}