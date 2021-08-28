import { Connection, DatabaseDriver, EntityManager } from "@mikro-orm/core";

export type MyContext={
    em:EntityManager<any> & EntityManager<DatabaseDriver<Connection>>
}