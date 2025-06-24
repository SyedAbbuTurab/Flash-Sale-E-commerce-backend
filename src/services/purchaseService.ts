import { sequelize } from '../config/db';
import { Product } from '../models/Product';
import { Order } from '../models/Order';


export const processPurchase = async (userId: string, productId: string) => {
  console.log(`🚚 Starting purchase processing for userId=${userId}, productId=${productId}`);
  const t = await sequelize.transaction();

  try {
    const product = await Product.findByPk(productId, { transaction: t });
    if (!product) {
      throw new Error('❌ Product not found');
    }

    if (product.stock <= 0) {
      throw new Error('❌ Out of stock');
    }

    product.stock -= 1;
    await product.save({ transaction: t });

    await Order.create({ userId, productId }, { transaction: t });

    await t.commit();
    console.log(`✅ Order successful for user ${userId}`);
  } catch (err) {
    await t.rollback();
    console.error(`❌ Failed Order for user ${userId}:`, err);
  }
};
