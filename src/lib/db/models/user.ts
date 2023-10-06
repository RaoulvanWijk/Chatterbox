import { users } from "../schema/schema"
import {
    int,
    timestamp,
    mysqlTable as defaultMySqlTableFn,
    primaryKey,
    varchar,
    MySqlTableFn,
    MySqlDatabase,
  } from "drizzle-orm/mysql-core"
  import { and, eq } from "drizzle-orm"

export interface IUser {
    username: string;
    password: string;
    email: string;
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

        // generate random id
        const id = crypto.randomUUID()

        // generate random tag
        const randTag = await this.generateTag(data.username)
        console.log(randTag);
        
        // create user credentials object
        const userCredentials = {
            ...data,
            id,
            tag: randTag,
        }

        // insert user into database
        await this.client.insert(users).values(userCredentials)

        // return user credentials
        return await this.client
            .select()
            .from(users)
            .where(eq(users.id, id))
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

    async getUser(id: string) {
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
}