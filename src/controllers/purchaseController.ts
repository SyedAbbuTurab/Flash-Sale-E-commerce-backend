import { sequelize } from '../config/db';
import { Op } from 'sequelize';
import { Request, Response } from 'express';
import { FlashSaleSession } from '../models/FlashSaleSession';
import { Product } from '../models/Product';
import { Order } from '../models/Order';

export const purchaseProduct = async (req: Request, res: Response) => {
    console.log("Received purchase attempt:", req.body);
  const { productId, userId } = req.body;

  if (!userId || !productId) {
    res.status(400).json({ error: 'Missing userId or productId in request body' });
    return;
}

  const t = await sequelize.transaction();

  try {
    const now = new Date();

    const session = await FlashSaleSession.findOne({
      where: {
        productId,
        startTime: { [Op.lte]: now },
        endTime: { [Op.gte]: now },
      },
    });
    if (!session) {
      await t.rollback();
      res.status(400).json({ error: 'No active flash sale for this product' });
      return;
    }

    const product = await Product.findOne({
      where: { id: productId },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    if (!product || product.stock <= 0) {
      await t.rollback();
      res.status(400).json({ error: 'Product out of stock' });
      return;
    }

    // 3. Check if user already purchased (optional)
    const existingOrder = await Order.findOne({
      where: {
        userId,
        productId,
      },
      transaction: t,
    });

    if (existingOrder) {
      await t.rollback();
      res.status(409).json({ message: 'You already purchased this product' });
      return;
    }
    // 4. Deduct stock
    product.stock -= 1;

    await product.save({ transaction: t });

    // 5. Create order
    await Order.create({ userId, productId }, { transaction: t });

    await t.commit();

    res.status(200).json({ message: 'Purchase successful' });
  } catch (error) {
    await t.rollback();
    console.error('Purchase error:', error);
    res.status(500).json({ error: 'Purchase failed', details: error });
    return;
  }
};
