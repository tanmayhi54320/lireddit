import { Users } from "../entities/User";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";

@InputType()
class UserNameandPassword {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Users, { nullable: true })
  user?: Users;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") Option: UserNameandPassword,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(Option.password);
    const user = em.create(Users, {
      username: Option.username,
      password: hashedPassword,
    });
      await em.persistAndFlush(user);
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") Option: UserNameandPassword,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(Users, { username: Option.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "That username does'nt exist",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, Option.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "The password doesn't exist",
          },
        ],
      };
    }
    return {
      user,
    };
  }
}
