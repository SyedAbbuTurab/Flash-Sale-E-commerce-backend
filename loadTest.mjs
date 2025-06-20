import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const TARGET_URL = "http://localhost:4000/purchase";
const PRODUCT_ID = "3fcabbca-3994-481c-be12-f4e0a23a458b";

const USERS = 50; // Number of concurrent requests

async function sendPurchaseRequest() {
  const userId = uuidv4();
  try {
    const response = await axios.post(TARGET_URL, {
      userId,
      productId: PRODUCT_ID,
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log(`✅ Success: ${response.status}`);
  } catch (err) {
    console.error(`❌ Failed: ${err.response?.status || err.message}`);
  }
}

async function runLoadTest() {
  const requests = [];
  for (let i = 0; i < USERS; i++) {
    requests.push(sendPurchaseRequest());
  }

  await Promise.all(requests);
  console.log(`\n🔁 Load test completed with ${USERS} requests.\n`);
}

runLoadTest();
