import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from ".";

export class Icons extends Model<
  InferAttributes<Icons>,
  InferCreationAttributes<Icons>
> {
  declare id: number;
  declare category: string;
  declare image_path: string;
}

Icons.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "icons",
    sequelize, // passing the `sequelize` instance is required
    freezeTableName: true,
    timestamps: false,
  }
);

export type IconType = {
  id?: number;
  category?: string;
  imagePath?: string;
};
