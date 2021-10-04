import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver{

/****************************Return all Post***************************/
    @Query(()=>[Post])
    posts( @Ctx() { em }:MyContext):Promise<Post[]>{
        return em.find(Post,{});
    }

/******************************Find by Id********************* */
    @Query(()=> Post , {nullable:true} )
    post( @Arg('id',()=>Int) id:number, @Ctx() { em } : MyContext):Promise<Post | null>{
         return em.findOne(Post,{id});
    }

/******************************CreatePost****************************/
    @Mutation(()=>Post , {nullable:true})
    async createPost(
        @Arg('title') title:string,
        @Ctx() { em }:MyContext
    ) : Promise<Post | null>{
        const post=em.create(Post , {title})
        await em.persistAndFlush(post)
        return post
    }

/******************************Update Post***************************/
    @Mutation(()=>Post , {nullable:true})
    async updatePost(
        @Arg('id') id:number,
        @Arg('title',()=>String,{nullable:true}) title:string,
        @Ctx() { em } : MyContext
    ) : Promise <Post | null>{
        const post=await em.findOne(Post ,{id});
        if(!post){
            return null;
        }
        else{
            post.title=title;
            em.persistAndFlush(post);
        }
        return post;
    }

/********************************DeletePost******************************/
    @Mutation(()=>Boolean)
    async deletePost(
        @Arg('id') id:number,
        @Ctx() { em }:MyContext,
    ): Promise<boolean>{
        await em.nativeDelete(Post,{id});
        return true;
    }
}