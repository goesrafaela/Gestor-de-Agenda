import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public stock!: number;
}

Product.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'product' }
);

export default Product;
