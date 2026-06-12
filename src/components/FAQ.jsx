import { useState } from "react";
import { trackFunnel } from "../tracking";

export default function FAQ({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="container section-heading" data-reveal>
        <p className="eyebrow">FAQ</p>
        <h2>Questions drivers ask before they upgrade.</h2>
      </div>
      <div className="container faq-list" data-reveal>
        {items.map(([question, answer], index) => (
          <article className={open === index ? "faq-item open" : "faq-item"} key={question}>
            <button
              type="button"
              onClick={() => {
                setOpen(open === index ? -1 : index);
                trackFunnel("FAQOpened", { question });
              }}
            >
              <span>{question}</span>
              <strong>{open === index ? "-" : "+"}</strong>
            </button>
            <p>{answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
