import { useEffect, useMemo, useState } from "react";
import { carBrands, detailTabs, faqs, featureCards, proofStats, updates } from "./data";
import {
  WHATSAPP_LINK,
  trackCustom,
  trackFunnel,
  trackLead,
  trackMeta,
  trackWhatsApp
} from "./tracking";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import BrandSelector from "./components/BrandSelector.jsx";
import CompatibilityChecker from "./components/CompatibilityChecker.jsx";
import Features from "./components/Features.jsx";
import DetailTabs from "./components/DetailTabs.jsx";
import FAQ from "./components/FAQ.jsx";
import Updates from "./components/Updates.jsx";
import MiniGame from "./components/MiniGame.jsx";
import LeadForm from "./components/LeadForm.jsx";
import Footer from "./components/Footer.jsx";

const heroImage = "/attached_assets/picsart-nexcruise-hero-clean.png";
const installImage = "/attached_assets/picsart-nexcruise-install-clean.png";

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("aha-theme") || "dark");
  const [selectedBrand, setSelectedBrand] = useState(carBrands[0]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("aha-theme", theme);
  }, [theme]);

  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const modelOptions = useMemo(() => selectedBrand.models, [selectedBrand]);

  function handleThemeToggle() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  function handleBrandSelect(brand) {
    setSelectedBrand(brand);
    trackFunnel("BrandSelected", { brand: brand.name });
    trackCustom("Used_Tool", { tool_name: "Dynamic Brand Selector", brand: brand.name });
  }

  function handleWhatsApp(location) {
    trackWhatsApp(location);
  }

  return (
    <>
      <Header theme={theme} onThemeToggle={handleThemeToggle} onWhatsApp={handleWhatsApp} />
      <main>
        <Hero heroImage={heroImage} stats={proofStats} onWhatsApp={handleWhatsApp} />
        <BrandSelector selectedBrand={selectedBrand} brands={carBrands} onSelect={handleBrandSelect} />
        <CompatibilityChecker
          brands={carBrands}
          selectedBrand={selectedBrand}
          models={modelOptions}
          onBrandChange={handleBrandSelect}
          onWhatsApp={handleWhatsApp}
        />
        <Features cards={featureCards} installImage={installImage} />
        <DetailTabs tabs={detailTabs} />
        <FAQ items={faqs} />
        <Updates items={updates} />
        <MiniGame />
        <LeadForm brands={carBrands} onWhatsApp={handleWhatsApp} />
      </main>
      <Footer onWhatsApp={handleWhatsApp} />
      <a
        className="floating-whatsapp"
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        onClick={() => handleWhatsApp("floating_button")}
      >
        WhatsApp
      </a>
    </>
  );
}

export { trackFunnel, trackLead, trackMeta };
