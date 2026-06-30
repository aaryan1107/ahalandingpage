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
  founders,
  installSteps,
  officialVideos,
  productVariants,
  testimonials
} from "./data";
import "./App.css";

const popularModels = ["Hyundai Creta", "Toyota Innova Crysta", "Kia Seltos", "Mahindra Thar", "Tata Safari"];

const heroCards = [
  ["Effortless Highway Drives", "Set speed. Relax. Drive safer."],
  ["Smart Speed Maintained", "Uphill or downhill. We handle it."],
  ["Plug & Play Installation", "No wire cuts. No warranty anxiety."]
];

const reviewCards = [
  {
    quote: "Long drives are so much easier now. My right leg finally gets a break.",
    name: "Vikram S.",
    car: "Hyundai Creta",
    image: "/attached_assets/nexcruise-swift-thumb.png"
  },
  {
    quote: "Installed in 90 minutes. Feels OEM. No lag, no jerks.",
    name: "Ankit M.",
    car: "Kia Seltos",
    image: "/attached_assets/nexcruise-video-thumb-1.png"
  },
  {
    quote: "Delhi to Jaipur every week. NexCruise has been a game changer.",
    name: "Pooja R.",
    car: "Toyota Innova Crysta",
    image: "/attached_assets/nexcruise-video-thumb-2.png"
  },
  {
    quote: "Even works in bumper to bumper traffic. Smart speed control is gold.",
    name: "Arjun N.",
    car: "Tata Harrier",
    image: "/attached_assets/picsart-nexcruise-install-clean.png"
  }
];

const showcaseVideos = [
  {
    title: "NexCruise on Hyundai Creta",
    time: "02:14",
    thumb: "/attached_assets/nexcruise-video-thumb-1.png",
    id: "rlrIGqnEPDM"
  },
  {
    title: "City Traffic Smarter Control",
    time: "01:38",
    thumb: "/attached_assets/nexcruise-video-thumb-2.png",
    id: "8fNHTVPz7JU"
  },
  {
    title: "Installation Walkthrough",
    time: "03:21",
    thumb: "/attached_assets/nexcruise-install-video.png",
    id: "GxAH4LcJVbk"
  }
];

const savings = [
  ["Save up to", "Rs 18,000 / year", "on fuel"],
  ["Reduce fatigue on", "long highway drives", ""],
  ["Better speed control", "fewer challans & safer drives", ""]
];

const footerLinks = {
  Product: ["Features", "Compatibility", "Installation", "Compare"],
  Company: ["Our Story", "Press", "Careers", "Contact"],
  Support: ["FAQs", "Warranty", "Shipping & Returns", "Sitemap"]
};

function Icon({ children }) {
  return <span className="icon-mark" aria-hidden="true">{children}</span>;
}

