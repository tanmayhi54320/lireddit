import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
// import { UserResolver } from "./resolvers/user";
const main=async()=>{
    const orm =await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();
    // const post = orm.em.create(Post,{title:"My first Post"});
    // orm.em.persistAndFlush(post);

    const app=express();
    const apolloServer=new ApolloServer({
        schema:await buildSchema({
            resolvers:[HelloResolver,PostResolver,UserResolver],
            validate:false,
        }),
        context:()=>({ em : orm.em })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4001,()=>{
        console.log("Server running on 4001");
    })
};
main();