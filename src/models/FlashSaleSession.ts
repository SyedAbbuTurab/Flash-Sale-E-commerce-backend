import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { sequelize } from '../config/db';

export class FlashSaleSession extends Model {}

FlashSaleSession.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'FlashSaleSession',
  },
);
