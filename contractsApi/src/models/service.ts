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
  Default,
  HasMany,
  NotNull,
  PrimaryKey,
} from '@sequelize/core/decorators-legacy';
import { Personal } from './personal';
import { ServiceCostChange } from './serviceCostChange';

export class Service extends Model<InferAttributes<Service>, InferCreationAttributes<Service>> {
  @Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare date: string;

  @Attribute(DataTypes.STRING)
  declare user: string;

  @Attribute(DataTypes.STRING)
  declare place: string;

  @Attribute(DataTypes.FLOAT)
  @NotNull
  declare cost: number;

  @Attribute(DataTypes.INTEGER)
  @Default(0)
  declare time: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare count: number;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare ispaid: boolean;

  @Attribute(DataTypes.STRING(8196))
  declare description: boolean;

  @Attribute(DataTypes.INTEGER)
  declare orgId: number | null;

  // @Attribute(DataTypes.STRING(8196))
  // declare login?: string

  @HasMany(() => ServiceCostChange, {
    foreignKey: {
      name: 'serviceId',
      onDelete: 'CASCADE',
    },
  })
  declare personal?: NonAttribute<Personal[]>;
}
