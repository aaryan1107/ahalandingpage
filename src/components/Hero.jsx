import { WHATSAPP_LINK } from "../tracking";

export default function Hero({ heroImage, stats, selectedBrand, onWhatsApp }) {
  return (
    <section className="hero-section" id="top" style={{ "--brand-accent": selectedBrand.accent }}>
      <div className="hero-grid container">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">NexCruise by AHA Automobiles</p>
          <h1><span className="hero-title-line">Cruise control.</span><span className="hero-title-line">Indian cars.</span></h1>
          <p className="hero-sub">
            A plug-and-play upgrade for compatible Tata, Mahindra, Hyundai, Kia, Maruti, Toyota,
            Honda and MG models. AHA checks your exact variant before anyone touches the car.
          </p>
          <p className="punchline">No wire cutting. Brake override stays instant. Your right foot gets the break.</p>
          <div className="button-row">
            <a className="primary-button" href="#compatibility">Check compatibility</a>
            <a className="secondary-button" href="#callback">Request callback</a>
            <a
              className="ghost-button"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              onClick={() => onWhatsApp("hero")}
            >
              WhatsApp
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
          <div className="hero-brand-card">
            <span>Selected garage</span>
            <strong>{selectedBrand.name}</strong>
            <small>{selectedBrand.models.slice(0, 4).join(" / ")}</small>
          </div>
          <div className="hero-metrics">
            <span>Petrol / Diesel / CNG / Manual / AMT / CVT / Automatic</span>
            <strong>Basic from Rs 19,990 / Smart from Rs 27,490</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