function Header() {
  const nav = ["Features", "Compatibility", "Installation", "Compare", "Savings", "FAQ"];

  return (
    <header className="nx-header">
      <a className="nx-logo" href="#top" aria-label="AHA NexCruise home">
        <span>AHA</span>
        <strong>NexCruise</strong>
      </a>

      <nav className="nx-nav" aria-label="Primary navigation">
        {nav.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
        ))}
      </nav>

      <a
        className="book-call"
        href="#callback"
        onClick={() => trackFunnel("BookCallClicked", { location: "header" })}
      >
        Book a Call <span aria-hidden="true">-&gt;</span>
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg" />
      <div className="hero-shade" />

      <div className="hero-content">
        <div className="hero-copy">
          <h1>Cruise Control that feels factory.</h1>
          <p>
            NexCruise is India's most advanced retrofit cruise control.
            Purpose-built for Indian roads. Engineered to feel original.
          </p>

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
          <div className="speed-value"><strong>80</strong> km/h</div>
          <div className="speed-set">
            <span>Set Speed</span>
            <div><button>-</button><b>80</b><button>+</button></div>
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
  const selectedBrand = useMemo(() => carBrands.find((item) => item.name === brand), [brand]);

  function checkCompatibility() {
    trackFunnel("CheckCompatibilityClicked", { brand, model, location: "compatibility_strip" });
    trackCustom("Used_Tool", { tool_name: "Compatibility Checker", brand, model });
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
        {popularModels.map((item) => <button key={item} type="button" onClick={() => setModel(item)}>{item}</button>)}
      </div>

      <a className="whatsapp-mini" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("compatibility_strip")}>
        Not sure? WhatsApp us <span>◉</span>
      </a>
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
              <img src={review.image} alt="" />
            </div>
          </article>
        ))}
        <button className="circle-button" aria-label="Next reviews">›</button>
      </div>

      <div id="videos" className="video-grid-wrap">
        <div>
          <h2>See NexCruise<br />in action</h2>
          <p>Real roads. Real cars. Real results.</p>
          <a className="outline-teal" href="https://www.youtube.com/@ahainnovations" target="_blank" rel="noreferrer">
            Watch on YouTube <span>▷</span>
          </a>
        </div>

        <div className="video-grid">
          {showcaseVideos.map((video) => (
            <a
              className="video-card"
              key={video.title}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackCustom("Used_Tool", { tool_name: "Video Card", video: video.title })}
            >
              <img src={video.thumb} alt={video.title} />
              <span className="play">▷</span>
              <strong>{video.title}</strong>
              <small>{video.time}</small>
            </a>
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
    <section className="light-band founder-band">
      <div className="founder-copy">
        <h2>Built by car people.<br />For car people.</h2>
        <p>AHA NexCruise was founded by a team of automotive engineers who love to drive.</p>
        <a className="outline-dark" href="#callback">Know Our Story <span>-&gt;</span></a>
      </div>

      <div className="founder-photo-row">
        {founders.map((founder) => (
          <article key={founder.name}>
            <img src={founder.image} alt={founder.name} />
            <strong>{founder.name}</strong>
          </article>
        ))}
      </div>

      <div className="press-copy">
        <h2>In the press</h2>
        <p>"NexCruise retrofit cruise control is a neat aftermarket solution for Indian roads." - AutoCar India</p>
        <p>"Smart, seamless and very Indian in its design approach." - CarToq</p>
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
        <a className="wa-icon" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("footer")}>WA</a>
        <div><strong>Have questions?</strong><span>We're here on WhatsApp.</span></div>
        <form onSubmit={requestCallback}>
          <label htmlFor="callback-phone">Prefer a callback instead?</label>
          <input id="callback-phone" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Enter your mobile number" />
          <button>Request Callback</button>
        </form>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("footer_number")}>+91 83069 24400</a>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <a className="nx-logo" href="#top"><span>AHA</span><strong>NexCruise</strong></a>
          <p>Advanced retrofit cruise control systems engineered for Indian roads.</p>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => (
          <div className="footer-links" key={title}>
            <strong>{title}</strong>
            {links.map((link) => <a key={link} href="#top">{link}</a>)}
          </div>
        ))}
        <div className="newsletter">
          <strong>Stay updated</strong>
          <div><input placeholder="Enter your email" /><button aria-label="Subscribe">-&gt;</button></div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 AHA NexCruise. All rights reserved.</span>
        <span>Made in India. Made for India.</span>
      </div>
    </footer>
  );
}

function OfficialVideoEmbeds() {
  return (
    <section className="official-embeds">
      <div className="section-title">
        <h2>Official AHA films</h2>
        <p>The deeper product videos are still here when someone wants the full proof.</p>
      </div>
      <div className="embed-row">
        {officialVideos.slice(0, 3).map((video) => (
          <iframe
            key={video.id}
            title={video.title}
            src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ))}
      </div>
    </section>
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
        <OfficialVideoEmbeds />
      </main>
      <CallbackFooter />
    </>
  );
}

export { trackFunnel, trackLead, trackMeta };
