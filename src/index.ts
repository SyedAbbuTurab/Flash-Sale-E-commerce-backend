import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/db';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (_re1, res) => {
  res.send('Flash Sale API runnning...');
});

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
