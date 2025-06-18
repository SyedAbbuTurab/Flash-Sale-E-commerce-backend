import { Router } from "express";

import { purchaseProduct } from "../controllers/purchaseController";

const router = Router();

router.post("/", purchaseProduct)

export default router;
