import { useEffect, useMemo, useRef, useState } from "react";
import { productVariants } from "../data";
import {
  WHATSAPP_NUMBER,
  trackFunnel,
  trackGoogle,
  trackMeta
} from "../tracking";

const INSTALLATION_OPTIONS = [
  {
    id: "self",
    title: "Self-install with AHA guidance",
    body: "Use the installation guide and AHA support for the two plug-in connections.",
    amount: 0
  },
  {
    id: "technician",
    title: "AHA-assisted technician install",
    body: "Book installation support through AHA's technician network in 60+ cities.",
    amount: 600
  }
];

const CONTROLLER_OPTIONS = [
  {
    id: "magnetic",
    title: "Magnetic mount",
    body: "Quick magnetic attachment with a no-scratch grip.",
    image: "/purchase/controller-magnetic.png"
  },
  {
    id: "belt",
    title: "Belt mount",
    body: "Secure strap fit for the steering wheel.",
    image: "/purchase/controller-belt.png"
  }
];

const SHIPPING_AMOUNT = 500;
const INITIAL_BILLING = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: ""
};

function formatMoney(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(window.Razorpay);

  return new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-razorpay-checkout]");
    if (existing) {
      existing.addEventListener("load", () => resolve(window.Razorpay), { once: true });
      existing.addEventListener("error", () => reject(new Error("Razorpay Checkout could not load.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.dataset.razorpayCheckout = "true";
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error("Razorpay Checkout could not load."));
    document.head.appendChild(script);
  });
}

async function readJson(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || "The payment request could not be completed.");
    error.code = data.code;
    throw error;
  }
  return data;
}

function PlanOption({ variant, active, onSelect }) {
  return (
    <button
      type="button"
      className={active ? "purchase-choice is-selected" : "purchase-choice"}
      onClick={() => onSelect(variant.name)}
      aria-pressed={active}
    >
      <span><strong>{variant.name}</strong><small>{variant.features.slice(0, 3).join(" / ")}</small></span>
      <b>{formatMoney(variant.amount)}</b>
    </button>
  );
}

function OrderSummary({ variant, controller, installation, total, compact = false }) {
  return (
    <aside className={compact ? "purchase-summary is-compact" : "purchase-summary"} aria-label="Order summary">
      <div className="purchase-summary-head"><span>Order summary</span><strong>{variant.name}</strong></div>
      <dl>
        <div><dt>Device</dt><dd>{formatMoney(variant.amount)}</dd></div>
        {variant.name === "NexCruise Smart" && <div><dt>{controller === "belt" ? "Belt" : "Magnetic"} controller</dt><dd>Included</dd></div>}
        <div><dt>{installation === "technician" ? "Technician installation" : "Self-install"}</dt><dd>{installation === "technician" ? formatMoney(600) : "Included"}</dd></div>
        <div><dt>Standard shipping</dt><dd>{formatMoney(SHIPPING_AMOUNT)}</dd></div>
      </dl>
      <div className="purchase-total"><span>Total</span><strong>{formatMoney(total)}</strong></div>
      <p>Final fitment is confirmed against your car before dispatch.</p>
    </aside>
  );
}

