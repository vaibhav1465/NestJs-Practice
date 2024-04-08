import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class SampleReponse{

    @Field()
    data : string

}