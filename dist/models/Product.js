"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
class Product extends sequelize_1.Model {
}
Product.init({
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    price: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    stock: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, { sequelize: index_1.default, modelName: 'product' });
exports.default = Product;
//# sourceMappingURL=Product.js.map