export default function PurchaseFlow({ open, onClose, initialPlan, carDetails }) {
  const normalizePlan = (requestedPlan) =>
    productVariants.some((item) => item.name === requestedPlan) ? requestedPlan : "NexCruise Smart";
  const [step, setStep] = useState("configure");
  const [plan, setPlan] = useState(normalizePlan(initialPlan));
  const [controller, setController] = useState("magnetic");
  const [installation, setInstallation] = useState("self");
  const [billing, setBilling] = useState(INITIAL_BILLING);
  const [status, setStatus] = useState({ type: "idle", message: "", reference: "" });
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  busyRef.current = busy;

  const variant = useMemo(
    () => productVariants.find((item) => item.name === plan) || productVariants[0],
    [plan]
  );
  const installationAmount = installation === "technician" ? 600 : 0;
  const total = variant.amount + installationAmount + SHIPPING_AMOUNT;

  useEffect(() => {
    if (!open) return undefined;
    setPlan(normalizePlan(initialPlan));
    setStep("configure");
    setBilling(INITIAL_BILLING);
    setStatus({ type: "idle", message: "", reference: "" });
    document.body.classList.add("purchase-open");

    const closeOnEscape = (event) => {
      if (event.key === "Escape" && !busyRef.current) onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("purchase-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, initialPlan]);

  if (!open) return null;

  function selectPlan(nextPlan) {
    setPlan(nextPlan);
    trackFunnel("PlanSelected", { plan: nextPlan, location: "purchase_flow" });
  }

  function selectController(nextController) {
    setController(nextController);
    trackFunnel("ControllerSelected", { plan, controller: nextController, location: "purchase_flow" });
  }

  function selectInstallation(nextInstallation) {
    setInstallation(nextInstallation);
    trackFunnel("InstallationSelected", { plan, installation: nextInstallation, location: "purchase_flow" });
  }

  function continueToBilling() {
    setStep("billing");
    setStatus({ type: "idle", message: "", reference: "" });
  }

  function updateBilling(field, value) {
    setBilling((current) => ({ ...current, [field]: value }));
  }

  function buildWhatsAppOrderMessage() {
    const car = carDetails ? `${carDetails.brand} ${carDetails.model} (${carDetails.year}, ${carDetails.fuel}, ${carDetails.transmission})` : "Fitment check needed";
    return [
      "Hi AHA Team, I want to reserve NexCruise.",
      `Plan: ${plan}`,
      `Controller: ${plan === "NexCruise Smart" ? (controller === "belt" ? "Belt mount" : "Magnetic mount") : "Not applicable"}`,
      `Installation: ${installation === "technician" ? "AHA-assisted technician install" : "Self-install with AHA guidance"}`,
      `Car: ${car}`,
      `Total shown: ${formatMoney(total)}`,
      "",
      "Billing / contact details:",
      `Name: ${billing.fullName || "Not entered"}`,
      `Phone: ${billing.phone || "Not entered"}`,
      `Email: ${billing.email || "Not entered"}`,
      `Address: ${billing.address || "Not entered"}`,
      `City: ${billing.city || "Not entered"}`,
      `State: ${billing.state || "Not entered"}`,
      `PIN: ${billing.pincode || "Not entered"}`
    ].join("\n");
  }

  function openWhatsAppOrder() {
    const message = buildWhatsAppOrderMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  }

  function handOffOrderToAhaTeam(reason = "checkout_unavailable") {
    openWhatsAppOrder();
    setStatus({
      type: "handoff",
      message: "Your NexCruise details have been prepared for the AHA Team. AHA will contact you on your mobile number to confirm fitment, payment, and delivery.",
      reference: reason
    });
    setStep("complete");
    setBusy(false);
    trackFunnel("PurchaseHandedOffToAhaTeam", {
      plan,
      controller: plan === "NexCruise Smart" ? controller : "not_applicable",
      installation,
      amount: total,
      contactNumber: billing.phone,
      ...billing,
      reason,
      ...carDetails
    });
  }

  async function startPayment(event) {
    event.preventDefault();
    setBusy(true);
    setStatus({ type: "loading", message: "Preparing secure checkout...", reference: "" });
    trackFunnel("BillingDetailsSubmitted", {
      plan,
      controller: plan === "NexCruise Smart" ? controller : "not_applicable",
      installation,
      amount: total,
      contactNumber: billing.phone,
      ...billing,
      ...carDetails
    });

    try {
      const order = await readJson(await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, controller, installation, billing, carDetails })
      }));
      const Razorpay = await loadRazorpay();

      const checkout = new Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "AHA NexCruise",
        description: `${plan} purchase`,
        image: `${window.location.origin}/brand/aha-mark.svg`,
        order_id: order.orderId,
        prefill: {
          name: billing.fullName,
          email: billing.email,
          contact: billing.phone
        },
        notes: { receipt: order.receipt },
        theme: { color: "#006aed" },
        retry: { enabled: true },
        modal: {
          ondismiss() {
            setBusy(false);
            setStatus({ type: "idle", message: "Payment window closed. Your order details are still here.", reference: "" });
          }
        },
        handler: async (payment) => {
          try {
            const result = await readJson(await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...payment, plan, controller, installation, billing })
            }));
            setStatus({
              type: result.status === "captured" ? "success" : "pending",
              message: result.status === "captured" ? "Payment verified. AHA will confirm fitment and dispatch details." : "Payment received and awaiting capture confirmation.",
              reference: result.paymentId
            });
            setStep("complete");
            setBusy(false);
            trackFunnel("PurchaseCompletedRazorpay", {
              plan,
              controller: plan === "NexCruise Smart" ? controller : "not_applicable",
              installation,
              amount: total,
              contactNumber: billing.phone,
              ...billing,
              order_id: result.orderId,
              payment_id: result.paymentId
            });
            trackMeta("Purchase", { value: total, currency: "INR", content_name: plan });
            trackGoogle("purchase", { transaction_id: result.paymentId, value: total, currency: "INR", items: [{ item_name: plan }] });
          } catch (error) {
            setBusy(false);
            setStatus({ type: "error", message: error.message, reference: "" });
          }
        }
      });

      checkout.on("payment.failed", (response) => {
        setBusy(false);
        setStatus({ type: "error", message: response.error?.description || "Payment failed. No order has been confirmed.", reference: "" });
      });
      checkout.open();
    } catch (error) {
      setBusy(false);
      setStatus({
        type: error.code === "PAYMENT_NOT_CONFIGURED" ? "setup" : "error",
        message: error.code === "PAYMENT_NOT_CONFIGURED" ? "Razorpay is prepared, but checkout is not live yet. Sending your order details to the AHA Team instead." : error.message,
        reference: ""
      });
      if (error.code === "PAYMENT_NOT_CONFIGURED") {
        handOffOrderToAhaTeam("razorpay_not_configured");
      }
    }
  }

  return (
    <div className="purchase-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && !busy && onClose()}>
      <section className="purchase-dialog" role="dialog" aria-modal="true" aria-labelledby="purchase-title">
        <header className="purchase-header">
          <div><span>Secure AHA checkout</span><h2 id="purchase-title">{step === "complete" ? "Order received" : "Buy NexCruise"}</h2></div>
          <button className="purchase-close" type="button" onClick={onClose} disabled={busy} aria-label="Close checkout">x</button>
        </header>

        {step !== "complete" && (
          <div className="purchase-progress" aria-label={`Checkout step ${step === "configure" ? 1 : 2} of 2`}>
            <span className="is-active">1 <small>Product</small></span>
            <i />
            <span className={step === "billing" ? "is-active" : ""}>2 <small>Billing & payment</small></span>
          </div>
        )}

        {step === "configure" && (
          <div className="purchase-layout">
            <div className="purchase-config">
              <fieldset>
                <legend>Choose your device</legend>
                <div className="purchase-plan-list">{productVariants.map((item) => <PlanOption key={item.name} variant={item} active={item.name === plan} onSelect={selectPlan} />)}</div>
              </fieldset>

              {plan === "NexCruise Smart" && (
                <fieldset>
                  <legend>Choose the steering controller mount</legend>
                  <div className="purchase-option-grid">
                    {CONTROLLER_OPTIONS.map((item) => (
                      <button key={item.id} className={controller === item.id ? "purchase-option is-selected" : "purchase-option"} type="button" onClick={() => selectController(item.id)} aria-pressed={controller === item.id}>
                        <img className="purchase-option-image" src={item.image} alt={`${item.title} installed on a steering wheel`} loading="lazy" />
                        <strong>{item.title}</strong><span>{item.body}</span><small>Included</small>
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <fieldset>
                <legend>Choose installation</legend>
                <div className="purchase-option-grid">
                  {INSTALLATION_OPTIONS.map((item) => (
                    <button key={item.id} className={installation === item.id ? "purchase-option is-selected" : "purchase-option"} type="button" onClick={() => selectInstallation(item.id)} aria-pressed={installation === item.id}>
                      <strong>{item.title}</strong><span>{item.body}</span><small>{item.amount ? formatMoney(item.amount) : "Included"}</small>
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="purchase-rail">
              {carDetails && <div className="purchase-car"><span>Fitment selection</span><strong>{carDetails.brand} {carDetails.model}</strong><small>{carDetails.year} / {carDetails.fuel} / {carDetails.transmission}</small></div>}
              <OrderSummary variant={variant} controller={controller} installation={installation} total={total} />
              <button className="primary-action purchase-next" type="button" onClick={continueToBilling}>Continue to billing <span aria-hidden="true">-&gt;</span></button>
            </div>
          </div>
        )}

        {step === "billing" && (
          <form className="billing-layout" onSubmit={startPayment}>
            <div className="billing-form">
              <div className="billing-heading"><span>Billing & delivery</span><h3>Where should AHA send your NexCruise?</h3><p>These details are used to identify your order, confirm fitment, and contact you if online payment is not available.</p></div>
              <div className="billing-grid">
                <label>Full name<input required autoComplete="name" value={billing.fullName} onChange={(event) => updateBilling("fullName", event.target.value)} /></label>
                <label>Mobile number<input required autoComplete="tel" inputMode="tel" pattern="[0-9+ ]{10,15}" value={billing.phone} onChange={(event) => updateBilling("phone", event.target.value)} placeholder="10-digit mobile number" /></label>
                <label className="billing-wide">Email address<input required autoComplete="email" type="email" value={billing.email} onChange={(event) => updateBilling("email", event.target.value)} /></label>
                <label className="billing-wide">Billing and delivery address<textarea required autoComplete="street-address" minLength="8" value={billing.address} onChange={(event) => updateBilling("address", event.target.value)} /></label>
                <label>City<input required autoComplete="address-level2" value={billing.city} onChange={(event) => updateBilling("city", event.target.value)} /></label>
                <label>State<input required autoComplete="address-level1" value={billing.state} onChange={(event) => updateBilling("state", event.target.value)} /></label>
                <label>PIN code<input required autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{6}" value={billing.pincode} onChange={(event) => updateBilling("pincode", event.target.value)} placeholder="6-digit PIN" /></label>
              </div>
              {status.message && <div className={`payment-status is-${status.type}`} role="status"><p>{status.message}</p>{status.type === "setup" && <button type="button" onClick={() => handOffOrderToAhaTeam("manual_whatsapp_handoff")}>Send this order to AHA Team</button>}</div>}
              <div className="billing-actions">
                <button className="text-action" type="button" onClick={() => setStep("configure")} disabled={busy}>&lt;- Change product</button>
                <button className="primary-action" type="submit" disabled={busy}>{busy ? "Preparing checkout..." : `Pay ${formatMoney(total)} securely`} <span aria-hidden="true">-&gt;</span></button>
              </div>
              <p className="payment-fineprint">Secure checkout by Razorpay. UPI, cards, netbanking, and supported wallets are shown inside the payment window.</p>
            </div>
            <OrderSummary variant={variant} controller={controller} installation={installation} total={total} compact />
          </form>
        )}

        {step === "complete" && (
          <div className="purchase-complete">
            <span className="purchase-check" aria-hidden="true">+</span>
            <h3>{status.type === "success" ? "Payment verified." : status.type === "handoff" ? "AHA Team will contact you." : "Payment confirmation in progress."}</h3>
            <p>{status.message}</p>
            {status.reference && status.type !== "handoff" && <dl><dt>Payment reference</dt><dd>{status.reference}</dd></dl>}
            <p>AHA will contact {billing.phone} with fitment and delivery details.</p>
            <button className="primary-action" type="button" onClick={onClose}>Return to NexCruise</button>
          </div>
        )}
      </section>
    </div>
  );
}
