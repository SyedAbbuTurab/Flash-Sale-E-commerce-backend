import redis from '../utils/redisClient';
import { processPurchase } from '../services/purchaseService';

export const startConsumer = async () => {
  console.log('🔄 Consumer started...');
  while (true) {
    const data = await redis.blpop('purchaseQueue', 0);
    
    if (!data || data.length < 2) {
      console.warn('⚠️ No data received from queue');
      continue;
    }

    const [, payload] = data;
    console.log("📦 Processing payload:", payload);

    try {
      const { userId, productId } = JSON.parse(payload);
      await processPurchase(userId, productId);
    } catch (error) {
      console.error('❌ Error processing purchase:', error);
    }
  }
};
