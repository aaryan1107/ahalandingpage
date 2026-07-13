# Razorpay Go-Live Checklist

The NexCruise checkout is already wired for Razorpay Standard Checkout. Product prices, installation charges, and shipping are calculated again on the server before an order is created.

## 1. Add Cloudflare secrets

In Cloudflare, open **Workers & Pages -> aha-nexcruise -> Settings -> Variables and Secrets**. Add these as encrypted secrets for Production and Preview:

```text
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
```

Do not add either value to Git. Save the secrets and redeploy the latest Pages deployment.

## 2. Test before using live keys

1. Start with Razorpay Test Mode keys.
2. Open the live site and choose a NexCruise plan.
3. Complete billing and make a Razorpay test payment.
4. Confirm the payment appears in the Razorpay Dashboard with the NexCruise plan, installation choice, customer details, and car details in the order notes.
5. Confirm the website shows **Payment verified** only after the server validates the signature and Razorpay reports the payment captured.
6. Replace the test secrets with Live Mode keys and redeploy.

## 3. Production settings

- Keep payment capture enabled in Razorpay so paid orders can reach the `captured` state.
- Use Razorpay Dashboard as the initial order record. Export or fulfil orders from there until a dedicated order database is added.
- The payment API endpoints are `/api/payments/create-order` and `/api/payments/verify`.
- The site sends `web.billing_details_clicked` and `web.purchase_wizard_completion_razorpay` to the AHA marketing dashboard.

If the secrets are missing, checkout shows a clear setup message and preserves a WhatsApp order fallback. It never exposes the Razorpay secret to the browser.
