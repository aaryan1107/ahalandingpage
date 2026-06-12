export default function Updates({ items }) {
  return (
    <section className="section updates-section">
      <div className="container section-heading" data-reveal>
        <p className="eyebrow">Updates</p>
        <h2>What is new at AHA.</h2>
      </div>
      <div className="container updates-grid" data-reveal>
        {items.map(([title, body]) => (
          <article className="update-card" key={title}>
            <small>Update</small>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
