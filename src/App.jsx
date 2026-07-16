import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import CinematicHero from "./components/CinematicHero";
import LogoIntro from "./components/LogoIntro";
import CarStage from "./components/CarStage";
import PurchaseFlow from "./components/PurchaseFlow";
import {
  WHATSAPP_LINK,
  WHATSAPP_NUMBER,
  trackCustom,
  trackFunnel,
  trackLead,
  trackWhatsApp
} from "./tracking";
import {
  carBrands,
  compareRows,
  faqs,
  installSteps,
  officialVideos,
  partners,
  productVariants,
  storeReviews,
  testimonials
} from "./data";
import "./App.css";

const AnimationRuntime = lazy(() => import("./components/AnimationRuntime"));

// Meet-the-system visuals use the authentic hardware photography: the studio
// dial and the real pod, not the generic renders they replaced.
// Meet-the-system visuals: true transparent cutouts of the real hardware
// (Vision subject lift from the supplied photographs) on dark studio stages.
const productComponents = [
  {
    id: "module",
    label: "Control pod",
    title: "The compact system behind the drive.",
    body: "NexCruise reads pedal and vehicle data, then maintains the speed you set. Brake input remains the immediate override.",
    image: "/hero/pod-cut.png",
    dark: true,
    cutout: true,
    points: ["Cruise control", "Brake override", "OTA firmware support"]
  },
  {
    id: "harness",
    label: "Car-specific harness",
    title: "Built around the exact car, not a universal splice.",
    body: "AHA matches the accelerator coupler to the selected model, year, fuel type, and transmission before installation.",
    image: "/installation/step-01-harness.png",
    dark: false,
    cutout: false,
    points: ["No wire cutting", "Reversible fitment", "Model-level verification"]
  },
  {
    id: "dial",
    label: "Wireless dial",
    title: "The controls live where the driver needs them.",
    body: "NexCruise Smart adds a steering-mounted wireless dial for set, resume, speed adjustment, drive modes, and governor control.",
    image: "/hero/dial-cut.png",
    dark: true,
    cutout: true,
    points: ["Set and resume", "Eco / City / Sport", "Speed governor"]
  }
];

const allReviews = [...testimonials, ...storeReviews];

function Arrow({ direction = "right" }) {
  return <span aria-hidden="true">{direction === "left" ? "<-" : "->"}</span>;
}

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 4.4A11.4 11.4 0 0 0 6.1 21.4L4.7 27.6l6.3-1.5A11.4 11.4 0 1 0 16 4.4Zm0 2.2a9.2 9.2 0 0 1 7.8 14.2A9.2 9.2 0 0 1 11.9 24l-.5-.2-3.7.8.8-3.7-.2-.4A9.2 9.2 0 0 1 16 6.6Zm-3.2 4.7c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5 0 1.4 1 2.9 1.2 3.1.2.2 2.1 3.3 5.2 4.5 2.6 1.1 3.1.9 3.7.8.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4l-2.1-1c-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.4.2-.7.1-1.7-.8-2.8-1.6-3.9-3.6-.2-.3 0-.4.1-.6l.8-1c.1-.2 0-.4 0-.6l-1-2.2c-.2-.6-.5-.5-.7-.5h-.8Z" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Product", "#product"],
    ["Compatibility", "#compatibility"],
    ["Compare plans", "#variants"],
    ["Installation", "#installation"],
    ["Proof", "#proof"]
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="AHA NexCruise home">
        <img className="brand-mark" src="/brand/aha-mark.svg" alt="" />
        <span><strong>AHA</strong><small>NexCruise</small></span>
      </a>
      <button className="menu-button" type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? "Close" : "Menu"}
      </button>
      <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="mobile-buy-action" href="#product" onClick={() => { setOpen(false); trackFunnel("ProductExplored", { location: "mobile_header" }); }}>Explore product <Arrow /></a>
      </nav>
      <a className="primary-action header-action" href="#product" onClick={() => trackFunnel("ProductExplored", { location: "header" })}>Explore product <Arrow /></a>
    </header>
  );
}

function BrandStatement() {
  const words = "A better long drive begins with a system that understands the car before it asks the driver to trust it.".split(" ");
  return (
    <section className="statement-section">
      <div className="statement-index">AHA / 01</div>
      <p className="scroll-statement" data-reveal>
        {words.map((word, index) => <span key={`${word}-${index}`} style={{ "--word-index": index }}>{word} </span>)}
      </p>
      <div className="statement-note">Hardware, software, fitment, and support designed as one product.</div>
    </section>
  );
}

