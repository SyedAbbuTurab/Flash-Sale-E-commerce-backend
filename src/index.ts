import app from './app';
import { sequelize, testDbConnection } from './config/db';
import { loadModels } from './utils/loadModels';
import { startConsumer } from './queue/consumer';

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await testDbConnection();
    loadModels();

    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);

      // Run consumer without blocking the server
      startConsumer().catch((err) => {
        console.error('❌ Redis consumer failed to start:', err);
      });
    });
  } catch (error) {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
  }
};

startServer();
