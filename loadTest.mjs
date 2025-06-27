import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const TARGET_URL = "http://localhost:4000/purchase";
const PRODUCT_ID = "3fcabbca-3994-481c-be12-f4e0a23a458b";

const USERS = 5;
const SPREAD_INTERVAL_MS = 30;

let success = 0;
let failed = 0;
let durations = [];

async function sendPurchaseRequest(i) {
  const userId = uuidv4();
  const start = Date.now();

  try {
    const response = await axios.post(TARGET_URL, {
      userId,
      productId: PRODUCT_ID,
    });

    const duration = Date.now() - start;
    durations.push(duration);
    success++;
    console.log(`[${i}] ${response.status} (${duration}ms)`);
  } catch (error) {
    const duration = Date.now() - start;
    durations.push(duration);
    failed++;
    console.log(`[${i}] ${error?.response?.status || 'Error'} (${duration}ms)`);
  }
}

async function runLoadTest() {
  const startTime = Date.now();
  const requests = [];

  for (let i = 0; i < USERS; i++) {
    const req = new Promise(resolve => {
      setTimeout(() => {
        resolve(sendPurchaseRequest(i + 1));
      }, i * SPREAD_INTERVAL_MS);
    });
    requests.push(req);
  }

  await Promise.allSettled(requests);

  const totalTime = (Date.now() - startTime) / 1000;
  const min = Math.min(...durations);
  const max = Math.max(...durations);
  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;

  console.log(`\n--- Load Test Summary ---`);
  console.log(`✅ Success: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏱️ Total Time: ${totalTime.toFixed(2)}s`);
  console.log(`⚡ Min: ${min}ms, Max: ${max}ms, Avg: ${avg.toFixed(2)}ms`);
  console.log(`📈 RPS: ${((success + failed) / totalTime).toFixed(2)}\n`);
}

runLoadTest();
