import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// Side-profile vehicle stage for the compatibility workspace, ported from the
// Streamlit garage. The silhouette is drawn from the model's body class and
// tinted with the brand accent, so it can never show the WRONG car — the
// authentic 3D per-model files (17-73MB .glb) are too heavy for the web.
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

export default function CarStage({ brand, model, accent }) {
  const stageRef = useRef(null);
  const hasSelection = Boolean(brand && model);
  const bodyClass = vehicleClass(model);

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

  return (
    <div className="car-stage" data-car-stage ref={stageRef} style={accent ? { "--brand-accent": accent } : undefined}>
      {hasSelection ? (
        <div key={`${brand}-${model}`} className="car-stage-inner">
          <div className={`car-figure car-${bodyClass}`} aria-hidden="true">
            <div className="car-body">
              <div className="car-cabin">
                <span className="car-window car-window-front" />
                <span className="car-window car-window-rear" />
              </div>
              <span className="car-nose" />
              <span className="car-light car-light-front" />
              <span className="car-light car-light-rear" />
              <span className="car-wheel car-wheel-front"><i /></span>
              <span className="car-wheel car-wheel-rear"><i /></span>
            </div>
            <span className="car-shadow" />
            <span className="car-platform" />
          </div>
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
