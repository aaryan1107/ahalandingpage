import { WHATSAPP_LINK } from "../tracking";

export default function Hero({ heroImage, stats, onWhatsApp }) {
  return (
    <section className="hero-section" id="top">
      <div className="hero-grid container">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">NexCruise by AHA Automobiles</p>
          <h1>Your next highway drive. No leg pain. No fatigue stops.</h1>
          <p className="hero-sub">
            Plug-and-play cruise control for compatible Indian cars. Check your model, talk to AHA,
            and move from normal drive to AHA drive.
          </p>
          <p className="punchline">When cruise mode sets in... AHA.</p>
          <div className="button-row">
            <a className="primary-button" href="#compatibility">Check Compatibility</a>
            <a className="secondary-button" href="#callback">Request Callback</a>
            <a
              className="ghost-button"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              onClick={() => onWhatsApp("hero")}
            >
              WhatsApp Us
            </a>
          </div>
          <div className="hero-stats" aria-label="AHA Automobiles highlights">
            {stats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual" data-reveal>
          <img src={heroImage} alt="Premium car interior on an open highway" />
          <div className="hero-metrics">
            <span>Petrol · Diesel · CNG · Manual · AMT · CVT</span>
            <strong>Basic from ₹19,990 · Smart from ₹27,490</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
