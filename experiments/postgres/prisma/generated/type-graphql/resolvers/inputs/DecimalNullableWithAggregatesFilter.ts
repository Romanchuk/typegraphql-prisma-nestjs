import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { NestedDecimalNullableFilter } from "../inputs/NestedDecimalNullableFilter";
import { NestedDecimalNullableWithAggregatesFilter } from "../inputs/NestedDecimalNullableWithAggregatesFilter";
import { NestedIntNullableFilter } from "../inputs/NestedIntNullableFilter";

@TypeGraphQL.InputType("DecimalNullableWithAggregatesFilter", {
  isAbstract: true
})
export class DecimalNullableWithAggregatesFilter {
  @TypeGraphQL.Field(_type => DecimalJSScalar, {
    nullable: true
  })
  equals?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field(_type => [DecimalJSScalar], {
    nullable: true
  })
  in?: Prisma.Decimal[] | undefined;

  @TypeGraphQL.Field(_type => [DecimalJSScalar], {
    nullable: true
  })
  notIn?: Prisma.Decimal[] | undefined;

  @TypeGraphQL.Field(_type => DecimalJSScalar, {
    nullable: true
  })
  lt?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field(_type => DecimalJSScalar, {
    nullable: true
  })
  lte?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field(_type => DecimalJSScalar, {
    nullable: true
  })
  gt?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field(_type => DecimalJSScalar, {
    nullable: true
  })
  gte?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field(_type => NestedDecimalNullableWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedDecimalNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntNullableFilter, {
    nullable: true
  })
  count?: NestedIntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => NestedDecimalNullableFilter, {
    nullable: true
  })
  avg?: NestedDecimalNullableFilter | undefined;

  @TypeGraphQL.Field(_type => NestedDecimalNullableFilter, {
    nullable: true
  })
  sum?: NestedDecimalNullableFilter | undefined;

  @TypeGraphQL.Field(_type => NestedDecimalNullableFilter, {
    nullable: true
  })
  min?: NestedDecimalNullableFilter | undefined;

  @TypeGraphQL.Field(_type => NestedDecimalNullableFilter, {
    nullable: true
  })
  max?: NestedDecimalNullableFilter | undefined;
}
