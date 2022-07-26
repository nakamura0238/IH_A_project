import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize/types";
import sequelize from ".";
import { Users } from "./Users";

export class Places extends Model<
  InferAttributes<Places>,
  InferCreationAttributes<Places>
> {
  declare id: number;
  declare userId: number;
  declare name: string;
}

Places.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "places",
    sequelize, // passing the `sequelize` instance is required
    freezeTableName: true,
    timestamps: false,
  }
);

Places.belongsTo(Users, { foreignKey: "user_id" });

export type PlacesType = {
  id?: number;
  userId?: number;
  name?: string;
};
