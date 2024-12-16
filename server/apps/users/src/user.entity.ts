import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  role: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class RegisterResponse {
  @Field()
  activationToken: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field()
  user: User;
}
