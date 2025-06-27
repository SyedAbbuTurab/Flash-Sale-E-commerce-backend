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
      // ✅ don't block main thread
      startConsumer().catch((err) => console.error('Consumer crashed:', err));
      // 🔁 Don’t await — run it in background
    });
  } catch (error) {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
  }
};

startServer();
