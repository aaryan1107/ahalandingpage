import { useState } from "react";

export default function DetailTabs({ tabs }) {
  const names = Object.keys(tabs);
  const [active, setActive] = useState(names[0]);

  return (
    <section className="section tab-section">
      <div className="container" data-reveal>
        <p className="eyebrow">Technical confidence</p>
        <h2>Know how NexCruise fits before you book the callback.</h2>
        <div className="tab-shell">
          <div className="tab-list">
            {names.map((name) => (
              <button className={name === active ? "active" : ""} key={name} type="button" onClick={() => setActive(name)}>
                {name}
              </button>
            ))}
          </div>
          <article className="tab-panel">
            <h3>{active}</h3>
            <p>{tabs[active]}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
