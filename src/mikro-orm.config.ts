import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import {Users } from "./entities/User";
export default{
    migrations:{
        path: path.join(__dirname,'./migrations'), 
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities:[Post,Users],
    dbName:"lireddit",
    type:"postgresql",
    password:"postgres",
    debug:!__prod__,
    port:5432,
} as Parameters<typeof MikroORM.init>[0];
