import { WHATSAPP_LINK } from "../tracking";

export default function Hero({ heroImage, stats, onWhatsApp }) {
  return (
    <section className="hero-section" id="top">
      <span className="hero-watermark" aria-hidden="true">NexCruise</span>
      <div className="hero-grid container">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">NexCruise by AHA Automobiles</p>
          <h1>Upgrade your drive without changing your car.</h1>
          <p className="hero-sub">
            A plug-and-play cruise control upgrade for compatible Indian cars, built for calmer highways,
            smarter speed control, and cleaner long-distance comfort.
          </p>
          <p className="punchline">When cruise mode sets in... AHA.</p>
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
          <div className="hero-metrics">
            <span>Petrol / Diesel / CNG / Manual / AMT / CVT</span>
            <strong>Basic from Rs 19,990 / Smart from Rs 27,490</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
