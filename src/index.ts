import express from 'express';
import dotenv from 'dotenv';
import { sequelize, testDbConnection } from './config/db';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (_re1, res) => {
  res.send('Flash Sale API runnning...');
});

const startServer = async () => {
  await testDbConnection();

  await sequelize.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
