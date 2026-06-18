import { useEffect, useState } from "react";
import { WHATSAPP_LINK, trackCustom, trackFunnel, trackLead } from "../tracking";

const initialForm = {
  brand: "Tata",
  model: "Nexon",
  year: "",
  name: "",
  phone: "",
  city: "",
  query: ""
};

export default function CompatibilityChecker({ brands, selectedBrand, models, onBrandChange, onWhatsApp }) {
  const [form, setForm] = useState({ ...initialForm, brand: selectedBrand.name, model: selectedBrand.models[0] });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      brand: selectedBrand.name,
      model: selectedBrand.models.includes(current.model) ? current.model : selectedBrand.models[0]
    }));
  }, [selectedBrand]);

  function updateField(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);
    if (field === "brand") {
      const brand = brands.find((item) => item.name === value);
      if (brand) {
        onBrandChange(brand);
        setForm({ ...next, model: brand.models[0] });
      }
    }
  }

  function submitForm(event) {
    event.preventDefault();
    setSubmitted(true);
    trackLead("CompatibilityFormSubmitted", {
      brand: form.brand,
      model: form.model,
      city: form.city,
      lead_source: "compatibility_checker",
      contactNumber: form.phone
    });
    trackCustom("Used_Tool", { tool_name: "Compatibility Checker", brand: form.brand, model: form.model });
  }

  return (
    <section className="section deep-section" id="compatibility" style={{ "--brand-accent": selectedBrand.accent }}>
      <div className="container compatibility-grid">
        <div data-reveal>
          <p className="eyebrow">5-second compatibility check</p>
          <h2>Find out whether your car can get the AHA drive.</h2>
          <p>
            Share your brand, model, and city. AHA verifies the exact variant before installation, so you know
            what works before you spend.
          </p>
          <div className="trust-stack" aria-label="Compatibility benefits">
            <span>Petrol, diesel, CNG</span>
            <span>Manual, AMT, CVT, automatic</span>
            <span>Brake always overrides cruise</span>
          </div>
        </div>
        <form className="funnel-form" onSubmit={submitForm} data-reveal>
          <div className="form-grid">
            <label>
              Car brand
              <select value={form.brand} onChange={(event) => updateField("brand", event.target.value)}>
                {brands.map((brand) => <option key={brand.name}>{brand.name}</option>)}
              </select>
            </label>
            <label>
              Car model
              <select value={form.model} onChange={(event) => updateField("model", event.target.value)}>
                {(brands.find((brand) => brand.name === form.brand)?.models || models).map((model) => (
                  <option key={model}>{model}</option>
                ))}
              </select>
            </label>
            <label>
              Variant / year
              <input value={form.year} onChange={(event) => updateField("year", event.target.value)} placeholder="2021 Diesel, optional" />
            </label>
            <label>
              Name
              <input required value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Full name" />
            </label>
            <label>
              Phone number
              <input required value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="Mobile number" />
            </label>
            <label>
              City
              <input required value={form.city} onChange={(event) => updateField("city", event.target.value)} placeholder="Your city" />
            </label>
            <label className="full-span">
              Query / requirement
              <textarea value={form.query} onChange={(event) => updateField("query", event.target.value)} placeholder="Tell us your route, car use, or upgrade requirement" />
            </label>
          </div>
          <button className="primary-button wide" type="submit" onClick={() => trackFunnel("CheckCompatibilityClicked", { brand: form.brand, model: form.model })}>
            Check Compatibility
          </button>
          {submitted && (
            <div className="success-panel">
              <strong>Your request has been received.</strong>
              <span>Our team will verify compatibility and contact you shortly.</span>
              <div className="button-row">
                <a className="secondary-button" href="#callback">Request Callback</a>
                <a className="ghost-button" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" onClick={() => onWhatsApp("compatibility_result")}>
                  Continue on WhatsApp
                </a>
              </div>
            </div>
          )}
          {/* Backend/API integration point: POST this form to CRM, Google Sheets, Supabase, or an AHA lead API. */}
        </form>
      </div>
    </section>
  );
}
