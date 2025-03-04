import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { NestedIntNullableFilter } from "../inputs/NestedIntNullableFilter";
import { NestedStringNullableFilter } from "../inputs/NestedStringNullableFilter";

@TypeGraphQL.InputType("NestedStringNullableWithAggregatesFilter", {
  isAbstract: true
})
export class NestedStringNullableWithAggregatesFilter {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  equals?: string | undefined;

  @TypeGraphQL.Field(_type => [String], {
    nullable: true
  })
  in?: string[] | undefined;

  @TypeGraphQL.Field(_type => [String], {
    nullable: true
  })
  notIn?: string[] | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  lt?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  lte?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  gt?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  gte?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  contains?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  startsWith?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  endsWith?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  search?: string | undefined;

  @TypeGraphQL.Field(_type => NestedStringNullableWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedStringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntNullableFilter, {
    nullable: true
  })
  count?: NestedIntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => NestedStringNullableFilter, {
    nullable: true
  })
  min?: NestedStringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => NestedStringNullableFilter, {
    nullable: true
  })
  max?: NestedStringNullableFilter | undefined;
}
