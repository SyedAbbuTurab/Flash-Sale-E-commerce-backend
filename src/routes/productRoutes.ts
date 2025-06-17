import { Router } from 'express';
import { createProduct,getProductStocks } from '../controllers/productController';

const router = Router();

router.post('/', createProduct);
router.get('/:id/stock/', getProductStocks);

export default router;
