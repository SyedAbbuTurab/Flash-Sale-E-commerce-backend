import { sequelize } from '../config/db';
import { Product } from '../models/Product';
import { Order } from '../models/Order';


export const processPurchase = async (userId: string, productId: string) => {
  const t = await sequelize.transaction();
  try {
    console.log(`🔧 Processing order for user ${userId}`);
    
    const product = await Product.findByPk(productId, { transaction: t });
    if (!product || product.stock <= 0) {
      throw new Error('Out of stock');
    }

    product.stock -= 1;
    await product.save({ transaction: t });

    await Order.create({ userId, productId }, { transaction: t });

    await t.commit();
    console.log(`✅ Order successful for user ${userId}`);
  } catch (err) {
    await t.rollback();
    console.error(`❌ Failed Order for user ${userId}: ${err}`);
  }
};
