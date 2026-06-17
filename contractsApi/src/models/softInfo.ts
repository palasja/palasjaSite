import { DataTypes, InferCreationAttributes, InferAttributes, Model, NonAttribute, CreationOptional} from '@sequelize/core';
import { Attribute, AutoIncrement, HasMany, NotNull, PrimaryKey } from '@sequelize/core/decorators-legacy';
import { SoftArticle } from './softArticle';

export class SoftInfo extends Model<InferAttributes<SoftInfo>, InferCreationAttributes<SoftInfo>> {
@Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @HasMany(() => SoftArticle, {
    foreignKey: {
      name: 'softInfoId',
      onDelete: 'CASCADE',
    },
  })
  declare softArticle?: NonAttribute<SoftArticle[]>
}