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
import { Contract } from './contracts';

export class Organization extends Model<
  InferAttributes<Organization>,
  InferCreationAttributes<Organization>
> {
  @Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @HasMany(() => Personal, {
    foreignKey: {
      name: 'orgId',
      onDelete: 'CASCADE',
    },
  })
  declare personal?: NonAttribute<Personal[]>;

  @HasMany(() => Service, {
    foreignKey: {
      name: 'orgId',
      onDelete: 'CASCADE',
    },
  })
  declare service?: NonAttribute<Service[]>;

  @HasMany(() => Contract, {
    foreignKey: {
      name: 'orgId',
      onDelete: 'CASCADE',
    },
  })
  declare contract?: NonAttribute<Contract[]>;
}
