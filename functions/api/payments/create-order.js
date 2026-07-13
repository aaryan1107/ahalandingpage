import {
  calculateQuote,
  json,
  normalizeController,
  orderNotes,
  parseJson,
  paymentCredentials,
  razorpayRequest,
  validateBilling
} from "./_shared.js";

export async function onRequestPost(context) {
  const credentials = paymentCredentials(context.env);
  if (!credentials) {
    return json({
      error: "Razorpay is not configured yet.",
      code: "PAYMENT_NOT_CONFIGURED"
    }, 503);
  }

  try {
    const body = await parseJson(context.request);
    const plan = String(body.plan || "");
    const installation = String(body.installation || "");
    const controller = normalizeController(plan, String(body.controller || ""));
    const billing = validateBilling(body.billing);
    const quote = calculateQuote(plan, installation);
    const receipt = `aha_${Date.now().toString(36)}_${crypto.randomUUID().slice(0, 8)}`;

    const order = await razorpayRequest("/orders", credentials, {
      method: "POST",
      body: JSON.stringify({
        amount: quote.totalAmount,
        currency: "INR",
        receipt,
        notes: orderNotes({ plan, controller, installation, billing, carDetails: body.carDetails })
      })
    });

    return json({
      orderId: order.id,
      keyId: credentials.keyId,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      quote
    });
  } catch (error) {
    const status = error.status >= 400 && error.status < 500 ? 400 : 502;
    return json({ error: error.message || "Unable to create the Razorpay order." }, status);
  }
}
