import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { NestedBigIntNullableFilter } from "../inputs/NestedBigIntNullableFilter";
import { NestedBigIntNullableWithAggregatesFilter } from "../inputs/NestedBigIntNullableWithAggregatesFilter";
import { NestedFloatNullableFilter } from "../inputs/NestedFloatNullableFilter";
import { NestedIntNullableFilter } from "../inputs/NestedIntNullableFilter";

@TypeGraphQL.InputType("BigIntNullableWithAggregatesFilter", {
  isAbstract: true
})
export class BigIntNullableWithAggregatesFilter {
  @TypeGraphQL.Field(_type => GraphQLScalars.BigIntResolver, {
    nullable: true
  })
  equals?: bigint | undefined;

  @TypeGraphQL.Field(_type => [GraphQLScalars.BigIntResolver], {
    nullable: true
  })
  in?: bigint[] | undefined;

  @TypeGraphQL.Field(_type => [GraphQLScalars.BigIntResolver], {
    nullable: true
  })
  notIn?: bigint[] | undefined;

  @TypeGraphQL.Field(_type => GraphQLScalars.BigIntResolver, {
    nullable: true
  })
  lt?: bigint | undefined;

  @TypeGraphQL.Field(_type => GraphQLScalars.BigIntResolver, {
    nullable: true
  })
  lte?: bigint | undefined;

  @TypeGraphQL.Field(_type => GraphQLScalars.BigIntResolver, {
    nullable: true
  })
  gt?: bigint | undefined;

  @TypeGraphQL.Field(_type => GraphQLScalars.BigIntResolver, {
    nullable: true
  })
  gte?: bigint | undefined;

  @TypeGraphQL.Field(_type => NestedBigIntNullableWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedBigIntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntNullableFilter, {
    nullable: true
  })
  count?: NestedIntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => NestedFloatNullableFilter, {
    nullable: true
  })
  avg?: NestedFloatNullableFilter | undefined;

  @TypeGraphQL.Field(_type => NestedBigIntNullableFilter, {
    nullable: true
  })
  sum?: NestedBigIntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => NestedBigIntNullableFilter, {
    nullable: true
  })
  min?: NestedBigIntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => NestedBigIntNullableFilter, {
    nullable: true
  })
  max?: NestedBigIntNullableFilter | undefined;
}
