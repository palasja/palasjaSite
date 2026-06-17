import { DataTypes, InferCreationAttributes, InferAttributes, Model, NonAttribute, CreationOptional} from '@sequelize/core';
import { Attribute, AutoIncrement, HasMany, NotNull, PrimaryKey } from '@sequelize/core/decorators-legacy';
import { Personal } from './personal';
import { Service } from './service';
import { Contract } from './contracts';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
@Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare login: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string;
}