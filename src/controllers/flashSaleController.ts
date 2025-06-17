import { Request, Response } from 'express';
import { FlashSaleSession } from '../models/FlashSaleSession';

export const startFlashSale = async (req: Request, res: Response) => {
  try {
    const { productId, startTime, endTime } = req.body;

    const session = await FlashSaleSession.create({ productId, startTime, endTime });
    res.status(201).json({message:"Flash Sale created", details: session})
  } catch (error) {
    res.status(500).json({message: "Error creating flash sale", details: error})
  }
};
