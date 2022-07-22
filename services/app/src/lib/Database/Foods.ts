import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize/types";
import sequelize from ".";
import Icons from "./Icons";
import Places from "./Places";
import Users from "./Users";

class Foods extends Model<
  InferAttributes<Foods>,
  InferCreationAttributes<Foods>
> {
  declare id: number | undefined;
  declare userId: number;
  declare iconId: number;
  declare placeId: number;
  declare name: string;
  declare expirationDate: Date;
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    iconId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    placeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expirationDate: {
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

export default Foods;
