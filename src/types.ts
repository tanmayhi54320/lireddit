import { Connection, DatabaseDriver, EntityManager } from "@mikro-orm/core";
import { Request,Response} from "express";
export type MyContext={
    em:EntityManager<any> & EntityManager<DatabaseDriver<Connection>>;
    req:Request;
    res:Response;
}