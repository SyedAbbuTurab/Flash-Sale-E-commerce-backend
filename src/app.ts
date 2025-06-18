import express from 'express';
import userRoutes  from "./routes/userRoutes";
import producRoutes  from "./routes/productRoutes";
import flashSaleRoutes  from "./routes/flashSaleRoutes"
import purchaseRoutes from "./routes/purchaseRoutes"


const app = express();
app.use(express.json());

// Root route
app.get('/', (_req, res) => {
  res.send('Flash Sale API running 🚀');
});

app.use("/users", userRoutes);
app.use("/products", producRoutes);
app.use("/flash-sale", flashSaleRoutes);
app.use('/purchase', purchaseRoutes);



export default app;
