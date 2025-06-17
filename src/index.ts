import app from './app';
import { sequelize, testDbConnection } from './config/db';
import { loadModels } from './utils/loadModels';

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await testDbConnection();
    loadModels();

    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
  }
};

startServer();
