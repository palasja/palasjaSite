import { DataTypes, InferCreationAttributes, InferAttributes, Model, NonAttribute, CreationOptional} from '@sequelize/core';
import { Attribute, AutoIncrement, HasMany, NotNull, PrimaryKey } from '@sequelize/core/decorators-legacy';

export class ServiceCostChange extends Model<InferAttributes<ServiceCostChange>, InferCreationAttributes<ServiceCostChange>> {
  @Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare date: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare user: string;
  
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare newCost: number;
  
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare serviceId: number;
}
