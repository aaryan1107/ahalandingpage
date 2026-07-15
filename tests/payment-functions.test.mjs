import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { onRequestPost as createOrder } from "../functions/api/payments/create-order.js";
import { onRequestPost as verifyPayment } from "../functions/api/payments/verify.js";

const billing = {
  fullName: "Aaryan Kansal",
  phone: "8306924400",
  email: "aaryan@example.com",
  address: "Malviya Nagar, Jaipur",
  city: "Jaipur",
  state: "Rajasthan",
  pincode: "302017"
};

function jsonRequest(path, body) {
  return new Request(`https://ahanexcruise.com${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

test("payment order endpoint stays disabled until both secrets exist", async () => {
  const response = await createOrder({
    request: jsonRequest("/api/payments/create-order", {}),
    env: {}
  });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, "PAYMENT_NOT_CONFIGURED");
});

test("server calculates Smart, technician installation, and shipping in paise", async () => {
  const originalFetch = globalThis.fetch;
  let razorpayBody;
  globalThis.fetch = async (_url, init) => {
    razorpayBody = JSON.parse(init.body);
    return Response.json({
      id: "order_test_123",
      amount: razorpayBody.amount,
      currency: razorpayBody.currency,
      receipt: razorpayBody.receipt
    });
  };

  try {
    const response = await createOrder({
      request: jsonRequest("/api/payments/create-order", {
        plan: "NexCruise Smart",
        controller: "magnetic",
        installation: "technician",
        billing,
        carDetails: { brand: "Tata", model: "Nexon", year: "2024", fuel: "Petrol", transmission: "Manual" }
      }),
      env: { RAZORPAY_KEY_ID: "rzp_test_key", RAZORPAY_KEY_SECRET: "test_secret" }
    });
    const result = await response.json();
    assert.equal(response.status, 200);
    assert.equal(razorpayBody.amount, 2859000);
    assert.equal(razorpayBody.notes.plan, "NexCruise Smart");
    assert.equal(result.amount, 2859000);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("verification rejects a bad signature and confirms a captured payment", async () => {
  const env = { RAZORPAY_KEY_ID: "rzp_test_key", RAZORPAY_KEY_SECRET: "test_secret" };
  const base = {
    razorpay_order_id: "order_test_123",
    razorpay_payment_id: "pay_test_123",
    plan: "NexCruise Smart",
    controller: "belt",
    installation: "self",
    billing
  };
  const bad = await verifyPayment({
    request: jsonRequest("/api/payments/verify", { ...base, razorpay_signature: "bad" }),
    env
  });
  assert.equal(bad.status, 400);

  const signature = createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(`${base.razorpay_order_id}|${base.razorpay_payment_id}`)
    .digest("hex");
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url).includes("/orders/")) {
      return Response.json({
        id: base.razorpay_order_id,
        amount: 2799000,
        currency: "INR",
        status: "paid",
        notes: {
          site: "ahanexcruise.com",
          plan: base.plan,
          controller: base.controller,
          installation: base.installation,
          customer_phone: billing.phone
        }
      });
    }
    return Response.json({
      id: base.razorpay_payment_id,
      order_id: base.razorpay_order_id,
      amount: 2799000,
      currency: "INR",
      status: "captured"
    });
  };

  try {
    const verified = await verifyPayment({
      request: jsonRequest("/api/payments/verify", { ...base, razorpay_signature: signature }),
      env
    });
    assert.equal(verified.status, 200);
    const result = await verified.json();
    assert.equal(result.status, "captured");
    assert.equal(result.paymentId, base.razorpay_payment_id);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
