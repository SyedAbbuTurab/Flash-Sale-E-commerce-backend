import redis from '../utils/redisClient';

export const queuePurchaseRequest = async (payload: any) => {
  try {
    console.log('📝 Enqueueing into Redis:', payload);
    const result= await redis.lpushx('purchaseQueue', JSON.stringify(payload));
    console.log('✅ Enqueued successfully', {result});
  } catch (err) {
    console.error('❌ Failed to enqueue:', err);
  } finally {
    redis.disconnect(); 
  }
};
