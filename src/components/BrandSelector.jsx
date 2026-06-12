function BrandLogo({ brand, className = "" }) {
  return (
    <span className={`brand-logo ${className}`} style={{ "--brand-accent": brand.accent }}>
      <img src={brand.logo} alt={`${brand.name} logo`} onError={(event) => { event.currentTarget.style.display = "none"; }} />
      <b>{brand.initials}</b>
    </span>
  );
}

export default function BrandSelector({ brands, selectedBrand, onSelect }) {
  return (
    <section className="section brands-section" id="brands" style={{ "--brand-accent": selectedBrand.accent }}>
      <div className="container section-heading centered" data-reveal>
        <p className="eyebrow">Brand-specific experience</p>
        <h2>AHA stays constant. The garage adapts to your car.</h2>
        <p>Select your brand to update the fleet, logo, accent, and compatibility route.</p>
      </div>

      <div className="container brand-layout">
        <div className="brand-grid" data-reveal>
          {brands.map((brand) => (
            <button
              className={brand.name === selectedBrand.name ? "brand-card selected" : "brand-card"}
              key={brand.name}
              type="button"
              style={{ "--brand-accent": brand.accent }}
              onClick={() => onSelect(brand)}
            >
              <BrandLogo brand={brand} />
              <span className="brand-card-copy">
                <strong>{brand.name}</strong>
                <small>{brand.fleet}</small>
              </span>
            </button>
          ))}
        </div>

        <article className="selected-brand-panel" data-reveal>
          <div className="selected-brand-topline">
            <BrandLogo brand={selectedBrand} className="large" />
            <div>
              <p className="eyebrow">Selected fleet</p>
              <h3>AHA Automobiles for {selectedBrand.name}</h3>
            </div>
          </div>

          <p>{selectedBrand.copy}</p>

          <div className="fleet-strip">
            <span>{selectedBrand.fleet}</span>
            <strong>{selectedBrand.models.length} sample models</strong>
          </div>

          <div className="model-pills">
            {selectedBrand.models.map((model) => (
              <span key={model}>{model}</span>
            ))}
          </div>

          <div className="brand-proof-row">
            <span>No wire cutting</span>
            <span>OBD + pedal coupler</span>
            <span>30-minute install path</span>
          </div>

          <p className="compat-line">Compatibility status: ready for model-level verification.</p>
        </article>
      </div>
    </section>
  );
}
