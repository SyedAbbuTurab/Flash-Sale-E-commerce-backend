import { createClient } from 'redis';

const redisClient = createClient(); // Defaults to localhost:6379

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

async function testRedis() {
  await redisClient.connect();

  await redisClient.set('flash_sale', 'active');
  const result = await redisClient.get('flash_sale');
  console.log('Flash Sale Status:', result);

  await redisClient.quit();
}

testRedis();
