import { userMessages, message as Tmessage, users } from "../schema/schema"
import {
    int,
    timestamp,
    mysqlTable as defaultMySqlTableFn,
    primaryKey,
    varchar,
    MySqlTableFn,
    MySqlDatabase,
} from "drizzle-orm/mysql-core"
import { and, eq, or, ne, asc, desc, inArray } from "drizzle-orm"
import { User } from "./user";

export interface IChat {
    fromUserId: number;
    toUserId: number;
    message: string;
    // timestamp: number;
}

interface IUserMessage {
    id?: number;
    message_id?: number;
    to_user_id?: number;
    has_seen?: number;
    created_at?: string;
    updated_at?: string;
}


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

export class Chat {
    client: InstanceType<typeof MySqlDatabase>

    constructor(client: MySqlDatabase<any, any>) {
        this.client = client
    }

    async sendMessage(data: IChat) {
        const messageCredentials = {
            fromUserId: data.fromUserId as number,
            message: data.message,
            // createdAt: Date.now(),
            // updatedAt: Date.now()
        }

        const message = await this.client.insert(Tmessage).values(messageCredentials).execute() as insertResult;
        
        const userMessageCredentials = {
            messageId: message[0].insertId as number,
            toUserId: data.toUserId,
            hasSeen: 0,
            // createdAt: Date.now(),
            // updatedAt: Date.now(),
        };

        const userMessage = await this.client
            .insert(userMessages)
            .values(userMessageCredentials)
            .execute() as insertResult;

    }

    async getMessagesToUser(userId: number, friendId: number) {
        let messages = await this.client
            .select().from(userMessages)
            .innerJoin(Tmessage, eq(userMessages.messageId, Tmessage.id))
            .where(or(
                and(
                    eq(userMessages.toUserId, userId),
                    eq(Tmessage.fromUserId, friendId)
                ),
                and(
                    eq(userMessages.toUserId, friendId),
                    eq(Tmessage.fromUserId, userId)
                )
            )
            )
            .orderBy(desc(Tmessage.createdAt)).execute()
                
            console.log(messages);
            
        // Get all fromUserId from the messages
        let uniqueUsers: any[] =[];
        if(messages.length !== 0) {
            let fromUserIds = [0];
            for(let i = 0; i < messages.length; i++) {
                fromUserIds.push(messages[i].message.fromUserId as number);
            }
            // fromUserIds: (number|null)[] = messages.map((message) => message.message.fromUserId);
            if(fromUserIds.length !== 0) {
                uniqueUsers = await this.client.select().from(users).where(inArray(users.id, fromUserIds)).execute();
            }
        }
        return {
            messages: messages,
            uniqueUsers: uniqueUsers
        }
    }
}