import {
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  CreationOptional,
} from '@sequelize/core';
import {
  Attribute,
  AutoIncrement,
  HasMany,
  NotNull,
  PrimaryKey,
} from '@sequelize/core/decorators-legacy';
import { Personal } from './personal';
import { Service } from './service';

export class Contract extends Model<InferAttributes<Contract>, InferCreationAttributes<Contract>> {
  @Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare number: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare signDate: string;

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare startDate: string;

  @Attribute(DataTypes.DATEONLY)
  declare endDate: string;

  @Attribute(DataTypes.TEXT('long'))
  declare scan: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare orgId: number;
}
