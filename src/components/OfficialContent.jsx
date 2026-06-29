import { founders, installSteps, mediaMentions, officialVideos, productVariants } from "../data";
import { trackCustom, trackFunnel } from "../tracking";

function YouTubeCard({ video, featured = false }) {
  const embedUrl = `https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&playsinline=1`;
  const thumbnail = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  const srcDoc = `
    <style>
      *{box-sizing:border-box}body{margin:0;background:#05070d}
      a{position:absolute;inset:0;display:grid;place-items:center;background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.46)),url('${thumbnail}') center/cover no-repeat}
      span{width:68px;height:68px;display:grid;place-items:center;border-radius:50%;background:rgba(255,255,255,.94);box-shadow:0 18px 50px rgba(0,0,0,.36)}
      svg{margin-left:4px}
    </style>
    <a href="${embedUrl}&autoplay=1" aria-label="Play ${video.title}">
      <span><svg width="25" height="29" viewBox="0 0 25 29" fill="#05070d"><path d="M2 2l21 12.5L2 27V2z"/></svg></span>
    </a>
  `;

  return (
    <article className={`glass-video-card ${featured ? "featured" : ""}`} data-reveal>
      <div className="video-frame">
        <iframe
          src={embedUrl}
          title={video.title}
          loading="lazy"
          srcDoc={srcDoc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <span>{video.duration}</span>
      </div>
      <div className="video-copy">
        <small>{video.views}</small>
        <h3>{video.title}</h3>
        <p>{video.note}</p>
      </div>
    </article>
  );
}

export default function OfficialContent() {
  return (
    <>
      <section className="section official-media-section" id="official">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Official AHA films</p>
            <h2>Watch the product in motion before you book the fitment call.</h2>
            <p>
              Full installation walkthroughs, Basic and Smart demos, and the adaptive speed-limit story
              are embedded here so buyers can inspect the product without opening five tabs.
            </p>
          </div>
          <div className="video-grid">
            {officialVideos.map((video, index) => (
              <YouTubeCard key={video.id} video={video} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="section install-glass-section" id="installation">
        <div className="container install-layout">
          <div className="install-copy" data-reveal>
            <p className="eyebrow">Fitment flow</p>
            <h2>Two plugs, one dial, and a route that can be reversed later.</h2>
            <p>
              This is the buyer journey people care about: does it cut wires, who installs it, what happens
              under the dashboard, and can support help if the installer is not nearby.
            </p>
            <a className="secondary-button" href="#callback" onClick={() => trackFunnel("InstallCallbackClicked")}>
              Book installation help
            </a>
          </div>
          <div className="install-timeline">
            {installSteps.map(([num, title, body, image]) => (
              <article className="install-step-card" key={num} data-reveal>
                <img src={image} alt={title} loading="lazy" />
                <div>
                  <span>{num}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section variant-section" id="variants">
        <div className="container">
          <div className="section-heading centered">
            <p className="eyebrow">Basic or Smart</p>
            <h2>Pick the level of control you actually need.</h2>
          </div>
          <div className="variant-grid">
            {productVariants.map((variant) => (
              <article className={`variant-glass-card ${variant.featured ? "featured" : ""}`} key={variant.name} data-reveal>
                <small>{variant.featured ? "Most popular" : "Essential upgrade"}</small>
                <h3>{variant.name}</h3>
                <strong>{variant.price}</strong>
                <ul>
                  {variant.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <div className="variant-actions">
                  <a className="primary-button compact" href={`https://aha.store/checkout?v=${variant.featured ? "smart" : "basic"}`} target="_blank" rel="noreferrer">
                    Order now
                  </a>
                  <button className="ghost-button compact" onClick={() => trackCustom("Watch_Demo_Clicked", { variant: variant.name, youtube_id: variant.demoId })}>
                    Watch demo
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section founder-section" id="founders">
        <div className="container founder-layout">
          <div className="section-heading">
            <p className="eyebrow">Founders and press</p>
            <h2>Built by people who understand throttle systems, not just car accessories.</h2>
          </div>
          <div className="founder-grid">
            {founders.map((founder) => (
              <article className="founder-card" key={founder.name} data-reveal>
                <img src={founder.image} alt={founder.name} loading="lazy" />
                <div>
                  <h3>{founder.name}</h3>
                  <small>{founder.title}</small>
                  <p>{founder.bio}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="story-card" data-reveal>
            <img src="/attached_assets/nexcruise-story-video.png" alt="The NexCruise story" loading="lazy" />
            <div>
              <span>Founder story</span>
              <h3>The NexCruise saga</h3>
              <p>Read the long-form story and owner community coverage behind the product.</p>
              <a href="https://www.nexonevowners.club/the-aha-nexcruise-saga" target="_blank" rel="noreferrer">
                Open story
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="media-strip" id="press">
        <div className="container media-strip-inner">
          <span>As seen in</span>
          {mediaMentions.map(([label, url]) => (
            <a key={label} href={url} target="_blank" rel="noreferrer">{label}</a>
          ))}
        </div>
      </section>
    </>
  );
}
