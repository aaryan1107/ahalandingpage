import { useState } from "react";
import { testimonials, trustBadges, valuePoints } from "../data";
import { WHATSAPP_LINK, trackFunnel } from "../tracking";

export default function SocialProof({ onWhatsApp }) {
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    trackFunnel("AhaDostRequested", { city });
  }

  return (
    <section className="section owner-proof-section" id="owners">
      <div className="container owner-proof-layout">
        <div className="owner-proof-copy" data-reveal>
          <h2>4,000+ cars. The proof is in owner stories, not brochure lines.</h2>
          <p>
            NexCruise is a hardware upgrade people install, drive with, review, transfer, and call support for.
            This page keeps the actual buyer questions close to the product instead of hiding them under polish.
          </p>
          <div className="trust-badge-rail" aria-label="AHA NexCruise trust markers">
            {trustBadges.map(([label, note]) => (
              <span key={label}><strong>{label}</strong>{note}</span>
            ))}
          </div>
        </div>

        <div className="testimonial-stack" data-reveal>
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.name}>
              <p>"{item.quote}"</p>
              <strong>{item.name}</strong>
              <span>{item.car}</span>
              <a href={item.href} target="_blank" rel="noreferrer">{item.source}</a>
            </article>
          ))}
        </div>
      </div>

      <div className="container value-dost-grid">
        <div className="value-panel" data-reveal>
          <h3>What actually gets better?</h3>
          <div className="value-list">
            {valuePoints.map(([title, body]) => (
              <article key={title}>
                <strong>{title}</strong>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>

        <form className="aha-dost-panel" onSubmit={handleSubmit} data-reveal>
          <span>AHA Dost</span>
          <h3>Want to speak with someone who already has NexCruise?</h3>
          <p>Share your city and phone. AHA can route you to a real owner conversation or a fitment callback.</p>
          <div className="aha-dost-fields">
            <label>
              City
              <input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Jaipur, Delhi NCR, Mumbai..." />
            </label>
            <label>
              Phone
              <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Your number" />
            </label>
          </div>
          <div className="button-row">
            <button className="primary-button" type="submit">Connect me</button>
            <a
              className="ghost-button"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              onClick={() => onWhatsApp("aha_dost")}
            >
              WhatsApp instead
            </a>
          </div>
          {sent && <p className="aha-dost-success">Saved locally for demo. On production this should go to CRM or Sheets.</p>}
        </form>
      </div>
    </section>
  );
}
