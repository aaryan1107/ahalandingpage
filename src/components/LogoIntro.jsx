import { useState } from "react";

export const INTRO_SESSION_KEY = "aha-intro-done";

// Aurora-style entry: the official NexCruise mark holds on a dark field, then
// the camera zooms through it into the hero. Plays once per browser session;
// reduced-motion users and returning visitors go straight to the page.
// All motion lives in useAnimations.js — this component only renders the stage.
export function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !window.sessionStorage.getItem(INTRO_SESSION_KEY);
  } catch {
    return true;
  }
}

export default function LogoIntro() {
  const [play] = useState(shouldPlayIntro);
  if (!play) return null;
  return (
    <div className="logo-intro" data-logo-intro aria-hidden="true">
      <div className="logo-intro-stage" data-logo-stage>
        <img className="logo-intro-mark" src="/brand/aha-mark.svg" alt="" />
        <span className="logo-intro-word">NEXCRUISE</span>
        <small className="logo-intro-tag">Cruise control for your car</small>
      </div>
    </div>
  );
}
