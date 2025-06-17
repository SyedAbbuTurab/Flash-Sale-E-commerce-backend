import { Router } from "express";
import { startFlashSale } from "../controllers/flashSaleController";

const router = Router();

router.post("/", startFlashSale);

export default router;
