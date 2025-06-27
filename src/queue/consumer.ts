import redis from '../utils/redisClient';
import { processPurchase } from '../services/purchaseService';

export const startConsumer = async () => {
  console.log('🔄 Consumer started...');

  const consume = async () => {
    try {
      console.log("🕐 Waiting for Redis item...");
      const data = await redis.blpop('purchaseQueue', 5); // wait max 5s
      if (data && data.length >= 2) {
        const [, payload] = data;
        console.log("🔄 Pulled from queue:", payload);
        const { userId, productId } = JSON.parse(payload);
        await processPurchase(userId, productId);
      } else {
        console.log("⏳ No new data in Redis queue");
      }
    } catch (err) {
      console.error('❌ Error in consumer loop:', err);
    }

    setTimeout(consume, 100); 
  };

  consume(); 
};
