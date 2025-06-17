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

export const getProductStocks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) res.status(404).json({ message: 'Product could not be found!' });

     res.json({ productId: id, stock: product?.stock });
  } catch (error) {
     res.status(500).json({ error: 'Failed to fetch product stock', details: error });
  }
};
