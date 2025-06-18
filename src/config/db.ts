import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'flash_sale', // DB name
  'postgres', // DB user
  'Test@123',
  {
    host: process.env.HOST,
    port: Number(process.env.PORT),
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 20,     // increase from default 5
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
);

console.log('Password from env:', process.env.DB_PASS);

// Optional: check connection immediately
export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};