function ProductSystem() {
  return (
    <section className="product-section" id="product">
      <div className="section-heading" data-reveal>
        <span>Meet the system</span>
        <h2>Three parts. One calmer drive.</h2>
        <p>Keep scrolling: the system walks through each component and why AHA verifies the exact car first.</p>
      </div>
      {/* Panels are stacked and driven by GSAP (pinned scrub on desktop,
          tab crossfade on mobile). See useAnimations.js. */}
      <div className="product-explorer">
        <div className="product-visual">
          {productComponents.map((item, index) => (
            <div className={["product-panel-visual", item.dark ? "is-dark" : "", item.cutout ? "is-cutout" : ""].filter(Boolean).join(" ")} key={item.id} data-panel-visual={index}>
              <img src={item.image} alt={item.label} />
            </div>
          ))}
          <div className="explorer-progress" aria-hidden="true"><span data-progress-current>01</span> / {String(productComponents.length).padStart(2, "0")}</div>
        </div>
        <div className="product-detail">
          <div className="component-tabs" role="tablist" aria-label="NexCruise components">
            {productComponents.map((item, index) => (
              <button key={item.id} role="tab" className={index === 0 ? "active" : ""} type="button">
                {item.label}
              </button>
            ))}
          </div>
          <div className="component-stage">
            {productComponents.map((item, index) => (
              <div className="component-copy" key={item.id} data-panel-copy={index}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Compatibility({ onChecked }) {
  const [form, setForm] = useState({ brand: "", brandUid: "", model: "", modelUid: "", fuel: "", transmission: "", year: "" });
  const [compatibilityResult, setCompatibilityResult] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [models, setModels] = useState([]);
  const [fitmentOptions, setFitmentOptions] = useState({ fuelOptions: [], transmissionOptions: [], years: [], hasFitment: false });
  const [serverState, setServerState] = useState({ type: "loading", message: "Connecting to NCV2 vehicle data..." });
  const requestRef = useRef(0);
  const selectedBrand = useMemo(() => carBrands.find((brand) => brand.name === form.brand), [form.brand]);

  async function requestJson(url, init) {
    const response = await fetch(url, init);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "The NCV2 compatibility service could not be reached.");
    return data;
  }

  useEffect(() => {
    let active = true;
    requestJson("/api/compatibility/companies")
      .then((data) => {
        if (!active) return;
        setCompanies(data.companies || []);
        setServerState({ type: "ready", message: `${data.companies?.length || 0} vehicle brands loaded from NCV2.` });
      })
      .catch((error) => active && setServerState({ type: "error", message: error.message }));
    return () => { active = false; };
  }, []);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setCompatibilityResult(null);
  }

  async function selectBrand(company) {
    if (!company) {
      requestRef.current += 1;
      setForm({ brand: "", brandUid: "", model: "", modelUid: "", fuel: "", transmission: "", year: "" });
      setModels([]);
      setFitmentOptions({ fuelOptions: [], transmissionOptions: [], years: [], hasFitment: false });
      setCompatibilityResult(null);
      return;
    }
    const requestId = ++requestRef.current;
    setForm({ brand: company.name, brandUid: company.uid, model: "", modelUid: "", fuel: "", transmission: "", year: "" });
    setModels([]);
    setFitmentOptions({ fuelOptions: [], transmissionOptions: [], years: [], hasFitment: false });
    setCompatibilityResult(null);
    setServerState({ type: "loading", message: `Loading ${company.name} models from NCV2...` });
    try {
      const data = await requestJson(`/api/compatibility/models?companyUid=${encodeURIComponent(company.uid)}`);
      if (requestId !== requestRef.current) return;
      setModels(data.models || []);
      setServerState({ type: "ready", message: `${data.models?.length || 0} ${company.name} models loaded from NCV2.` });
    } catch (error) {
      if (requestId === requestRef.current) setServerState({ type: "error", message: error.message });
    }
  }

  async function selectModel(model) {
    if (!model) {
      requestRef.current += 1;
      setForm((current) => ({ ...current, model: "", modelUid: "", fuel: "", transmission: "", year: "" }));
      setFitmentOptions({ fuelOptions: [], transmissionOptions: [], years: [], hasFitment: false });
      setCompatibilityResult(null);
      return;
    }
    const requestId = ++requestRef.current;
    setForm((current) => ({ ...current, model: model.name, modelUid: model.uid, fuel: "", transmission: "", year: "" }));
    setFitmentOptions({ fuelOptions: [], transmissionOptions: [], years: [], hasFitment: false });
    setCompatibilityResult(null);
    setServerState({ type: "loading", message: `Loading ${model.name} fitment options from NCV2...` });
    try {
      const data = await requestJson(`/api/compatibility/options?modelUid=${encodeURIComponent(model.uid)}`);
      if (requestId !== requestRef.current) return;
      setFitmentOptions(data);
      setServerState({
        type: data.hasFitment ? "ready" : "warning",
        message: data.hasFitment ? "Live fuel, transmission, and year options loaded from NCV2." : "Model found, but NCV2 requires manual fitment review."
      });
    } catch (error) {
      if (requestId === requestRef.current) setServerState({ type: "error", message: error.message });
    }
  }

  async function checkCompatibility(event) {
    event.preventDefault();
    const required = [["brandUid", "brand"], ["modelUid", "model"], ["fuel", "fuel"], ["transmission", "transmission"], ["year", "manufacture year"]];
    const missing = required.filter(([key]) => !form[key]).map(([, label]) => label);
    if (missing.length) {
      setCompatibilityResult({ type: "error", title: "Complete the car details", body: `Add ${missing.join(", ")} so AHA can follow the correct fitment path.` });
      return;
    }
    setCompatibilityResult({ type: "loading", title: "Checking NCV2 fitment", body: "Verifying this exact configuration on the server..." });
    try {
      const result = await requestJson("/api/compatibility/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelUid: form.modelUid, fuel: form.fuel, transmission: form.transmission, year: form.year })
      });
      const type = result.status === "compatible" ? "success" : result.status === "review" ? "warning" : "error";
      const title = result.status === "compatible"
        ? `${form.brand} ${form.model} is compatible.`
        : result.status === "review"
          ? `${form.brand} ${form.model} needs manual verification.`
          : "This exact configuration is not listed.";
      setCompatibilityResult({ type, title, body: result.message });
      if (result.status !== "not_listed") onChecked?.({ ...form });
      trackFunnel("CheckCompatibilityClicked", { ...form, compatibility_status: result.status, location: "compatibility_workspace" });
    } catch (error) {
      setCompatibilityResult({ type: "error", title: "Server check unavailable", body: `${error.message} Please use WhatsApp so AHA can verify the car manually.` });
    }
  }

  return (
    <section className="compatibility-section" id="compatibility">
      <div className="compatibility-intro" data-reveal>
        <span>Brand-specific experience</span>
        <h2>AHA stays constant. The garage adapts to your car.</h2>
        <p>Pick your brand and the garage updates models, fit confidence, and the compatibility path. AHA then verifies the exact model, fuel, transmission, and year.</p>
        <div className="compatibility-trust"><span>No wire cutting</span><span>Brake override</span><span>Car-specific cable</span></div>
      </div>
      <div className="brand-garage" data-reveal>
        {carBrands.map((brand) => (
          <button
            key={brand.name}
            type="button"
            className={form.brand === brand.name ? "brand-card active" : "brand-card"}
            style={{ "--brand-accent": brand.accent }}
            onClick={() => {
              const company = companies.find((item) => item.name === brand.name);
              if (company) selectBrand(company);
              else setCompatibilityResult({ type: "error", title: "NCV2 is still loading", body: "Wait for the live vehicle server connection, then select the brand again." });
              trackCustom("Brand_Selected", { brand: brand.name, location: "brand_garage" });
            }}
          >
            <span className="brand-logo"><img src={brand.logo} alt="" loading="lazy" /></span>
            <strong>{brand.name}</strong>
            <small>{brand.fleet}</small>
          </button>
        ))}
      </div>
      {selectedBrand && (
        <div className="brand-brief" style={{ "--brand-accent": selectedBrand.accent }}>
          <p>{selectedBrand.copy}</p>
          <div className="brand-models" role="group" aria-label={`${selectedBrand.name} models`}>
            {models.map((model) => (
              <button key={model.uid} type="button" className={form.modelUid === model.uid ? "active" : ""} onClick={() => selectModel(model)}>
                {model.name}
              </button>
            ))}
            {serverState.type === "loading" && <span>Loading live models...</span>}
          </div>
        </div>
      )}
      <div className="compatibility-lower">
        <CarStage brand={form.brand} model={form.model} accent={selectedBrand?.accent} />
        <div className="compatibility-workspace" data-reveal>
          <div className={`compatibility-server-status is-${serverState.type}`} role="status"><i />{serverState.message}</div>
          <form onSubmit={checkCompatibility}>
            <label>Brand<select value={form.brandUid} onChange={(event) => selectBrand(companies.find((company) => company.uid === event.target.value))} disabled={!companies.length}><option value="">Select brand</option>{companies.map((company) => <option key={company.uid} value={company.uid}>{company.name}</option>)}</select></label>
            <label>Model<select value={form.modelUid} onChange={(event) => selectModel(models.find((model) => model.uid === event.target.value))} disabled={!models.length}><option value="">Select model</option>{models.map((model) => <option key={model.uid} value={model.uid}>{model.name}</option>)}</select></label>
            <label>Fuel<select value={form.fuel} onChange={(event) => update("fuel", event.target.value)} disabled={!fitmentOptions.fuelOptions.length}><option value="">Select fuel</option>{fitmentOptions.fuelOptions.map((fuel) => <option key={fuel}>{fuel}</option>)}</select></label>
            <label>Transmission<select value={form.transmission} onChange={(event) => update("transmission", event.target.value)} disabled={!fitmentOptions.transmissionOptions.length}><option value="">Select transmission</option>{fitmentOptions.transmissionOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Manufacture year<select value={form.year} onChange={(event) => update("year", event.target.value)} disabled={!fitmentOptions.years.length}><option value="">Select year</option>{fitmentOptions.years.map((year) => <option key={year}>{year}</option>)}</select></label>
            <button className="primary-action form-action" type="submit" disabled={compatibilityResult?.type === "loading"}>Check live compatibility <Arrow /></button>
          </form>
          {compatibilityResult && (
            <div className="compatibility-result" data-status={compatibilityResult.type} role="status">
              <strong>{compatibilityResult.title}</strong><p>{compatibilityResult.body}</p>
              {(compatibilityResult.type === "success" || compatibilityResult.type === "warning") && (
                <a
                  href="#callback"
                  onClick={() => trackFunnel("CompatibilityToCallback", { ...form, location: "compatibility_result" })}
                >
                  Add your name and number <Arrow />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Variants({ onChoose }) {
  const [basic, smart] = productVariants;
  const packageImage = "/attached_assets/nexcruise-box.jpeg";
  const cards = [
    { variant: basic, tag: "Essential cruise package", featureIndex: 1, smartCard: false },
    { variant: smart, tag: "Full control package", featureIndex: 2, smartCard: true }
  ];
  return (
    <section className="variants-section" id="variants">
      <div className="section-heading inverse" data-reveal>
        <span>Choose the product</span>
        <h2>Choose the NexCruise that fits your driving.</h2>
      </div>
      {/* One shared product photo (both variants ship as this box), with the
          two packages compared beside it — no duplicated imagery. */}
      <div className="compare-shell" data-reveal>
        <figure className="compare-hero">
          <img src={packageImage} alt="NexCruise box" />
          <div className="compare-hero-parts">
            <span><img src="/hero/pod-cut.png" alt="" loading="lazy" /> Control pod — in every box</span>
            <span><img src="/hero/dial-cut.png" alt="" loading="lazy" /> Wireless steering dial — included on Smart</span>
          </div>
          <figcaption>Every NexCruise ships with the control pod and your car-specific cable. Smart adds the wireless steering dial and advanced drive modes.</figcaption>
        </figure>
        <div className="compare-grid">
        {cards.map(({ variant, tag, featureIndex, smartCard }) => (
          <article key={variant.name} className={smartCard ? "compare-card is-smart" : "compare-card"} data-smart-card={smartCard || undefined}>
            {smartCard && <span className="compare-flag">Most chosen</span>}
            <div className="compare-head">
              <span>{tag}</span>
              <h3>{variant.name}</h3>
              <strong className="variant-price">{variant.price}</strong>
            </div>
            <ul className="compare-rows">
              {compareRows.map((row) => {
                const [feature] = row;
                const included = row[featureIndex];
                return (
                  <li key={feature} className={included ? "included" : "excluded"} data-smart-row={smartCard && !row[1] ? "" : undefined}>
                    <i aria-hidden="true">{included ? "+" : "-"}</i>
                    <span>{feature}</span>
                  </li>
                );
              })}
            </ul>
            <div className="variant-actions">
              <button className="primary-action" type="button" onClick={() => onChoose(variant.name)}>Choose {variant.name.replace("NexCruise ", "")} <Arrow /></button>
              <a className="text-action light" href={`https://www.youtube.com/watch?v=${variant.demoId}`} target="_blank" rel="noreferrer">Watch demo <Arrow /></a>
            </div>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}

const FILM_ID = "S3WyAb5QAZg";

function FilmPanel() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="film-section" id="film">
      <div className="film-theatre">
        <div className="film-heading" data-reveal>
          <span>Watch the film</span>
          <h2>NexCruise,<br />in motion.</h2>
          <p>Step inside the product story: the controls, the fitment, and the thinking behind a calmer long drive.</p>
        </div>
        <div className="film-frame" data-reveal>
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${FILM_ID}?autoplay=1&rel=0`}
              title="AHA NexCruise film"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="film-poster"
              aria-label="Play the NexCruise film"
              onClick={() => {
                setPlaying(true);
                trackCustom("Watch_Film_Clicked", { youtube_id: FILM_ID });
              }}
            >
              <img src="/hero/hero-poster.jpg" alt="" loading="lazy" />
              <span className="film-title-card"><strong>Understanding NexCruise</strong><small>Features, benefits, and how it works</small></span>
              <span className="film-play" aria-hidden="true" />
              <span className="film-label">AHA Film / 16:41</span>
            </button>
          )}
        </div>
        <div className="film-exit-note" data-reveal>
          <div><span>Back in the driver's seat</span><strong>Now check the exact fitment path for your car.</strong></div>
          <a className="text-action light" href="#compatibility">Open compatibility garage <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function PartnersMarquee() {
  const row = [...partners, ...partners];
  return (
    <section className="partners-section" aria-label="Featured across the industry">
      <div className="partners-heading"><span>Featured across the industry</span></div>
      <div className="marquee" data-marquee>
        <div className="marquee-track" data-marquee-track>
          {row.map((partner, index) => (
            <a key={`${partner.name}-${index}`} className="marquee-item" href={partner.href} target="_blank" rel="noreferrer" tabIndex={index >= partners.length ? -1 : 0} aria-hidden={index >= partners.length}>
              {partner.image ? <img src={partner.image} alt={partner.name} loading="lazy" /> : <span>{partner.name}</span>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Installation() {
  const [activeStep, setActiveStep] = useState(0);
  const step = installSteps[activeStep];
  return (
    <section className="installation-section" id="installation">
      <div className="section-heading" data-reveal><span>Installation</span><h2>See every connection before the car is touched.</h2></div>
      <div className="installation-stage" data-reveal>
        <div className={step[3].includes("dial-cut") ? "step-image is-cutout" : "step-image"}><img src={step[3]} alt={step[1]} data-speed="auto" /></div>
        <div className="step-detail"><span>Step {activeStep + 1} of {installSteps.length}</span><h3>{step[1]}</h3><p>{step[2]}</p><div className="step-controls"><button type="button" onClick={() => setActiveStep((activeStep - 1 + installSteps.length) % installSteps.length)} aria-label="Previous installation step"><Arrow direction="left" /></button><button type="button" onClick={() => setActiveStep((activeStep + 1) % installSteps.length)} aria-label="Next installation step"><Arrow /></button></div></div>
      </div>
      <div className="step-nav" data-reveal>{installSteps.map((item, index) => <button key={item[0]} className={index === activeStep ? "active" : ""} type="button" onClick={() => setActiveStep(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item[1]}</button>)}</div>
    </section>
  );
}

function VideoProof() {
  const [preview, setPreview] = useState(null);
  const videos = officialVideos.slice(0, 3);

  return (
    <section className="video-section" id="proof">
      <div className="section-heading" data-reveal><span>Real product. Real demonstrations.</span><h2>Inspect NexCruise before you book.</h2></div>
      <div className="video-stage">
        <div className="video-list" onMouseLeave={() => setPreview(null)}>
          {videos.map((video, index) => (
            <a key={video.id} className="video-row" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" data-reveal onMouseEnter={() => setPreview(video)} onFocus={() => setPreview(video)} onClick={() => trackCustom("Watch_Demo_Clicked", { youtube_id: video.id })}>
              <span className="video-number">0{index + 1}</span>
              <span className="video-thumb"><img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" /></span>
              <span className="video-copy"><strong>{video.title}</strong><small>{video.note}</small></span>
              <span className="video-action">Watch {video.duration} <Arrow /></span>
            </a>
          ))}
        </div>
        <aside className={preview ? "video-preview is-active" : "video-preview"} aria-hidden="true">
          {preview && (
            <>
              <img src={`https://i.ytimg.com/vi/${preview.id}/hqdefault.jpg`} alt="" />
              <div className="video-preview-copy"><span>Now previewing</span><strong>{preview.title}</strong><small>{preview.duration}</small></div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

const REVIEW_INTERVAL_MS = 6000;

function OwnerProof() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const review = allReviews[reviewIndex];

  // Auto-advance within a time limit; hovering or focusing pauses the timer,
  // and manual navigation restarts it (the effect re-runs on reviewIndex).
  useEffect(() => {
    if (paused) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const timer = setTimeout(
      () => setReviewIndex((current) => (current + 1) % allReviews.length),
      REVIEW_INTERVAL_MS
    );
    return () => clearTimeout(timer);
  }, [reviewIndex, paused]);

  return (
    <section
      className="owner-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="owner-quote" data-reveal>
        <span>Owner proof</span>
        <blockquote key={reviewIndex} data-review-quote>“{review.quote}”</blockquote>
        <div key={`meta-${reviewIndex}`} data-review-meta><strong>{review.name}</strong><small>{review.car} / {review.source}</small></div>
        <a href={review.href} target="_blank" rel="noreferrer">Read source <Arrow /></a>
      </div>
      <div className="owner-controls" data-reveal>
        <span>{String(reviewIndex + 1).padStart(2, "0")} / {String(allReviews.length).padStart(2, "0")}</span>
        <button type="button" onClick={() => setReviewIndex((reviewIndex - 1 + allReviews.length) % allReviews.length)} aria-label="Previous owner review"><Arrow direction="left" /></button>
        <button type="button" onClick={() => setReviewIndex((reviewIndex + 1) % allReviews.length)} aria-label="Next owner review"><Arrow /></button>
        <span className={paused ? "owner-timer is-paused" : "owner-timer"} key={`timer-${reviewIndex}-${paused}`} aria-hidden="true"><i /></span>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section" id="faq">
      <div className="section-heading" data-reveal><span>Before you decide</span><h2>Questions worth asking.</h2></div>
      <div className="faq-list" data-reveal>{faqs.slice(0, 7).map(([question, answer], index) => <article key={question} className={open === index ? "open" : ""}><button type="button" onClick={() => setOpen(open === index ? -1 : index)}><span>{question}</span><strong>{open === index ? "-" : "+"}</strong></button><div><p>{answer}</p></div></article>)}</div>
    </section>
  );
}

function Callback({ preferredPlan, carDetails }) {
  const [form, setForm] = useState({ name: "", phone: "", city: "", plan: preferredPlan });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => setForm((current) => ({ ...current, plan: preferredPlan })), [preferredPlan]);

  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
    trackLead("RequestCallbackSubmitted", { contactNumber: form.phone, city: form.city, plan: form.plan, ...carDetails, lead_source: "aurora_site_callback" });
    // The lead lands on AHA's WhatsApp as one complete message: name, number,
    // city, chosen plan, and the checked car. This is the reliable record —
    // Pixel/Ads/dashboard events are analytics, not a lead inbox.
    const car = carDetails
      ? ` Car: ${carDetails.brand} ${carDetails.model} (${carDetails.year}, ${carDetails.fuel}, ${carDetails.transmission}).`
      : "";
    const message = `Hi AHA! I'm ${form.name} from ${form.city}. I want ${form.plan}.${car} Please arrange my fitment callback. My number: ${form.phone}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  }

  return (
    <section className="callback-section" id="callback">
      <div className="callback-copy" data-reveal>
        <span>Ready for the fitment check?</span>
        <h2>Your car. Your route. The right NexCruise.</h2>
        <p>Add your name and number — Request callback opens WhatsApp with your full details{carDetails ? ` including your ${carDetails.brand} ${carDetails.model}` : " (and your checked car, if you used the garage)"} so AHA has everything in one message.</p>
        <a className="whatsapp-action" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("callback") }><WhatsAppMark /> WhatsApp AHA <Arrow /></a>
      </div>
      <form className="callback-form" onSubmit={submit} data-reveal>
        <label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label>
        <label>Phone<input required inputMode="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="10-digit mobile number" /></label>
        <label>City<input required value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} placeholder="Your city" /></label>
        <label>Interested in<select value={form.plan} onChange={(event) => setForm({ ...form, plan: event.target.value })}>{productVariants.map((variant) => <option key={variant.name}>{variant.name}</option>)}</select></label>
        {carDetails && <p className="callback-car-note">Included: {carDetails.brand} {carDetails.model} · {carDetails.year} · {carDetails.fuel} · {carDetails.transmission}</p>}
        <button className="primary-action form-submit" type="submit">Request callback <Arrow /></button>
        {submitted && <p className="callback-status" role="status">WhatsApp is opening with your details — hit send and AHA has everything. The lead is also logged to the AHA marketing dashboard.</p>}
      </form>
    </section>
  );
}

function Footer() {
  const address = "I/F-2, Solitaire Park, Ajmer Road, Jaipur, Rajasthan 303007";
  const mapsLink = "https://www.google.com/maps?q=I%2FF-2%2C%20Solitaire%20Park%2C%20Ajmer%20Road%2C%20Jaipur%2C%20Rajasthan%20303007";
  const socials = [
    ["YouTube", "https://www.youtube.com/@ahainnovations"],
    ["Instagram", "https://www.instagram.com/nexcruise.aha/"],
    ["Facebook", "https://www.facebook.com/aha.nexcruise"],
    ["WhatsApp", WHATSAPP_LINK]
  ];
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="brand inverse" href="#top"><img className="brand-mark" src="/brand/aha-mark.svg" alt="" /><span><strong>AHA</strong><small>NexCruise</small></span></a>
        <p><strong>Aha! NexCruise®</strong> upgrades cars with next-generation features through simple plug-and-play technology.</p>
      </div>
      <div><strong>Explore</strong><a href="#product">Product</a><a href="#compatibility">Compatibility</a><a href="#variants">Compare plans</a><a href="#installation">Installation</a></div>
      <div><strong>Contact</strong><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">+91 83069 24400</a><a href="mailto:support@aha3d.in">support@aha3d.in</a><a className="footer-address" href={mapsLink} target="_blank" rel="noreferrer">{address}</a></div>
      <div><strong>Official store</strong><a href="https://aha.store/" target="_blank" rel="noreferrer">aha.store</a><a href="https://aha.store/live-data" target="_blank" rel="noreferrer">Live data source</a></div>
      <div><strong>Follow AHA</strong>{socials.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}</div>
      <div className="footer-end"><span>Made in Jaipur.</span><span>Built for Indian roads.</span></div>
    </footer>
  );
}

export default function App() {
  const [preferredPlan, setPreferredPlan] = useState("NexCruise Smart");
  const [carDetails, setCarDetails] = useState(null);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const pageRef = useRef(null);

  function choosePlan(plan) {
    setPreferredPlan(plan);
    setPurchaseOpen(true);
    trackFunnel("DeviceSelected", { plan, location: "variant" });
    trackFunnel("PlanSelected", { plan, location: "variant" });
  }

  return (
    <div ref={pageRef}>
      <Suspense fallback={null}>
        <AnimationRuntime scopeRef={pageRef} />
      </Suspense>
      <LogoIntro />
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main><CinematicHero /><PartnersMarquee /><BrandStatement /><ProductSystem /><Compatibility onChecked={setCarDetails} /><Variants onChoose={choosePlan} /><Installation /><FilmPanel /><VideoProof /><OwnerProof /><FAQ /><Callback preferredPlan={preferredPlan} carDetails={carDetails} /></main>
          <Footer />
        </div>
      </div>
      <PurchaseFlow
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        initialPlan={preferredPlan}
        carDetails={carDetails}
      />
    </div>
  );
}
