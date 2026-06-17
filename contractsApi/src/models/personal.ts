import {
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  CreationOptional,
} from '@sequelize/core';
import { Attribute, AutoIncrement, NotNull, PrimaryKey } from '@sequelize/core/decorators-legacy';

export class Personal extends Model<InferAttributes<Personal>, InferCreationAttributes<Personal>> {
  @Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare firstname: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare lastname: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare middlename: string;

  @Attribute(DataTypes.STRING)
  declare firstnameR: string;

  @Attribute(DataTypes.STRING)
  declare lastnameR: string;

  @Attribute(DataTypes.STRING)
  declare middlenameR: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare positionName: string;

  @Attribute(DataTypes.BOOLEAN)
  declare isHead: boolean;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare orgId: number;
}
