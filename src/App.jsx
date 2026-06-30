import { useMemo, useState } from "react";
import {
  WHATSAPP_LINK,
  trackCustom,
  trackFunnel,
  trackLead,
  trackMeta,
  trackWhatsApp
} from "./tracking";
import {
  carBrands,
  faqs,
  installSteps,
  officialVideos,
  productVariants,
  testimonials
} from "./data";
import "./App.css";

const popularModels = [
  { brand: "Hyundai", model: "Creta", key: "creta" },
  { brand: "Toyota", model: "Innova Crysta", key: "innova" },
  { brand: "Kia", model: "Seltos", key: "seltos" },
  { brand: "Mahindra", model: "Thar", key: "thar" },
  { brand: "Tata", model: "Safari", key: "safari" }
];

const modelStyles = {
  creta: { body: "#24313a", roof: "#1a252c", glass: "#76d6d2", accent: "#b6c0c7", stance: "urban" },
  innova: { body: "#d8dde0", roof: "#bcc7cc", glass: "#83d9d5", accent: "#f2f5f6", stance: "mpv" },
  seltos: { body: "#eef2f2", roof: "#cbd4d6", glass: "#74d3d0", accent: "#ff9f4a", stance: "compact" },
  thar: { body: "#1c2523", roof: "#101614", glass: "#6bc7c3", accent: "#ff9f4a", stance: "boxy" },
  safari: { body: "#4d5654", roof: "#323b3c", glass: "#7ad7d3", accent: "#d7d9d7", stance: "suv" }
};

const heroCards = [
  ["Effortless Highway Drives", "Set speed. Relax. Drive safer."],
  ["Smart Speed Maintained", "Uphill or downhill. We handle it."],
  ["Plug & Play Installation", "No wire cuts. No warranty anxiety."]
];

const heroProductDetails = [
  ["Car-specific harness", "Inline coupler, no wire cutting"],
  ["Steering dial", "Set, resume and adjust speed"],
  ["Brake override", "Tap brake to cancel instantly"],
  ["Transfer ready", "Move it to another compatible car"]
];

const reviewCards = [
  {
    quote: "Long drives are so much easier now. My right leg finally gets a break.",
    name: "Vikram S.",
    car: "Hyundai Creta",
    modelKey: "creta"
  },
  {
    quote: "Installed in 90 minutes. Feels OEM. No lag, no jerks.",
    name: "Ankit M.",
    car: "Kia Seltos",
    modelKey: "seltos"
  },
  {
    quote: "Delhi to Jaipur every week. NexCruise has been a game changer.",
    name: "Pooja R.",
    car: "Toyota Innova Crysta",
    modelKey: "innova"
  },
  {
    quote: "Even works in bumper to bumper traffic. Smart speed control is gold.",
    name: "Arjun N.",
    car: "Tata Harrier",
    modelKey: "safari"
  }
];

const savings = [
  ["Save up to", "Rs 18,000 / year", "on fuel"],
  ["Reduce fatigue on", "long highway drives", ""],
  ["Better speed control", "fewer challans & safer drives", ""]
];

const footerLinks = {
  Product: ["NexCruise Basic", "NexCruise Smart", "Car compatibility", "Installation steps"],
  Support: ["WhatsApp support", "Warranty questions", "Installer near me", "Transfer to next car"],
  Proof: ["Team-BHP owners", "Nexon EV Owners Club", "AHA YouTube demos", "Made in Jaipur"]
};

function Icon({ children }) {
  return <span className="icon-mark" aria-hidden="true">{children}</span>;
}

