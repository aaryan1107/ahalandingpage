import {
  calculateQuote,
  constantTimeEqual,
  hmacHex,
  json,
  normalizeController,
  parseJson,
  paymentCredentials,
  razorpayRequest,
  validateBilling
} from "./_shared.js";

export async function onRequestPost(context) {
  const credentials = paymentCredentials(context.env);
  if (!credentials) return json({ error: "Razorpay is not configured yet.", code: "PAYMENT_NOT_CONFIGURED" }, 503);

  try {
    const body = await parseJson(context.request);
    const orderId = String(body.razorpay_order_id || "");
    const paymentId = String(body.razorpay_payment_id || "");
    const suppliedSignature = String(body.razorpay_signature || "");
    if (!orderId || !paymentId || !suppliedSignature) throw new Error("The Razorpay payment response is incomplete.");

    const plan = String(body.plan || "");
    const installation = String(body.installation || "");
    const controller = normalizeController(plan, String(body.controller || ""));
    const billing = validateBilling(body.billing);
    const quote = calculateQuote(plan, installation);

    const expectedSignature = await hmacHex(credentials.keySecret, `${orderId}|${paymentId}`);
    if (!constantTimeEqual(expectedSignature, suppliedSignature)) {
      return json({ error: "Payment signature verification failed." }, 400);
    }

    const [order, payment] = await Promise.all([
      razorpayRequest(`/orders/${encodeURIComponent(orderId)}`, credentials),
      razorpayRequest(`/payments/${encodeURIComponent(paymentId)}`, credentials)
    ]);

    const matchesOrder =
      order.id === orderId &&
      payment.order_id === orderId &&
      order.amount === quote.totalAmount &&
      payment.amount === quote.totalAmount &&
      order.currency === "INR" &&
      payment.currency === "INR" &&
      order.notes?.site === "ahanexcruise.com" &&
      order.notes?.plan === plan &&
      order.notes?.controller === controller &&
      order.notes?.installation === installation &&
      order.notes?.customer_phone === billing.phone;

    if (!matchesOrder) return json({ error: "The verified payment does not match this checkout." }, 400);

    const captured = payment.status === "captured" && order.status === "paid";
    return json({
      ok: true,
      status: captured ? "captured" : "pending",
      orderId,
      paymentId,
      amount: quote.totalAmount,
      currency: "INR"
    }, captured ? 200 : 202);
  } catch (error) {
    const status = error.status >= 400 && error.status < 500 ? 400 : 502;
    return json({ error: error.message || "Unable to verify the Razorpay payment." }, status);
  }
}
