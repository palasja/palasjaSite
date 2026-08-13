import {
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  CreationOptional,
} from '@sequelize/core';
import {
  Attribute,
  AutoIncrement,
  NotNull,
  PrimaryKey,
} from '@sequelize/core/decorators-legacy';

export class Contract extends Model<InferAttributes<Contract>, InferCreationAttributes<Contract>> {
  @Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare number: string;

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare signDate: Date ;

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare startDate: Date ;

  @Attribute(DataTypes.DATEONLY)
  declare endDate: Date ;

  @Attribute(DataTypes.TEXT('long'))
  declare fileName: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare orgId: number;
}
