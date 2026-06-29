import { WHATSAPP_LINK } from "../tracking";

export default function Footer({ onWhatsApp }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand-lockup" href="#top">
            <span className="brand-mark">aha</span>
            <span><strong>AHA Automobiles</strong><small>NexCruise smart car upgrades</small></span>
          </a>
          <p>Plug-and-play cruise control, smarter drive modes, and verified fitment for compatible Indian cars.</p>
        </div>
        <div>
          <h3>Quick links</h3>
          <a href="#brands">Brands</a>
          <a href="#compatibility">Compatibility</a>
          <a href="#owners">Owner proof</a>
          <a href="#official">Official videos</a>
          <a href="#installation">Installation</a>
          <a href="#variants">Variants</a>
          <a href="#callback">Callback</a>
        </div>
        <div>
          <h3>Contact</h3>
          <span>Phone: 80039 44400</span>
          <span>Email: support@aha.store</span>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" onClick={() => onWhatsApp("footer")}>WhatsApp CTA</a>
        </div>
        <div>
          <h3>Social</h3>
          <a href="https://www.instagram.com/aha.innovations/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.facebook.com/aha.nexcruise" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://www.youtube.com/@ahainnovations" target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </div>
      <div className="footer-bottom">Copyright 2026 AHA Automobiles. All rights reserved.</div>
    </footer>
  );
}
