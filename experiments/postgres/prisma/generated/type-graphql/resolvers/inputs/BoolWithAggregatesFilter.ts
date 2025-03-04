import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { NestedBoolFilter } from "../inputs/NestedBoolFilter";
import { NestedBoolWithAggregatesFilter } from "../inputs/NestedBoolWithAggregatesFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";

@TypeGraphQL.InputType("BoolWithAggregatesFilter", {
  isAbstract: true
})
export class BoolWithAggregatesFilter {
  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  equals?: boolean | undefined;

  @TypeGraphQL.Field(_type => NestedBoolWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedBoolWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntFilter, {
    nullable: true
  })
  count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field(_type => NestedBoolFilter, {
    nullable: true
  })
  min?: NestedBoolFilter | undefined;

  @TypeGraphQL.Field(_type => NestedBoolFilter, {
    nullable: true
  })
  max?: NestedBoolFilter | undefined;
}
