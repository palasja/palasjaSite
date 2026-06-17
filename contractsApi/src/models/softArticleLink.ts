import {
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  CreationOptional,
} from '@sequelize/core';
import { Attribute, AutoIncrement, NotNull, PrimaryKey, Table } from '@sequelize/core/decorators-legacy';

export class SoftArticleLink extends Model<
  InferAttributes<SoftArticleLink>,
  InferCreationAttributes<SoftArticleLink>
> {
  @Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare url: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare softArticleId: number;
}
