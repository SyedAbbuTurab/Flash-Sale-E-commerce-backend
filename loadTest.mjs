import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const TARGET_URL = "http://localhost:4000/purchase";
const PRODUCT_ID = "3fcabbca-3994-481c-be12-f4e0a23a458b";

const USERS = 20; // Number of concurrent requests
let success = 0;
let failed = 0;
let startTime = Date.now();


async function sendPurchaseRequest() {
  const userId = uuidv4();
  try {
    const response = await axios.post(TARGET_URL, {
      userId,
      productId: PRODUCT_ID,
    });
    success++;
  } catch {
    failed++;
  }
}

async function runLoadTest() {
  const requests = [];
  for (let i = 0; i < USERS; i++) {
    requests.push(sendPurchaseRequest());
  }

  await Promise.all(requests);
  const duration = (Date.now() - startTime) / 1000;
  console.log(`\n✅ Success: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏱️ Total time: ${duration}s`);
  console.log(`📈 RPS: ${(success + failed) / duration}\n`);
}

runLoadTest();
