import { Request, Response } from 'express';
import { User } from '../models/User';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.create({ email });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err });
  }
};
