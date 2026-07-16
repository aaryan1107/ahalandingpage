import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

// Vehicle stage for the compatibility workspace. NCV2 currently returns model
// names/UIDs without image URLs, so the component supports real per-model
// photos when present and falls back to a lightweight generated image card.
const BODY_CLASSES = [
  ["mpv", ["innova", "carens", "marazzo", "rumion", "xl6", "ertiga", "carnival"]],
  ["sedan", ["city", "verna", "amaze", "civic", "camry", "ciaz", "dzire", "tigor", "aura"]],
  ["hatch", ["swift", "baleno", "i20", "altroz", "tiago", "glanza", "jazz", "wagonr", "ignis", "comet", "alto"]]
];

export function vehicleClass(model) {
  const lower = (model || "").toLowerCase();
  for (const [cls, words] of BODY_CLASSES) {
    if (words.some((word) => lower.includes(word))) return cls;
  }
  return "suv";
}

function slug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function encodedFallbackPhoto({ brand, model, accent, bodyClass }) {
  const title = `${brand || "AHA"} ${model || "NexCruise"}`.trim();
  const color = String(accent || "#006aed");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 520" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1"><stop stop-color="%23f8fafd"/><stop offset="1" stop-color="%23e3eaf5"/></linearGradient>
        <linearGradient id="paint" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${color}"/><stop offset="1" stop-color="%23001733"/></linearGradient>
        <radialGradient id="glow" cx="50%" cy="45%" r="58%"><stop stop-color="${color}" stop-opacity="0.25"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>
        <filter id="shadow" x="-20%" y="-30%" width="140%" height="160%"><feDropShadow dx="0" dy="34" stdDeviation="24" flood-color="%23001733" flood-opacity="0.24"/></filter>
      </defs>
      <rect width="960" height="520" fill="url(#sky)"/>
      <rect width="960" height="520" fill="url(#glow)"/>
      <path d="M0 360 C190 300 310 326 468 286 C632 245 742 258 960 196 L960 520 L0 520 Z" fill="%23ffffff" opacity="0.72"/>
      <ellipse cx="500" cy="402" rx="344" ry="44" fill="%23001733" opacity="0.12"/>
      <g filter="url(%23shadow)" transform="translate(110 170)">
        <path d="${bodyClass === "sedan" ? "M96 160 C136 98 222 76 340 76 L515 76 C600 82 674 116 726 170 L772 176 C804 180 826 205 826 236 L826 262 C826 282 810 298 790 298 L116 298 C84 298 58 272 58 240 L58 214 C58 184 70 166 96 160 Z" : bodyClass === "hatch" ? "M88 166 C116 112 174 80 272 74 L465 74 C590 84 680 132 740 190 L782 198 C808 202 826 226 826 254 L826 266 C826 284 812 298 794 298 L112 298 C82 298 58 274 58 244 L58 218 C58 190 68 172 88 166 Z" : bodyClass === "mpv" ? "M78 158 C126 98 214 70 350 70 L566 78 C662 88 734 132 782 190 L808 198 C830 206 846 228 846 254 L846 268 C846 286 832 300 814 300 L106 300 C78 300 56 278 56 250 L56 214 C56 184 64 166 78 158 Z" : "M86 158 C132 94 214 64 340 64 L520 72 C634 84 718 132 778 198 L812 206 C836 214 852 236 852 264 L852 276 C852 294 838 308 820 308 L106 308 C78 308 56 286 56 258 L56 218 C56 188 64 166 86 158 Z"}" fill="url(#paint)"/>
        <path d="M242 88 L490 88 C568 96 626 122 668 164 L190 164 C200 128 218 104 242 88 Z" fill="%23dff3ff" opacity="0.78"/>
        <path d="M470 96 C540 104 592 126 632 156 L496 156 L474 96 Z" fill="%239fc8e8" opacity="0.72"/>
        <path d="M210 178 L760 178" stroke="%23ffffff" stroke-opacity="0.35" stroke-width="5" stroke-linecap="round"/>
        <circle cx="230" cy="300" r="64" fill="%23050b14"/><circle cx="230" cy="300" r="31" fill="%23e6e9f0"/><circle cx="230" cy="300" r="16" fill="${color}"/>
        <circle cx="675" cy="300" r="64" fill="%23050b14"/><circle cx="675" cy="300" r="31" fill="%23e6e9f0"/><circle cx="675" cy="300" r="16" fill="${color}"/>
        <path d="M784 220 L834 230" stroke="%23f8fbff" stroke-width="11" stroke-linecap="round"/>
        <path d="M74 220 L120 214" stroke="%23ff405d" stroke-width="11" stroke-linecap="round"/>
      </g>
      <text x="58" y="76" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="700" fill="%23001733">${title}</text>
      <text x="58" y="112" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="600" fill="%2368748d">Model photo fallback · ${bodyClass.toUpperCase()} fitment profile</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;
}

export function modelPhotoCandidate({ brand, model, image }) {
  if (image) return image;
  const brandSlug = slug(brand);
  const modelSlug = slug(model);
  if (!brandSlug || !modelSlug) return "";
  return `/vehicles/${brandSlug}/${modelSlug}.webp`;
}

export default function CarStage({ brand, model, accent, image }) {
  const stageRef = useRef(null);
  const [useFallback, setUseFallback] = useState(false);
  const hasSelection = Boolean(brand && model);
  const bodyClass = vehicleClass(model);
  const photoSrc = useMemo(() => {
    if (!hasSelection) return "";
    return useFallback
      ? encodedFallbackPhoto({ brand, model, accent, bodyClass })
      : modelPhotoCandidate({ brand, model, image });
  }, [accent, bodyClass, brand, hasSelection, image, model, useFallback]);

  useLayoutEffect(() => {
    if (!hasSelection || !stageRef.current) return undefined;
    const figure = stageRef.current.querySelector(".car-figure");
    const plate = stageRef.current.querySelector(".car-nameplate");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    // Arrival: slide in from the right, blur-to-focus, settle on the platform.
    const tl = gsap.timeline();
    tl.fromTo(
      figure,
      { x: 120, autoAlpha: 0, filter: "blur(8px)" },
      { x: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }
    ).fromTo(plate, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out" }, "-=0.3");
    return () => tl.kill();
  }, [brand, model, hasSelection]);

  useLayoutEffect(() => {
    setUseFallback(false);
  }, [brand, model, image]);

  return (
    <div className="car-stage" data-car-stage ref={stageRef} style={accent ? { "--brand-accent": accent } : undefined}>
      {hasSelection ? (
        <div key={`${brand}-${model}`} className="car-stage-inner">
          <figure className={`car-figure car-photo-card car-${bodyClass}`}>
            <img
              src={photoSrc}
              alt={`${brand} ${model} compatibility preview`}
              loading="lazy"
              decoding="async"
              width="960"
              height="520"
              onError={() => setUseFallback(true)}
            />
          </figure>
          <div className="car-nameplate">
            <strong>{brand} {model}</strong>
            <span>{bodyClass.toUpperCase()} fitment profile</span>
          </div>
        </div>
      ) : (
        <div className="car-stage-empty">
          <span className="car-platform" aria-hidden="true" />
          <p>Pick your brand and model — your car appears here.</p>
        </div>
      )}
    </div>
  );
}
