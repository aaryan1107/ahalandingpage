import { useEffect, useState } from "react";
import { WHATSAPP_LINK, trackFunnel, trackWhatsApp } from "../tracking";

const proofStats = [
  ["4,000+", "installations", 4000, "+"],
  ["60+", "installer cities", 60, "+"],
  ["2", "product choices", 2, ""],
  ["India", "designed and built", null, ""]
];

function Arrow() {
  return <span aria-hidden="true">-&gt;</span>;
}

export default function CinematicHero() {
  const [loadFilm, setLoadFilm] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let idleId;
    const loadAfterFirstPaint = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => setLoadFilm(true), { timeout: 1800 });
      } else {
        idleId = window.setTimeout(() => setLoadFilm(true), 900);
      }
    };

    if (document.readyState === "complete") {
      loadAfterFirstPaint();
    } else {
      window.addEventListener("load", loadAfterFirstPaint, { once: true });
    }

    return () => {
      window.removeEventListener("load", loadAfterFirstPaint);
      if ("cancelIdleCallback" in window && typeof idleId === "number") window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  return (
    <>
      <section className="cinematic-hero" id="top">
        {/* Driver-POV film: stable cockpit, road moving through the windshield */}
        <div className="hero-media" aria-hidden="true">
          <img
            className="hero-cockpit"
            src="/hero/optimized/hero-poster-lcp.webp"
            alt=""
            width="1920"
            height="1080"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
          {loadFilm ? (
            <video
              className="hero-product-film"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/hero/optimized/hero-poster-lcp.webp"
            >
              <source src="/hero/nexcruise-hero.mp4" type="video/mp4" />
            </video>
          ) : null}
          <div className="hero-media-scrim" />
        </div>

        {/* Authentic hardware as true transparent cutouts. Separate wrappers
            keep the pod entrance and scroll choreography from fighting over
            visibility when the visitor returns to the hero. */}
        <div className="hero-hardware" data-hero-assembly aria-hidden="true">
          <div className="hero-pod-entry" data-hero-pod-entry>
            <figure className="hero-pod-card" data-hero-pod>
              <img className="hero-product-pod" src="/hero/optimized/pod-cut.webp" alt="" width="528" height="358" loading="eager" decoding="async" />
              <figcaption><span>02</span> Control pod</figcaption>
            </figure>
          </div>
          <div className="hero-dial-stack" data-hero-dial-stack>
            <span className="hero-dial-halo" data-hero-halo />
            <img className="hero-product-dial hero-dial-ring" data-hero-ring src="/hero/optimized/dial-cut.webp" alt="" width="385" height="394" fetchPriority="high" loading="eager" decoding="async" />
            <figcaption className="hero-dial-caption"><span>01</span> Steering dial</figcaption>
          </div>
        </div>

        <div className="hero-shell">
          <div className="hero-copy" data-hero-copy>
            <span className="hero-product-name">AHA NexCruise</span>
            <h1>Drive smarter.<br />Cruise longer.</h1>
            <p>Car-specific hardware for calmer highways, with immediate brake override and AHA-verified fitment.</p>
            <div className="hero-actions">
              <a className="primary-action" href="#compatibility" onClick={() => trackFunnel("CheckCompatibilityClicked", { location: "hero" })}>
                Check compatibility <Arrow />
              </a>
              <a className="hero-whatsapp" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("hero")}>
                WhatsApp AHA <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="hero-proof-strip" aria-label="AHA NexCruise product proof">
        {proofStats.map(([value, label, count, suffix]) => (
          <div key={label}>
            <strong {...(count != null ? { "data-count": count, "data-suffix": suffix } : {})}>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
