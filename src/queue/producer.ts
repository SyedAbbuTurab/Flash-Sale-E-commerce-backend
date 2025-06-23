import redis from '../utils/redisClient';

export const queuePurchaseRequest = async (payload: any) => {
  try {
    console.log('📝 Enqueueing into Redis:', payload);
    await redis.set('purchaseQueue', JSON.stringify(payload));
    console.log('✅ Enqueued successfully');
  } catch (err) {
    console.error('❌ Failed to enqueue:', err);
  } finally {
    redis.disconnect(); // Optional: only disconnect if this script exits
  }
};
