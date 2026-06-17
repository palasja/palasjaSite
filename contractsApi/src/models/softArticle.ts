import { DataTypes, InferCreationAttributes, InferAttributes, Model, NonAttribute, CreationOptional} from '@sequelize/core';
import { Attribute, AutoIncrement, HasMany, NotNull, PrimaryKey } from '@sequelize/core/decorators-legacy';
import { Personal } from './personal';
import { SoftArticleLink } from './softArticleLink';

export class SoftArticle extends Model<InferAttributes<SoftArticle>, InferCreationAttributes<SoftArticle>> {
@Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.TEXT('long'))
  declare info: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare softInfoId: number;

  @HasMany(() => SoftArticleLink, {
    foreignKey: {
      name: 'softArticleId',
      onDelete: 'CASCADE',
    },
  })
  declare softArticleLink?: NonAttribute<SoftArticleLink[]>

}
