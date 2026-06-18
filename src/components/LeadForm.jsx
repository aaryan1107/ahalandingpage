import { useState } from "react";
import { WHATSAPP_LINK, trackLead } from "../tracking";

const blank = {
  name: "",
  phone: "",
  brand: "Tata",
  model: "Nexon",
  city: "",
  time: "Anytime",
  message: ""
};

export default function LeadForm({ brands, onWhatsApp }) {
  const [form, setForm] = useState(blank);
  const [success, setSuccess] = useState(false);

  function setField(field, value) {
    setForm((current) => {
      if (field === "brand") {
        const brand = brands.find((item) => item.name === value);
        return { ...current, brand: value, model: brand?.models[0] || "" };
      }
      return { ...current, [field]: value };
    });
  }

  const selectedModels = brands.find((brand) => brand.name === form.brand)?.models || [];

  function submit(event) {
    event.preventDefault();
    setSuccess(true);
    trackLead("RequestCallbackSubmitted", {
      brand: form.brand,
      model: form.model,
      city: form.city,
      preferred_time: form.time,
      lead_source: "callback_form",
      contactNumber: form.phone
    });
    // Backend/API integration point: send `form` to AHA CRM, email automation, or database here.
  }

  return (
    <section className="section callback-section" id="callback">
      <div className="container callback-grid">
        <div data-reveal>
          <p className="eyebrow">Talk to AHA</p>
          <h2>Request a callback for fitment, pricing, and installation.</h2>
          <p>Tell us the car you drive. The team will confirm compatibility, installation route, and the right NexCruise variant.</p>
          <div className="callback-proof">
            <span>7-day trial guidance</span>
            <span>Lifetime support</span>
            <span>Installer city check</span>
          </div>
          <a className="ghost-button" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" onClick={() => onWhatsApp("callback_section")}>
            Prefer WhatsApp?
          </a>
        </div>
        <form className="funnel-form" onSubmit={submit} data-reveal>
          <div className="form-grid">
            <label>Full name<input required value={form.name} onChange={(event) => setField("name", event.target.value)} /></label>
            <label>Phone number<input required value={form.phone} onChange={(event) => setField("phone", event.target.value)} /></label>
            <label>Car brand<select value={form.brand} onChange={(event) => setField("brand", event.target.value)}>{brands.map((brand) => <option key={brand.name}>{brand.name}</option>)}</select></label>
            <label>Car model<select value={form.model} onChange={(event) => setField("model", event.target.value)}>{selectedModels.map((model) => <option key={model}>{model}</option>)}</select></label>
            <label>City<input required value={form.city} onChange={(event) => setField("city", event.target.value)} /></label>
            <label>Preferred contact time<select value={form.time} onChange={(event) => setField("time", event.target.value)}><option>Anytime</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
            <label className="full-span">Message<textarea value={form.message} onChange={(event) => setField("message", event.target.value)} /></label>
          </div>
          <button className="primary-button wide" type="submit">Submit Callback Request</button>
          {success && <p className="form-success">Success. AHA Automobiles will contact you shortly.</p>}
        </form>
      </div>
    </section>
  );
}
