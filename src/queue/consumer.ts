import redis from '../utils/redisClient';
import { processPurchase } from '../services/purchaseService';

export const startConsumer = async () => {
  while (true) {
    try {
      console.log('⏳ Waiting for queue item...');
      const data = await redis.blpop('purchaseQueue', 0);

      if (!data || data.length < 2) {
        console.warn('⚠️ No data received from queue');
        continue;
      }

      const [, payload] = data;
      console.log('🔄 Pulled from queue:', payload);

      const { userId, productId } = JSON.parse(payload);
      await processPurchase(userId, productId);
    } catch (error) {
      console.error('❌ Consumer crashed with error:', error);
    }
  }
};
