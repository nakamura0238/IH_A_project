import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  // CreateOptions,
} from "sequelize";
import sequelize from "./index";

export class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  declare id: number | undefined;
  declare email: string;
  declare password: string;
  declare line_id: number | undefined;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    line_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
    freezeTableName: true,
    timestamps: false,
  }
);

export type UsersType = {
  id?: number;
  email?: string;
  password?: string;
  line_id?: number;
};
