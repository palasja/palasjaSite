import {
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  CreationOptional,
} from '@sequelize/core';
import { Attribute, AutoIncrement, NotNull, PrimaryKey } from '@sequelize/core/decorators-legacy';

export class Price extends Model<InferAttributes<Price>, InferCreationAttributes<Price>> {
  @Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare serviceName: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare cost: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare description: string;
}
