import { useState } from "react";
import { trackCustom, trackFunnel } from "../tracking";

export default function MiniGame() {
  const [position, setPosition] = useState(8);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("Activate cruise mode, then stop inside the AHA Zone.");

  function startGame() {
    setRunning(true);
    setMessage("Cruise mode active...");
    const start = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(92, 8 + elapsed / 35);
      setPosition(next);
      if (next >= 92) {
        window.clearInterval(timer);
        setRunning(false);
        setMessage("Too far. Try again and stop inside the AHA Zone.");
      }
    }, 30);
    window.__ahaGameTimer = timer;
  }

  function stopGame() {
    if (!running) return;
    window.clearInterval(window.__ahaGameTimer);
    setRunning(false);
    if (position >= 58 && position <= 74) {
      setMessage("Perfect! You found your AHA moment.");
      trackFunnel("MiniGameCompleted", { result: "success" });
      trackCustom("Used_Tool", { tool_name: "AHA Cruise Challenge" });
    } else {
      setMessage("Close. Try to stop right inside the glowing AHA Zone.");
    }
  }

  function resetGame() {
    window.clearInterval(window.__ahaGameTimer);
    setPosition(8);
    setRunning(false);
    setMessage("Activate cruise mode, then stop inside the AHA Zone.");
  }

  return (
    <section className="section game-section" id="game">
      <div className="container game-grid">
        <div data-reveal>
          <p className="eyebrow">Mini game</p>
          <h2>AHA Cruise Challenge</h2>
          <p>Activate cruise, watch the car glide, and stop inside the AHA Zone. Then check if your real car can get the upgrade.</p>
          <a className="primary-button" href="#compatibility">Now check your car compatibility</a>
        </div>
        <div className="game-card" data-reveal>
          <div className="track">
            <div className="aha-zone">AHA Zone</div>
            <div className="mini-car" style={{ left: `${position}%` }}>AHA</div>
          </div>
          <p>{message}</p>
          <div className="button-row">
            <button className="primary-button" type="button" onClick={startGame} disabled={running}>Activate Cruise</button>
            <button className="secondary-button" type="button" onClick={stopGame}>Stop</button>
            <button className="ghost-button" type="button" onClick={resetGame}>Reset</button>
          </div>
        </div>
      </div>
    </section>
  );
}