function CarModel({ type = "creta", label = "Compatible car", className = "" }) {
  const style = modelStyles[type] || modelStyles.creta;
  const isBoxy = style.stance === "boxy";
  const isMpv = style.stance === "mpv";
  const isCompact = style.stance === "compact";

  return (
    <svg className={`car-model ${className}`} viewBox="0 0 520 230" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`body-${type}`} x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={style.accent} stopOpacity="0.32" />
          <stop offset="34%" stopColor={style.body} />
          <stop offset="100%" stopColor="#0b1114" />
        </linearGradient>
        <linearGradient id={`glass-${type}`} x1="0%" x2="100%">
          <stop offset="0%" stopColor={style.glass} stopOpacity="0.78" />
          <stop offset="100%" stopColor="#17252b" stopOpacity="0.9" />
        </linearGradient>
        <filter id={`glow-${type}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="266" cy="196" rx="208" ry="24" fill="rgba(0,0,0,.48)" />
      <path
        d={
          isBoxy
            ? "M74 120 C92 80 132 58 196 58 H338 C397 58 444 88 466 130 L490 150 C500 158 498 180 484 185 H54 C43 185 36 174 43 163 L74 120 Z"
            : isMpv
              ? "M54 132 C84 88 127 64 197 54 H330 C394 58 448 96 474 138 L498 150 C510 158 503 184 486 187 H52 C36 186 30 174 40 160 L54 132 Z"
              : "M58 135 C86 94 126 73 190 68 H330 C395 71 448 102 472 141 L493 153 C504 161 499 184 483 187 H54 C39 186 33 174 42 160 L58 135 Z"
        }
        fill={`url(#body-${type})`}
        stroke="rgba(255,255,255,.16)"
        strokeWidth="2"
      />
      <path
        d={
          isBoxy
            ? "M158 72 H316 C354 73 384 93 402 125 H120 C129 96 140 80 158 72 Z"
            : "M170 70 H318 C354 75 386 98 407 129 H126 C139 99 151 79 170 70 Z"
        }
        fill={`url(#glass-${type})`}
        stroke="rgba(119,214,210,.28)"
        strokeWidth="2"
      />
      <path d="M238 75 L218 128" stroke="rgba(255,255,255,.24)" strokeWidth="2" />
      <path d="M326 78 L336 128" stroke="rgba(255,255,255,.18)" strokeWidth="2" />
      <rect x="74" y="145" width="56" height="10" rx="5" fill={style.glass} filter={`url(#glow-${type})`} />
      <rect x="438" y="146" width="38" height="11" rx="6" fill="#ff9f4a" filter={`url(#glow-${type})`} />
      <path d="M112 170 H420" stroke="rgba(255,255,255,.18)" strokeWidth="12" strokeLinecap="round" />
      <circle cx="150" cy="184" r={isCompact ? 32 : 36} fill="#05090c" stroke="rgba(255,255,255,.16)" strokeWidth="2" />
      <circle cx="150" cy="184" r={isCompact ? 17 : 19} fill="#15242a" />
      <circle cx="150" cy="184" r="6" fill={style.glass} />
      <circle cx="402" cy="184" r={isCompact ? 32 : 36} fill="#05090c" stroke="rgba(255,255,255,.16)" strokeWidth="2" />
      <circle cx="402" cy="184" r={isCompact ? 17 : 19} fill="#15242a" />
      <circle cx="402" cy="184" r="6" fill={style.glass} />
      <path d="M102 118 C124 110 148 106 181 108" stroke="rgba(255,255,255,.18)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="whatsapp-svg" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16.02 4.4A11.4 11.4 0 0 0 6.1 21.42L4.7 27.6l6.32-1.47A11.4 11.4 0 1 0 16.02 4.4Zm0 2.15a9.25 9.25 0 0 1 7.8 14.22 9.23 9.23 0 0 1-11.96 3.16l-.43-.22-3.77.88.84-3.68-.25-.45a9.25 9.25 0 0 1 7.77-13.91Zm-3.2 4.7c-.2 0-.53.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.1 3.35 5.2 4.57 2.58 1.02 3.1.82 3.66.77.56-.05 1.8-.73 2.05-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35-.3-.15-1.8-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.64-.93-2.24-.24-.58-.49-.5-.68-.51h-.7Z" />
    </svg>
  );
}

function Header() {
  const nav = [
    ["Home", "#top"],
    ["Product", "#compare"],
    ["Compatibility", "#compatibility"],
    ["Installation", "#installation"],
    ["Videos", "#videos"],
    ["About Us", "#about"],
    ["Support", "#callback"]
  ];

  return (
    <header className="nx-header">
      <a className="nx-logo" href="#top" aria-label="AHA NexCruise home">
        <span>AHA</span>
        <strong>NexCruise</strong>
      </a>

      <nav className="nx-nav" aria-label="Primary navigation">
        {nav.map(([item, href]) => (
          <a key={item} href={href}>{item}</a>
        ))}
      </nav>

      <a
        className="book-call"
        href="#compare"
        onClick={() => trackFunnel("BookCallClicked", { location: "header" })}
      >
        Buy Now <span aria-hidden="true">-&gt;</span>
      </a>
    </header>
  );
}

function Hero() {
  const [speed, setSpeed] = useState(80);
  const roadDuration = Math.max(0.7, 4.2 - speed / 26);
  const wheelDuration = Math.max(0.34, 1.4 - speed / 118);

  function changeSpeed(delta) {
    setSpeed((current) => Math.min(120, Math.max(40, current + delta)));
  }

  return (
    <section
      id="top"
      className="hero"
      style={{
        "--road-speed": `${roadDuration}s`,
        "--wheel-speed": `${wheelDuration}s`,
        "--speed-glow": `${speed / 120}`
      }}
    >
      <div className="motion-road" aria-hidden="true">
        <div className="road-horizon" />
        <div className="road-lane lane-left" />
        <div className="road-lane lane-mid" />
        <div className="road-lane lane-right" />
        <div className="road-streaks" />
        <div className="driving-car">
          <span className="car-shadow" />
          <span className="car-beam left-beam" />
          <span className="car-beam right-beam" />
          <div className="drive-car-body">
            <span className="drive-window windscreen" />
            <span className="drive-window side-window" />
            <span className="drive-light headlight" />
            <span className="drive-light taillight" />
            <span className="drive-wheel drive-front-wheel" />
            <span className="drive-wheel drive-rear-wheel" />
          </div>
        </div>
        <div className="cockpit">
          <div className="wheel" />
          <div className="dash dash-left"><span>{speed}</span></div>
          <div className="dash dash-right"><span>AHA</span><small>NEXCRUISE</small></div>
        </div>
      </div>
      <div className="hero-shade" />

      <div className="hero-content">
        <div className="hero-copy">
          <h1>Drive Smarter.<br /><span>Cruise Longer.</span></h1>
          <p>
            <strong>AHA NexCruise</strong> is aftermarket cruise control for your car.
            Safe. Smart. Seamless. Built for Indian roads.
          </p>

          <div className="hero-detail-grid" aria-label="NexCruise product details">
            {heroProductDetails.map(([title, body]) => (
              <div key={title}>
                <strong>{title}</strong>
                <span>{body}</span>
              </div>
            ))}
          </div>

          <div className="hero-feature-row">
            {heroCards.map(([title, body], index) => (
              <article className="hero-feature" key={title}>
                <Icon>{index === 0 ? "O" : index === 1 ? "~" : "+"}</Icon>
                <div>
                  <strong>{title}</strong>
                  <span>{body}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="hero-actions">
            <a className="btn btn-teal" href="#compatibility" onClick={() => trackFunnel("CheckCompatibilityClicked", { location: "hero" })}>
              Check My Car <span aria-hidden="true">&gt;</span>
            </a>
            <a className="btn btn-glass" href="#videos" onClick={() => trackCustom("Used_Tool", { tool_name: "Watch Video", location: "hero" })}>
              Watch Video <span aria-hidden="true">▷</span>
            </a>
          </div>
        </div>

        <div className="speed-widget" aria-label="Cruise active speed widget">
          <div className="speed-top">
            <span className="gauge">⌁</span>
            <span>Cruise<br />Active</span>
          </div>
          <div className="speed-value"><strong>{speed}</strong> km/h</div>
          <div className="speed-set">
            <span>Set Speed</span>
            <div>
              <button type="button" onClick={() => changeSpeed(-5)} aria-label="Decrease speed">-</button>
              <b>{speed}</b>
              <button type="button" onClick={() => changeSpeed(5)} aria-label="Increase speed">+</button>
            </div>
          </div>
        </div>

        <div className="hero-badges">
          <span><Icon>⌁</Icon> Works in City & Highway</span>
          <span>Petrol · Diesel · Turbo</span>
        </div>
      </div>
    </section>
  );
}

function CompatibilityStrip() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [modelKey, setModelKey] = useState("creta");
  const selectedBrand = useMemo(() => carBrands.find((item) => item.name === brand), [brand]);

  function checkCompatibility() {
    trackFunnel("CheckCompatibilityClicked", { brand, model, location: "compatibility_strip" });
    trackCustom("Used_Tool", { tool_name: "Compatibility Checker", brand, model });
  }

  function selectPopular(item) {
    setBrand(item.brand);
    setModel(item.model);
    setModelKey(item.key);
    trackFunnel("BrandSelected", { brand: item.brand, model: item.model, location: "popular_model" });
  }

  return (
    <section id="compatibility" className="compat-strip">
      <div>
        <h2>Check if<br />NexCruise works<br />in your car.</h2>
        <p>1000+ variants across popular brands.</p>
      </div>

      <div className="compat-form">
        <select value={brand} onChange={(event) => { setBrand(event.target.value); setModel(""); }}>
          <option value="">Select Brand</option>
          {carBrands.map((item) => <option key={item.name}>{item.name}</option>)}
        </select>
        <select value={model} onChange={(event) => setModel(event.target.value)}>
          <option value="">Select Model</option>
          {(selectedBrand?.models || []).map((item) => <option key={item}>{item}</option>)}
        </select>
        <select>
          <option>Select Variant</option>
          <option>Petrol</option>
          <option>Diesel</option>
          <option>CNG</option>
          <option>Automatic / AMT / CVT</option>
        </select>
        <button type="button" onClick={checkCompatibility}>Check Compatibility</button>
      </div>

      <div className="popular">
        <span>Popular:</span>
        {popularModels.map((item) => (
          <button key={item.key} type="button" onClick={() => selectPopular(item)}>
            {item.brand} {item.model}
          </button>
        ))}
      </div>

      <a className="whatsapp-mini" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("compatibility_strip")}>
        Not sure? WhatsApp us <WhatsAppIcon />
      </a>

      <div className="compat-car-card" aria-hidden="true">
        <CarModel type={modelKey} label={`${brand || "Hyundai"} ${model || "Creta"}`} className="compat-car-model" />
        <div className="compat-car-meta">
          <strong>{model || "Creta"}</strong>
          <span>{brand || "Hyundai"} ready</span>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="dark-section proof-section">
      <div className="section-title centered">
        <h2>Loved by 10,000+ Indian highway drivers</h2>
      </div>

      <div className="review-row">
        <button className="circle-button" aria-label="Previous reviews">‹</button>
        {reviewCards.map((review) => (
          <article className="review-card" key={review.name}>
            <div className="stars">★★★★★</div>
            <p>"{review.quote}"</p>
            <div className="review-person">
              <span className="avatar">{review.name.slice(0, 1)}</span>
              <span><strong>{review.name}</strong><small>{review.car}</small></span>
              <CarModel type={review.modelKey} label={review.car} className="review-car-model" />
            </div>
          </article>
        ))}
        <button className="circle-button" aria-label="Next reviews">›</button>
      </div>

      <div id="videos" className="video-grid-wrap">
        <div>
          <h2>Watch the real<br />AHA demos</h2>
          <p>Official videos with the product, controls, install flow, and speed-limit proof in one place.</p>
          <a className="outline-teal" href="https://www.youtube.com/@ahainnovations" target="_blank" rel="noreferrer">
            Watch on YouTube <span>▷</span>
          </a>
        </div>

        <div className="video-grid">
          {officialVideos.slice(0, 3).map((video) => (
            <article
              className="video-embed-card"
              key={video.title}
            >
              <iframe
                title={video.title}
                src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => trackCustom("Used_Tool", { tool_name: "Video Embed Loaded", video: video.title })}
              />
              <div>
                <strong>{video.title}</strong>
                <span>{video.duration} · {video.views}</span>
                <p>{video.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Installation() {
  return (
    <section id="installation" className="light-band install-band">
      <div className="install-heading">
        <h2>5-Step<br />Installation</h2>
        <p>Designed to be quick, clean and reversible.</p>
      </div>

      <div className="install-steps">
        {installSteps.map((step, index) => (
          <article key={step[0]} className="install-step">
            <img src={step[3]} alt="" />
            <span>Step {index + 1}</span>
            <strong>{["Dashboard Access", "Plug NexCruise Module", "Connect Switch", "System Check", "Cruise Ready"][index]}</strong>
          </article>
        ))}
      </div>

      <div className="install-time">
        <strong>90 mins</strong>
        <span>on average</span>
        <small>No wire cuts<br />No warranty void</small>
      </div>
    </section>
  );
}

function Compare() {
  return (
    <section id="compare" className="dark-section compare-section">
      <div className="compare-title">
        <h2>Choose your<br />perfect drive.</h2>
      </div>

      <div className="plan-grid">
        {productVariants.map((variant) => (
          <article className={`plan-card ${variant.featured ? "featured" : ""}`} key={variant.name}>
            {variant.featured && <span className="plan-badge">Most Popular</span>}
            <h3>{variant.name}</h3>
            <p>{variant.featured ? "Smarter control for Indian traffic." : "Essential cruise control done right."}</p>
            <ul>
              {variant.features.slice(0, 5).map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            <strong className="price">{variant.price}</strong>
            <a className={variant.featured ? "choose smart" : "choose"} href="#callback">
              Choose {variant.name.replace("NexCruise ", "")}
            </a>
          </article>
        ))}
      </div>

      <aside className="trust-panel">
        {["Works in 1000+ Car Variants", "OEM Like Experience", "Made for Indian Roads", "Trusted by 10,000+ Drivers"].map((item) => (
          <span key={item}><Icon>◇</Icon>{item}</span>
        ))}
      </aside>
    </section>
  );
}

function Savings() {
  return (
    <section id="savings" className="light-band savings-band">
      <div>
        <h2>Save more.<br />Drive more.</h2>
        <p>NexCruise pays for itself.</p>
      </div>
      {savings.map(([top, value, bottom]) => (
        <article className="saving-card" key={value}>
          <Icon>◇</Icon>
          <span>{top}</span>
          <strong>{value}</strong>
          {bottom && <small>{bottom}</small>}
        </article>
      ))}
      <article className="emi-card">
        <span>EMI starts at</span>
        <strong>Rs 999 / month</strong>
        <small>0% Cost EMI available</small>
      </article>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);
  const items = faqs.slice(0, 5);

  return (
    <section id="faq" className="dark-section faq-section">
      <div className="faq-side">
        <h2>Common<br />Questions</h2>
        <a href="#callback">View all FAQs <span>-&gt;</span></a>
      </div>
      <div className="faq-list">
        {items.map(([q, a], index) => (
          <article className="faq-item" key={q}>
            <button type="button" onClick={() => setOpen(open === index ? null : index)}>
              <span>{q}</span><b>{open === index ? "-" : "+"}</b>
            </button>
            {open === index && <p>{a}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function FounderAndPress() {
  return (
    <section id="about" className="founder-band">
      <div className="founder-copy">
        <h2>From a garage.<br />For India.</h2>
        <p>Built around the boring but important details: car-specific couplers, OBD fitment, brake override, city traffic, heat, dust and long Indian highway routes.</p>
        <a className="outline-dark" href="#callback">Talk to AHA <span>-&gt;</span></a>
      </div>

      <div className="garage-proof">
        <img src="/attached_assets/nexcruise-box.jpeg" alt="Full NexCruise product box and kit on a desk" />
        <div>
          <strong>Box, harness, dial, support. No mystery install.</strong>
          <span>Every order is matched to the car before fitment, so the upgrade stays reversible.</span>
        </div>
      </div>

      <div className="press-copy">
        <h2>Owner proof beats brochure copy.</h2>
        <p>Team-BHP install threads, Nexon EV owner writeups and AHA's own YouTube demos show the real product in use.</p>
        <p>No wire cutting. Brake override. Installer guidance. Transferable to the next compatible car.</p>
      </div>
    </section>
  );
}

function CallbackFooter() {
  const [phone, setPhone] = useState("");

  function requestCallback(event) {
    event.preventDefault();
    trackLead("RequestCallbackSubmitted", {
      contactNumber: phone,
      location: "footer_callback",
      lead_source: "nexcruise_showcase"
    });
    setPhone("");
  }

  return (
    <footer id="callback" className="site-footer">
      <div className="contact-strip">
        <a className="wa-icon" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("footer")} aria-label="Chat on WhatsApp">
          <WhatsAppIcon />
        </a>
        <div><strong>Need fitment checked?</strong><span>Send car model, year and fuel type.</span></div>
        <form onSubmit={requestCallback}>
          <label htmlFor="callback-phone">Book an install callback</label>
          <input id="callback-phone" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Enter your mobile number" />
          <button>Request Callback</button>
        </form>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("footer_number")}>+91 83069 24400</a>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <a className="nx-logo" href="#top"><span>AHA</span><strong>NexCruise</strong></a>
          <p>Retrofit cruise control for compatible Indian cars. Plug-and-play harness, steering dial, brake override and installer support.</p>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => (
          <div className="footer-links" key={title}>
            <strong>{title}</strong>
            {links.map((link) => <a key={link} href="#top">{link}</a>)}
          </div>
        ))}
        <div className="newsletter">
          <strong>Compatibility desk</strong>
          <p>Not sure if your exact variant works? WhatsApp the RC year, fuel type and transmission.</p>
          <div><input placeholder="Your car model" /><button aria-label="Check model">-&gt;</button></div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 AHA NexCruise. All rights reserved.</span>
        <span>Made in India. Made for India.</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CompatibilityStrip />
        <SocialProof />
        <Installation />
        <Compare />
        <Savings />
        <FAQSection />
        <FounderAndPress />
      </main>
      <CallbackFooter />
    </>
  );
}

export { trackFunnel, trackLead, trackMeta };
