import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from ".";
import { Icons } from "./Icons";
import { Places } from "./Places";
import { Users } from "./Users";

export class Foods extends Model<
  InferAttributes<Foods>,
  InferCreationAttributes<Foods>
> {
  declare id: number | undefined;
  declare user_id: number;
  declare icon_id: number;
  declare place_id: number;
  declare category_id: string;
  declare name: string;
  declare expiration_date: Date;
  declare comment: string | undefined;
}

Foods.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    icon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    category_id: { type: DataTypes.STRING },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "foods",
    sequelize, // passing the `sequelize` instance is required
    freezeTableName: true,
    timestamps: false,
  }
);

Foods.belongsTo(Users, { foreignKey: "user_id" });
Foods.belongsTo(Places, { foreignKey: "place_id" });
Foods.belongsTo(Icons, { foreignKey: "icon_id" });

export type FoodsType = {
  id?: number;
  userId?: number;
  iconId?: number;
  placeId?: number;
  name?: string;
  expirationDate?: Date;
  comment?: string;
};
