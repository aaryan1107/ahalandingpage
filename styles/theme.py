import streamlit as st


def inject_global_styles():
    st.markdown(
        """
        <style>
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');

        :root {
          --bg-main: #eef3f8;
          --bg-panel: #ffffff;
          --bg-panel-soft: #f6f8fb;
          --bg-glass: rgba(255,255,255,0.58);
          --text-main: #080b10;
          --text-muted: #68717f;
          --text-soft: #9aa3af;
          --accent-blue: #1d63ff;
          --accent-silver: #d8dee8;
          --accent-ink: #090c12;
          --accent-ember: #ff405d;
          --border-soft: rgba(8,11,16,0.10);
          --glass-border: rgba(255,255,255,0.72);
          --shadow-soft: 0 14px 38px rgba(23,34,52,0.10);
          --shadow-float: 0 32px 92px rgba(23,34,52,0.18);
          --radius-lg: 22px;
          --radius-xl: 34px;
          --radius-pill: 999px;
        }

        #MainMenu, footer, header { visibility: hidden; }
        .stDeployButton, [data-testid="stToolbar"] { display: none !important; }
        [data-testid="stAppViewContainer"] {
          background:
            linear-gradient(90deg, rgba(255,255,255,0.52) 1px, transparent 1px) 0 0 / 132px 132px,
            linear-gradient(180deg, rgba(8,11,16,0.04) 1px, transparent 1px) 0 0 / 132px 132px,
            radial-gradient(circle at 10% 0%, rgba(255,64,93,0.12), transparent 30%),
            radial-gradient(circle at 78% 8%, rgba(29,99,255,0.18), transparent 35%),
            linear-gradient(135deg, #eef3f8 0%, #fbfdff 48%, #dfe8f2 100%);
          color: var(--text-main);
          font-family: Inter, sans-serif;
        }
        .main .block-container {
          max-width: 1280px;
          padding: 1rem 2rem 4rem;
        }
        h1, h2, h3 {
          font-family: 'Plus Jakarta Sans', Inter, sans-serif !important;
          letter-spacing: -0.035em;
        }
        p { color: var(--text-muted); }
        div[data-testid="stVerticalBlock"] { gap: 1rem; }

        .aha-nav {
          position: sticky;
          top: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 24px;
          padding: 14px 18px;
          border: 1px solid rgba(255,255,255,0.86);
          border-radius: var(--radius-pill);
          background: rgba(255,255,255,0.74);
          box-shadow: 0 16px 46px rgba(23,34,52,0.08);
          backdrop-filter: blur(22px) saturate(160%);
        }
        .aha-logo { display: flex; align-items: center; gap: 12px; font-weight: 900; }
        .aha-logo-mark {
          width: 42px; height: 42px; display: grid; place-items: center;
          border-radius: 50%; color: white; background: #090c12;
          font: 800 12px 'IBM Plex Mono', monospace; letter-spacing: .03em;
        }
        .aha-nav-links { display: flex; gap: 24px; color: var(--text-muted); font-size: 13px; font-weight: 800; }
        .aha-status-pill, .aha-chip {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(47,111,237,0.16);
          border-radius: var(--radius-pill);
          background: rgba(47,111,237,0.08);
          color: #245ec8;
          padding: 8px 13px;
          font-size: 12px;
          font-weight: 850;
          line-height: 1;
        }

        .aha-hero {
          position: relative;
          min-height: 650px;
          padding: 46px;
          border: 1px solid rgba(255,255,255,0.92);
          border-radius: 42px;
          background:
            radial-gradient(circle at 12% 6%, rgba(255,64,93,0.13), transparent 30%),
            radial-gradient(circle at 78% 34%, rgba(29,99,255,0.24), transparent 38%),
            linear-gradient(90deg, rgba(255,255,255,0.88) 0 39%, rgba(232,239,249,0.52) 39% 100%),
            linear-gradient(145deg, rgba(249,251,253,0.96), rgba(218,229,241,0.92));
          box-shadow: var(--shadow-float);
          overflow: hidden;
          backdrop-filter: blur(24px) saturate(160%);
        }
        .aha-hero::before {
          content: "NEXCRUISE";
          position: absolute;
          right: -24px;
          top: 38px;
          color: rgba(8,11,16,0.045);
          font: 900 clamp(74px, 12vw, 170px) 'Plus Jakarta Sans';
          letter-spacing: -0.08em;
        }
        .aha-hero::after {
          content: "";
          position: absolute; inset: 0;
          background:
            linear-gradient(110deg, transparent 0 47%, rgba(255,255,255,0.18) 47% 62%, transparent 62%),
            radial-gradient(circle at 72% 54%, color-mix(in srgb, var(--brand-accent, #1d63ff) 13%, transparent), transparent 34%);
          pointer-events: none;
        }
        .aha-hero-copy { position: relative; z-index: 2; max-width: 470px; padding-top: 22px; }
        .aha-kicker { color: var(--accent-blue); text-transform: uppercase; font: 800 12px 'IBM Plex Mono'; letter-spacing: .14em; }
        .aha-hero h1 { margin: 14px 0 16px; color: var(--text-main); font-size: clamp(54px, 6.2vw, 92px); line-height: .92; }
        .aha-hero p { font-size: 16px; line-height: 1.7; }
        .aha-punchline {
          width: fit-content;
          padding: 9px 13px;
          border: 1px solid var(--border-soft);
          border-radius: var(--radius-pill);
          background: rgba(255,255,255,0.78);
          font-weight: 850;
          color: var(--text-main) !important;
        }
        .aha-primary-btn, .aha-secondary-btn {
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: var(--radius-pill); padding: 13px 22px; margin: 7px 8px 7px 0;
          font-weight: 900; font-size: 14px; text-decoration: none !important;
        }
        .aha-primary-btn, .aha-primary-btn:visited, .aha-primary-btn:hover { color: white !important; }
        .aha-secondary-btn, .aha-secondary-btn:visited, .aha-secondary-btn:hover { color: var(--text-main) !important; }
        .aha-primary-btn { background: var(--accent-ink); box-shadow: 0 18px 34px rgba(8,11,16,.18); }
        .aha-secondary-btn { border: 1px solid var(--border-soft); background: white; }
        .aha-dashboard-canvas {
          position: absolute; right: 34px; top: 88px; width: 58%; height: 470px;
          border: 1px solid rgba(255,255,255,0.78);
          border-radius: 34px;
          background:
            linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px) 0 0 / 84px 84px,
            linear-gradient(180deg, rgba(255,255,255,.10) 1px, transparent 1px) 0 0 / 84px 84px,
            radial-gradient(circle at 34% 30%, color-mix(in srgb, var(--brand-accent) 20%, white), transparent 30%),
            radial-gradient(circle at 74% 16%, rgba(255,64,93,0.18), transparent 24%),
            linear-gradient(150deg, rgba(223,232,244,0.78), rgba(245,248,252,0.66) 48%, rgba(192,211,237,0.82));
          box-shadow: var(--shadow-float);
          overflow: hidden;
          backdrop-filter: blur(18px) saturate(150%);
        }
        .aha-hero-road {
          position: absolute;
          left: 6%;
          right: 6%;
          bottom: 74px;
          height: 132px;
          transform: perspective(680px) rotateX(62deg);
          transform-origin: bottom center;
          border-radius: 44px;
          background:
            linear-gradient(90deg, transparent 0 47%, rgba(255,255,255,.44) 47% 48%, transparent 48% 52%, rgba(255,255,255,.44) 52% 53%, transparent 53%),
            linear-gradient(180deg, rgba(10,15,24,.40), rgba(10,15,24,.10));
          box-shadow: 0 36px 70px rgba(15,23,42,.16);
          opacity: .72;
        }
        .aha-hero-road span {
          position: absolute;
          left: 10%;
          right: 10%;
          height: 1px;
          background: rgba(255,255,255,.32);
        }
        .aha-hero-road span:nth-child(1) { top: 25%; }
        .aha-hero-road span:nth-child(2) { top: 52%; }
        .aha-hero-road span:nth-child(3) { top: 78%; }
        .aha-vehicle-stage {
          position: absolute;
          left: 8%;
          top: 29%;
          width: 72%;
          height: 210px;
          perspective: 900px;
          z-index: 2;
        }
        .aha-car-shadow {
          position: absolute;
          left: 10%;
          right: 0;
          bottom: 3px;
          height: 42px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(6,10,18,.32), transparent 68%);
          filter: blur(4px);
        }
        .aha-car-body {
          position: absolute;
          left: 3%;
          right: 3%;
          bottom: 28px;
          height: 122px;
          transform: rotateX(2deg) rotateY(-14deg) rotateZ(-1deg);
          transform-style: preserve-3d;
          border-radius: 56px 84px 34px 42px;
          background:
            linear-gradient(115deg, rgba(255,255,255,.65), transparent 32%),
            linear-gradient(180deg, color-mix(in srgb, var(--brand-accent) 36%, #ffffff) 0%, color-mix(in srgb, var(--brand-accent) 72%, #111827) 100%);
          box-shadow:
            inset 0 18px 26px rgba(255,255,255,.42),
            inset 0 -24px 36px rgba(5,10,20,.20),
            0 34px 70px rgba(15,23,42,.24);
        }
        .aha-car-body::after {
          content: "";
          position: absolute;
          left: 10%;
          right: 11%;
          top: 58%;
          height: 3px;
          border-radius: 99px;
          background: rgba(255,255,255,.38);
        }
        .aha-car-nose {
          position: absolute;
          right: -28px;
          bottom: 10px;
          width: 86px;
          height: 76px;
          border-radius: 18px 58px 36px 10px;
          background: linear-gradient(145deg, color-mix(in srgb, var(--brand-accent) 54%, #ffffff), color-mix(in srgb, var(--brand-accent) 78%, #111827));
          box-shadow: inset -20px -12px 24px rgba(5,10,20,.16);
        }
        .aha-car-cabin {
          position: absolute;
          left: 28%;
          top: -72px;
          width: 38%;
          height: 100px;
          border-radius: 74px 82px 20px 20px;
          background:
            linear-gradient(135deg, rgba(255,255,255,.86), rgba(193,214,241,.42) 45%, rgba(15,23,42,.22)),
            linear-gradient(180deg, color-mix(in srgb, var(--brand-accent) 20%, #eef6ff), rgba(255,255,255,.2));
          box-shadow: inset 0 18px 26px rgba(255,255,255,.54), 0 16px 30px rgba(15,23,42,.12);
        }
        .aha-car-window {
          position: absolute;
          top: 22px;
          height: 42px;
          background: linear-gradient(140deg, rgba(255,255,255,.82), rgba(122,156,202,.38));
          border: 1px solid rgba(255,255,255,.78);
          box-shadow: inset 0 -10px 14px rgba(29,99,255,.10);
        }
        .aha-window-front { right: 15%; width: 34%; border-radius: 10px 42px 10px 10px; }
        .aha-window-rear { left: 15%; width: 31%; border-radius: 42px 10px 10px 10px; }
        .aha-car-hood {
          position: absolute;
          right: 8%;
          top: 20px;
          width: 30%;
          height: 34px;
          border-radius: 40px 90px 12px 18px;
          background: linear-gradient(110deg, rgba(255,255,255,.44), rgba(255,255,255,.08));
        }
        .aha-car-light {
          position: absolute;
          bottom: 42px;
          width: 42px;
          height: 16px;
          border-radius: 999px;
          filter: drop-shadow(0 0 16px currentColor);
        }
        .aha-light-front { right: -18px; color: #f8fbff; background: #f8fbff; }
        .aha-light-rear { left: 12px; color: #ff405d; background: #ff405d; }
        .aha-car-wheel {
          position: absolute;
          bottom: -24px;
          width: 78px;
          height: 78px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: radial-gradient(circle, #0b111d 0 38%, #e8eef6 39% 53%, #0b111d 54% 100%);
          box-shadow: 0 12px 28px rgba(5,10,20,.30);
        }
        .aha-car-wheel span {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 6px solid rgba(255,255,255,.82);
          background: color-mix(in srgb, var(--brand-accent) 65%, #111827);
        }
        .aha-wheel-front { right: 14%; }
        .aha-wheel-rear { left: 13%; }
        .aha-car-nameplate {
          position: absolute;
          left: 7%;
          bottom: -34px;
          padding: 8px 12px;
          border: 1px solid rgba(255,255,255,.72);
          border-radius: 999px;
          background: rgba(255,255,255,.58);
          backdrop-filter: blur(14px);
          color: #111827;
          font: 800 12px 'IBM Plex Mono';
          letter-spacing: .06em;
          text-transform: uppercase;
          box-shadow: 0 12px 30px rgba(23,34,52,.10);
        }
        .aha-vehicle-sedan .aha-car-body { height: 104px; border-radius: 44px 92px 28px 38px; }
        .aha-vehicle-sedan .aha-car-cabin { left: 34%; top: -64px; width: 33%; height: 86px; }
        .aha-vehicle-hatch .aha-car-body { height: 112px; border-radius: 66px 72px 32px 42px; }
        .aha-vehicle-hatch .aha-car-cabin { left: 23%; top: -68px; width: 42%; }
        .aha-vehicle-mpv .aha-car-body { height: 132px; border-radius: 74px 80px 34px 42px; }
        .aha-vehicle-mpv .aha-car-cabin { left: 24%; top: -74px; width: 46%; }
        .aha-floating-card {
          position: absolute; right: 28px; top: 28px; width: 236px; padding: 18px;
          border: 1px solid rgba(255,255,255,.84); border-radius: 24px;
          background: rgba(255,255,255,.80); box-shadow: var(--shadow-soft); backdrop-filter: blur(16px);
        }
        .aha-stat-grid { position: absolute; left: 41%; right: 44px; bottom: 34px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; z-index: 2; }
        .aha-stat-card {
          padding: 17px; border: 1px solid rgba(255,255,255,.84); border-radius: 20px;
          background: rgba(255,255,255,.76); box-shadow: var(--shadow-soft);
        }
        .aha-stat-value { font: 700 24px 'IBM Plex Mono'; color: var(--text-main); }
        .aha-stat-label { color: var(--text-muted); font-size: 10px; font-weight: 900; text-transform: uppercase; }

        .aha-section-title { margin: 56px 0 18px; }
        .aha-section-title h2 { font-size: clamp(36px, 4.8vw, 62px); line-height: .98; margin: 5px 0; }
        .aha-brand-card {
          min-height: 148px; padding: 18px; border: 1px solid var(--border-soft); border-radius: 26px;
          background: linear-gradient(145deg, rgba(255,255,255,.70), rgba(255,255,255,.42));
          box-shadow: var(--shadow-soft);
          backdrop-filter: blur(18px) saturate(155%);
          transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
        }
        .aha-brand-card-active {
          border-color: var(--brand-accent);
          box-shadow: 0 22px 54px color-mix(in srgb, var(--brand-accent) 18%, transparent);
          transform: translateY(-2px);
          background: linear-gradient(140deg, color-mix(in srgb, var(--brand-accent) 10%, white), white 72%);
        }
        .aha-brand-mark {
          width: 48px; height: 48px; border-radius: 17px; display: grid; place-items: center;
          margin-bottom: 12px;
          border: 1px solid var(--border-soft);
          background: color-mix(in srgb, var(--brand-accent) 10%, #ffffff);
        }
        .aha-brand-mark img {
          width: 30px;
          max-height: 28px;
          object-fit: contain;
          filter: saturate(.25) contrast(1.1);
        }
        .stButton > button {
          width: 100%;
          border-radius: var(--radius-pill) !important;
          border: 1px solid rgba(8,11,16,.11) !important;
          background: rgba(255,255,255,0.82) !important;
          color: var(--text-main) !important;
          font-weight: 900 !important;
          min-height: 44px;
          box-shadow: 0 10px 22px rgba(23,34,52,.06);
        }
        .stButton > button:hover { border-color: var(--accent-blue) !important; color: var(--accent-blue) !important; }

        .aha-compat-shell {
          padding: 24px; border: 1px solid rgba(255,255,255,0.82); border-radius: 36px;
          background:
            radial-gradient(circle at 16% 0%, rgba(255,64,93,.08), transparent 28%),
            radial-gradient(circle at 84% 10%, rgba(29,99,255,.13), transparent 30%),
            rgba(255,255,255,.52);
          box-shadow: var(--shadow-float);
          backdrop-filter: blur(24px) saturate(165%);
        }
        .aha-compat-left, .aha-compat-center, .aha-compat-right, .aha-assistant-panel {
          border: 1px solid var(--glass-border); border-radius: 28px;
          background: linear-gradient(145deg, rgba(255,255,255,.70), rgba(255,255,255,.42));
          padding: 21px;
          box-shadow: 0 14px 36px rgba(23,34,52,.07);
          backdrop-filter: blur(20px) saturate(150%);
        }
        .aha-control-label { font-size: 11px; color: var(--text-muted); font-weight: 900; text-transform: uppercase; margin: 14px 0 4px; }
        .aha-showcase {
          position: relative; min-height: 360px; border-radius: 28px; overflow: hidden;
          background:
            linear-gradient(90deg, rgba(8,11,16,0.05) 1px, transparent 1px) 0 0 / 70px 70px,
            linear-gradient(180deg, #f4f8fc, #d3deeb);
        }
        .aha-road { position: absolute; inset: 0 42%; background: linear-gradient(#dbe6f5, #b8c7d9); }
        .aha-road::before { content: ""; position: absolute; left: calc(50% - 3px); top: 0; width: 6px; height: 100%; background: linear-gradient(var(--brand-accent), #111827); border-radius: 99px; }
        .aha-car-top {
          position: absolute; left: 34%; top: 18%; width: 32%; height: 64%;
          border-radius: 46% 46% 30% 30%;
          background: linear-gradient(90deg, #e5e7eb, #ffffff 40%, #aeb9c7);
          box-shadow: 0 24px 50px rgba(15,23,42,.18);
        }
        .aha-model-strip {
          position: absolute; left: 18px; right: 18px; top: 18px;
          color: rgba(8,11,16,.44);
          font: 800 11px 'IBM Plex Mono';
          text-transform: uppercase;
          letter-spacing: .08em;
        }
        .aha-score-ring {
          width: 118px; height: 118px; border-radius: 50%; display: grid; place-items: center;
          background: conic-gradient(var(--accent-blue) calc(var(--score) * 1%), #e5e7eb 0);
          margin: 0 auto 14px;
        }
        .aha-score-ring-inner {
          width: 88px; height: 88px; border-radius: 50%; background: white; display: grid; place-items: center;
          font: 700 24px 'IBM Plex Mono'; color: var(--text-main);
        }
        .aha-reason-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 14px; }
        .aha-reason-card {
          padding: 13px; border: 1px solid var(--border-soft); border-radius: 18px; background: white;
          font-size: 13px;
        }
        .aha-action-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 14px 0; }
        .aha-action-tile { padding: 13px; border-radius: 16px; background: var(--bg-panel-soft); border: 1px solid var(--border-soft); font-weight: 900; font-size: 12px; }
        .aha-chat-input { border-radius: 20px; background: var(--bg-panel-soft); padding: 13px 14px; font-size: 13px; color: var(--text-muted); }
        .aha-feature-card {
          min-height: 170px;
          margin-bottom: 16px;
          padding: 22px;
          border: 1px solid var(--border-soft);
          border-radius: 26px;
          background: linear-gradient(145deg, rgba(255,255,255,.74), rgba(255,255,255,.44));
          box-shadow: var(--shadow-soft);
          backdrop-filter: blur(18px) saturate(150%);
        }
        .aha-feature-card span {
          display: inline-grid; place-items: center; min-width: 40px; height: 32px; margin-bottom: 14px;
          border: 1px solid var(--border-soft); border-radius: var(--radius-pill);
          font: 800 12px 'IBM Plex Mono'; color: var(--text-muted);
        }
        .aha-feature-card strong { display: block; margin-bottom: 8px; font-size: 18px; }

        .aha-game-shell {
          position: relative; overflow: hidden; border-radius: 38px; padding: 34px;
          background:
            radial-gradient(circle at 20% 30%, rgba(47,111,237,.22), transparent 34%),
            radial-gradient(circle at 82% 14%, rgba(255,90,31,.16), transparent 28%),
            linear-gradient(145deg, #07090d, #101827);
          box-shadow: 0 0 60px rgba(47,111,237,.15), var(--shadow-float);
          color: white;
        }
        .aha-game-grid { display: grid; grid-template-columns: 320px 1fr; gap: 26px; }
        .aha-driver-card, .aha-game-stage {
          border: 1px solid rgba(255,255,255,.09); border-radius: 30px; background: rgba(255,255,255,.05); padding: 22px;
          backdrop-filter: blur(12px);
        }
        .aha-driver-portrait {
          aspect-ratio: 3 / 4; border-radius: 24px; margin-bottom: 18px;
          background:
            radial-gradient(circle at 50% 28%, rgba(47,111,237,.42), transparent 30%),
            linear-gradient(160deg, #1b2433, #06080c);
        }
        .aha-skill-track { height: 5px; background: rgba(255,255,255,.12); border-radius: 99px; overflow: hidden; margin: 5px 0 12px; }
        .aha-skill-fill { height: 100%; background: linear-gradient(90deg, #2f6fed, #b9d3ff); box-shadow: 0 0 8px rgba(47,111,237,.5); }
        .aha-game-stage { min-height: 360px; background: linear-gradient(180deg, #0d1520, #060c15); }
        .aha-route-line { height: 12px; border-radius: 999px; background: linear-gradient(90deg, #2f6fed, #ffffff, #ff5a1f); margin: 24px 0; box-shadow: 0 0 28px rgba(47,111,237,.35); }
        .aha-game-meter { height: 12px; border-radius: 999px; background: rgba(255,255,255,.12); overflow: hidden; }
        .aha-game-meter span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #ffffff, #2f6fed); }

        .aha-lead-panel {
          max-width: 960px; margin: 56px auto 0; padding: 36px; text-align: center;
          border: 1px solid rgba(255,255,255,.12); border-radius: 36px;
          background:
            linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px) 0 0 / 86px 86px,
            linear-gradient(180deg, rgba(255,255,255,.05) 1px, transparent 1px) 0 0 / 86px 86px,
            radial-gradient(circle at 18% 20%, rgba(29,99,255,.24), transparent 32%),
            radial-gradient(circle at 76% 12%, rgba(255,64,93,.17), transparent 26%),
            linear-gradient(145deg, #070a12, #111827);
          color: white; box-shadow: var(--shadow-float);
        }
        .aha-lead-panel h2 { color: white; font-size: clamp(34px, 4vw, 58px); line-height: 1; }
        .aha-retarget-note {
          margin: 18px auto 0;
          max-width: 760px;
          padding: 12px 14px;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 18px;
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.68);
          font-size: 12px;
        }
        .aha-utm-note {
          width: fit-content;
          margin: 16px auto 0;
          padding: 9px 13px;
          border: 1px solid rgba(255,255,255,.16);
          border-radius: var(--radius-pill);
          background: rgba(255,255,255,.08);
          color: rgba(255,255,255,.82);
          font: 800 12px 'IBM Plex Mono';
        }
        .aha-footer { margin-top: 46px; padding: 24px 0 8px; color: var(--text-muted); text-align: center; font-size: 13px; }

        .stTextInput input, .stTextArea textarea, .stSelectbox [data-baseweb="select"] {
          border-radius: 16px !important;
          border: 1px solid rgba(8,11,16,.10) !important;
          background: rgba(255,255,255,.72) !important;
          box-shadow: 0 10px 24px rgba(23,34,52,.05) !important;
        }
        details {
          border: 1px solid var(--border-soft) !important;
          border-radius: 20px !important;
          background: rgba(255,255,255,.75) !important;
          box-shadow: 0 10px 24px rgba(23,34,52,.05);
        }

        @media (max-width: 960px) {
          .aha-nav-links { display: none; }
          .aha-hero { padding: 28px; }
          .aha-dashboard-canvas { position: relative; right: auto; top: auto; width: 100%; margin-top: 24px; }
          .aha-stat-grid { position: relative; left: auto; right: auto; bottom: auto; grid-template-columns: repeat(2,1fr); margin-top: 18px; }
          .aha-game-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 540px) {
          .main .block-container { padding: .8rem 1rem 3rem; }
          .aha-hero h1 { font-size: 42px; }
          .aha-stat-grid, .aha-reason-grid, .aha-action-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
        </style>
        """,
        unsafe_allow_html=True,
    )
