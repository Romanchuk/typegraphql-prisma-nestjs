import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { CategoryAvgAggregate } from "../outputs/CategoryAvgAggregate";
import { CategoryCountAggregate } from "../outputs/CategoryCountAggregate";
import { CategoryMaxAggregate } from "../outputs/CategoryMaxAggregate";
import { CategoryMinAggregate } from "../outputs/CategoryMinAggregate";
import { CategorySumAggregate } from "../outputs/CategorySumAggregate";

@TypeGraphQL.ObjectType("AggregateCategory", {
  isAbstract: true
})
export class AggregateCategory {
  @TypeGraphQL.Field(_type => CategoryCountAggregate, {
    nullable: true
  })
  count!: CategoryCountAggregate | null;

  @TypeGraphQL.Field(_type => CategoryAvgAggregate, {
    nullable: true
  })
  avg!: CategoryAvgAggregate | null;

  @TypeGraphQL.Field(_type => CategorySumAggregate, {
    nullable: true
  })
  sum!: CategorySumAggregate | null;

  @TypeGraphQL.Field(_type => CategoryMinAggregate, {
    nullable: true
  })
  min!: CategoryMinAggregate | null;

  @TypeGraphQL.Field(_type => CategoryMaxAggregate, {
    nullable: true
  })
  max!: CategoryMaxAggregate | null;
}
