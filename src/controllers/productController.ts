import { Request, Response } from 'express';
import { Product } from '../models/Product';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, stock, price } = req.body;
    const product = await Product.create({ name, stock, price });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product', details: error });
  }
};
