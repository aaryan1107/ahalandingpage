import { useState } from "react";
import { WHATSAPP_LINK } from "../tracking";

const navItems = [
  ["Brands", "brands"],
  ["Check Car", "compatibility"],
  ["Videos", "official"],
  ["Install", "installation"],
  ["Variants", "variants"],
  ["Callback", "callback"]
];

export default function Header({ theme, onThemeToggle, onWhatsApp }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand-lockup" href="#top" aria-label="AHA Automobiles home">
        <span className="brand-mark">aha</span>
        <span>
          <strong>AHA Automobiles</strong>
          <small>NexCruise upgrade studio</small>
        </span>
      </a>
      <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)}>
        Menu
      </button>
      <nav className={open ? "nav-links is-open" : "nav-links"}>
        {navItems.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button className="ghost-button" type="button" onClick={onThemeToggle}>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <a
          className="primary-button compact"
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          onClick={() => onWhatsApp("header")}
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
