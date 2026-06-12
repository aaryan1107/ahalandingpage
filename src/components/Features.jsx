export default function Features({ cards, installImage }) {
  return (
    <section className="section" id="features">
      <div className="container feature-layout">
        <div className="feature-media" data-reveal>
          <img src={installImage} alt="AHA smart automobile upgrade installation detail" />
          <div className="media-caption">
            <strong>Plug-and-play install</strong>
            <span>Accelerator coupler + OBD port + steering dial</span>
          </div>
        </div>
        <div data-reveal>
          <p className="eyebrow">What changes in the drive</p>
          <h2>Highway comfort, mode control, and family-safe speed behaviour.</h2>
          <div className="feature-grid">
            {cards.map(([title, body]) => (
              <article className="feature-card" key={title}>
                <span>{title.slice(0, 2)}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
