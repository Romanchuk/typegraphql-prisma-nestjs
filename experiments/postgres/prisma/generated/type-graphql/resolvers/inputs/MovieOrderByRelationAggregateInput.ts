import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("MovieOrderByRelationAggregateInput", {
  isAbstract: true
})
export class MovieOrderByRelationAggregateInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: false
  })
  count!: "asc" | "desc";
}
