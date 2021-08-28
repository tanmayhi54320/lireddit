import { User } from "../entities/User";
import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import argon2 from "argon2";

@InputType()
class UserNameandPassword{
    @Field()
    username:string;
    @Field()
    password:string;
}

@ObjectType()
class UserResponse{
    @Field()
    errors?:Error[];

    @Field()
    user?:User;
}

@Resolver()
export class UserResolver{
    @Mutation(() => User)
    async register(
        @Arg('options') Option:UserNameandPassword,
        @Ctx() { em }:MyContext
    ){
        const hashedPassword=await argon2.hash(Option.password);
        const user=em.create(User,{username:Option.username,password:hashedPassword});
        await em.persistAndFlush(user);
        return user;
    }

    @Mutation(()=>User)
    async login(
        @Arg('options') Option:UserNameandPassword,
        @Ctx() { em }:MyContext
    ){
        const user=em.findOne(User,{username:Option.username})
        if(!user){

        }
    }
}