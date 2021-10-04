import { Connection, DatabaseDriver, EntityManager } from "@mikro-orm/core";
import { Session, SessionData } from "express-session";
import { Request,Response} from "express";
export type MyContext={
    em:EntityManager<any> & EntityManager<DatabaseDriver<Connection>>;
    req: Request & {
        session: Session & Partial<SessionData> & { UserID: number };
    };
    res:Response;
}