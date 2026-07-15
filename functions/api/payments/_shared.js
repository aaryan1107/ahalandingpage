export const PAYMENT_CATALOG = {
  "NexCruise Basic": 1999000,
  "NexCruise Smart": 2749000
};

export const INSTALLATION_PRICES = {
  self: 0,
  technician: 60000
};

export const SHIPPING_AMOUNT = 50000;

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

export async function parseJson(request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) throw new Error("Expected a JSON request.");
  return request.json();
}

export function calculateQuote(plan, installation) {
  const deviceAmount = PAYMENT_CATALOG[plan];
  const installationAmount = INSTALLATION_PRICES[installation];
  if (deviceAmount === undefined) throw new Error("Choose a valid NexCruise plan.");
  if (installationAmount === undefined) throw new Error("Choose a valid installation option.");
  return {
    deviceAmount,
    installationAmount,
    shippingAmount: SHIPPING_AMOUNT,
    totalAmount: deviceAmount + installationAmount + SHIPPING_AMOUNT
  };
}

function clean(value, maxLength = 256) {
  return String(value || "").trim().slice(0, maxLength);
}

export function validateBilling(billing) {
  const value = billing && typeof billing === "object" ? billing : {};
  const normalized = {
    fullName: clean(value.fullName, 80),
    phone: clean(value.phone, 18),
    email: clean(value.email, 120).toLowerCase(),
    address: clean(value.address, 240),
    city: clean(value.city, 80),
    state: clean(value.state, 80),
    pincode: clean(value.pincode, 6)
  };

  if (normalized.fullName.length < 2) throw new Error("Enter the customer's full name.");
  if (!/^[+0-9 ]{10,18}$/.test(normalized.phone)) throw new Error("Enter a valid mobile number.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) throw new Error("Enter a valid email address.");
  if (normalized.address.length < 8) throw new Error("Enter the billing and delivery address.");
  if (!normalized.city || !normalized.state) throw new Error("Enter the city and state.");
  if (!/^[0-9]{6}$/.test(normalized.pincode)) throw new Error("Enter a valid 6-digit PIN code.");
  return normalized;
}

export function normalizeController(plan, controller) {
  if (plan !== "NexCruise Smart") return "not_applicable";
  if (controller !== "magnetic" && controller !== "belt") throw new Error("Choose a valid controller mount.");
  return controller;
}

export function paymentCredentials(env) {
  const keyId = String(env.RAZORPAY_KEY_ID || "").trim();
  const keySecret = String(env.RAZORPAY_KEY_SECRET || "").trim();
  if (!keyId || !keySecret) return null;
  return { keyId, keySecret };
}

export function authorizationHeader(credentials) {
  return `Basic ${btoa(`${credentials.keyId}:${credentials.keySecret}`)}`;
}

export async function razorpayRequest(path, credentials, init = {}) {
  const response = await fetch(`https://api.razorpay.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: authorizationHeader(credentials),
      "Content-Type": "application/json",
      ...(init.headers || {})
    }
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = body.error?.description || body.error?.reason || "Razorpay rejected the request.";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return body;
}

export async function hmacHex(secret, value) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function constantTimeEqual(left, right) {
  if (typeof left !== "string" || typeof right !== "string" || left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return mismatch === 0;
}

export function orderNotes({ plan, controller, installation, billing, carDetails }) {
  const car = carDetails && typeof carDetails === "object" ? carDetails : {};
  return {
    site: "ahanexcruise.com",
    plan,
    controller,
    installation,
    customer_name: billing.fullName,
    customer_phone: billing.phone,
    customer_email: billing.email,
    delivery_address: billing.address,
    delivery_city: billing.city,
    delivery_state: billing.state,
    delivery_pincode: billing.pincode,
    car: clean(`${car.brand || ""} ${car.model || ""}`, 100),
    car_configuration: clean(`${car.year || ""} ${car.fuel || ""} ${car.transmission || ""}`, 100),
    ncv2_model_uid: clean(car.modelUid, 36)
  };
}
