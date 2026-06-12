export default function BrandSelector({ brands, selectedBrand, onSelect }) {
  return (
    <section className="section" id="brands">
      <div className="container section-heading" data-reveal>
        <p className="eyebrow">Dynamic car interface</p>
        <h2>Choose your badge. Keep the AHA upgrade experience.</h2>
        <p>Select a brand to see model examples and the fitment path for NexCruise.</p>
      </div>
      <div className="container brand-layout">
        <div className="brand-grid" data-reveal>
          {brands.map((brand) => (
            <button
              className={brand.name === selectedBrand.name ? "brand-card selected" : "brand-card"}
              key={brand.name}
              type="button"
              onClick={() => onSelect(brand)}
            >
              <span>{brand.initials}</span>
              <strong>{brand.name}</strong>
            </button>
          ))}
        </div>
        <article className="selected-brand-panel" data-reveal>
          <div className="placeholder-logo">{selectedBrand.initials}</div>
          <p className="eyebrow">Selected garage</p>
          <h3>AHA Automobiles for {selectedBrand.name} Cars</h3>
          <p>{selectedBrand.copy}</p>
          <div className="model-pills">
            {selectedBrand.models.map((model) => (
              <span key={model}>{model}</span>
            ))}
          </div>
          <div className="brand-proof-row">
            <span>No wire cutting</span>
            <span>OBD + pedal coupler</span>
            <span>Team verification</span>
          </div>
          <p className="compat-line">Compatibility status: ready for model-level verification.</p>
        </article>
      </div>
    </section>
  );
}
