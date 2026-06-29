import streamlit as st


def inject_global_styles():
    st.markdown(
        """
        <style>
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');

        :root {
          --bg-main: #05070d;
          --bg-panel: #0b101a;
          --bg-panel-soft: #111827;
          --bg-glass: rgba(11,16,26,0.64);
          --text-main: #f6f8ff;
          --text-muted: #a7b1c4;
          --text-soft: #6e7b91;
          --accent-blue: #4f8cff;
          --accent-cyan: #36d6ff;
          --accent-silver: #d8e3f4;
          --accent-ink: #05070d;
          --accent-ember: #ff3f6e;
          --accent-gold: #f4c96b;
          --border-soft: rgba(255,255,255,0.12);
          --glass-border: rgba(255,255,255,0.18);
          --shadow-soft: 0 16px 42px rgba(0,0,0,0.34);
          --shadow-float: 0 34px 110px rgba(0,0,0,0.48);
          --radius-lg: 22px;
          --radius-xl: 34px;
          --radius-pill: 999px;
        }

        #MainMenu, footer, header { visibility: hidden; }
        .stDeployButton, [data-testid="stToolbar"] { display: none !important; }
        [data-testid="stAppViewContainer"] {
          background:
            radial-gradient(circle at 8% 0%, rgba(255,63,110,0.18), transparent 30%),
            radial-gradient(circle at 82% 8%, rgba(54,214,255,0.16), transparent 34%),
            radial-gradient(circle at 62% 66%, rgba(79,140,255,0.11), transparent 38%),
            linear-gradient(135deg, #03050a 0%, #08111f 44%, #03050a 100%);
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
        label, .stMarkdown, [data-testid="stWidgetLabel"], .stSelectbox label, .stTextInput label, .stTextArea label {
          color: var(--text-muted) !important;
        }
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
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: var(--radius-pill);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.035)),
            rgba(7,11,19,0.72);
          box-shadow: 0 20px 60px rgba(0,0,0,0.34);
          backdrop-filter: blur(22px) saturate(160%);
        }
        .aha-logo { display: flex; align-items: center; gap: 12px; font-weight: 900; }
        .aha-logo-mark {
          width: 42px; height: 42px; display: grid; place-items: center;
          border-radius: 50%; color: white;
          background: radial-gradient(circle at 30% 20%, #6ee7ff, #246bff 40%, #060914 72%);
          box-shadow: 0 0 32px rgba(79,140,255,.36);
          font: 800 12px 'IBM Plex Mono', monospace; letter-spacing: .03em;
        }
        .aha-nav-links { display: flex; gap: 24px; color: var(--text-muted); font-size: 13px; font-weight: 800; }
        .aha-status-pill, .aha-chip {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(79,140,255,0.34);
          border-radius: var(--radius-pill);
          background: rgba(79,140,255,0.13);
          color: #cfe1ff;
          padding: 8px 13px;
          font-size: 12px;
          font-weight: 850;
          line-height: 1;
        }

        .aha-hero {
          position: relative;
          min-height: 650px;
          padding: 46px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 42px;
          background:
            radial-gradient(circle at 11% 10%, rgba(255,63,110,0.24), transparent 31%),
            radial-gradient(circle at 82% 32%, rgba(54,214,255,0.22), transparent 36%),
            linear-gradient(90deg, rgba(9,13,22,0.96) 0 39%, rgba(9,16,29,0.80) 39% 100%),
            linear-gradient(145deg, #070a12, #111b2f);
          box-shadow: var(--shadow-float);
          overflow: hidden;
          backdrop-filter: blur(24px) saturate(160%);
        }
        .aha-hero::before {
          display: none;
        }
        .aha-hero::after {
          display: none;
        }
        .aha-hero-copy { position: relative; z-index: 2; max-width: 500px; padding-top: 22px; }
        .aha-kicker { color: var(--accent-blue); text-transform: uppercase; font: 800 12px 'IBM Plex Mono'; letter-spacing: .14em; }
        .aha-hero h1 { margin: 14px 0 16px; color: var(--text-main); font-size: clamp(50px, 5.8vw, 84px); line-height: .94; }
        .aha-hero p { font-size: 16px; line-height: 1.7; }
        .aha-punchline {
          width: fit-content;
          padding: 9px 13px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--radius-pill);
          background: rgba(255,255,255,0.07);
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
        .aha-primary-btn {
          background: linear-gradient(135deg, #f7faff, #8db7ff 45%, #285bff);
          color: #05070d !important;
          box-shadow: 0 18px 44px rgba(79,140,255,.34);
        }
        .aha-secondary-btn { border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,.07); }
        .aha-dashboard-canvas {
          position: absolute; right: 34px; top: 88px; width: 58%; height: 470px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 34px;
          background:
            radial-gradient(circle at 48% 48%, color-mix(in srgb, var(--brand-accent) 22%, transparent), transparent 36%),
            radial-gradient(circle at 82% 20%, rgba(255,63,110,0.12), transparent 26%),
            linear-gradient(150deg, rgba(12,18,30,0.72), rgba(5,8,14,0.48) 52%, rgba(9,18,32,0.66));
          box-shadow: var(--shadow-float);
          overflow: hidden;
          backdrop-filter: blur(18px) saturate(150%);
          animation: ahaLiftIn .7s ease both;
        }
        .aha-hero-road {
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: 58px;
          height: 118px;
          transform: perspective(680px) rotateX(62deg);
          transform-origin: bottom center;
          border-radius: 44px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.018));
          box-shadow: 0 36px 70px rgba(0,0,0,.28);
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
        .aha-model-stage {
          position: absolute;
          left: 2%;
          right: 2%;
          top: 10px;
          height: 440px;
          z-index: 3;
          display: grid;
          place-items: center;
          animation: ahaCarReveal .9s ease both;
          pointer-events: none;
        }
        .aha-model-iframe {
          width: 100%;
          height: 100%;
          min-height: 100%;
          border: 0;
          background: transparent !important;
          background-color: transparent !important;
          color-scheme: dark;
        }
        .aha-real-model-plate {
          left: 13%;
          bottom: 14px;
          z-index: 4;
        }
        .aha-compat-model-plate {
          left: 18px;
          bottom: 14px;
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
            linear-gradient(115deg, rgba(255,255,255,.38), transparent 32%),
            linear-gradient(180deg, color-mix(in srgb, var(--brand-accent) 62%, #eaf3ff) 0%, color-mix(in srgb, var(--brand-accent) 78%, #05070d) 100%);
          box-shadow:
            inset 0 18px 26px rgba(255,255,255,.26),
            inset 0 -24px 36px rgba(5,10,20,.42),
            0 34px 70px rgba(0,0,0,.36);
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
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 999px;
          background: rgba(8,13,22,.76);
          backdrop-filter: blur(14px);
          color: #f8fbff;
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
        .aha-stat-grid { position: absolute; left: 41%; right: 44px; bottom: 34px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; z-index: 2; }
        .aha-stat-card {
          padding: 17px; border: 1px solid rgba(255,255,255,.13); border-radius: 20px;
          background: linear-gradient(145deg, rgba(255,255,255,.10), rgba(255,255,255,.04)); box-shadow: var(--shadow-soft);
          backdrop-filter: blur(16px);
        }
        .aha-stat-value { font: 700 24px 'IBM Plex Mono'; color: var(--text-main); }
        .aha-stat-label { color: var(--text-muted); font-size: 10px; font-weight: 900; text-transform: uppercase; }

        .aha-section-title { margin: 56px 0 18px; }
        .aha-section-title h2 { font-size: clamp(36px, 4.8vw, 62px); line-height: .98; margin: 5px 0; }
        .aha-brand-card {
          min-height: 158px; padding: 20px; margin-bottom: 18px; border: 1px solid rgba(255,255,255,.12); border-radius: 26px;
          background: linear-gradient(145deg, rgba(255,255,255,.09), rgba(255,255,255,.035));
          box-shadow: var(--shadow-soft);
          backdrop-filter: blur(18px) saturate(155%);
          transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
        }
        .aha-brand-button,
        .aha-brand-button:visited,
        .aha-brand-button:hover {
          display: block;
          color: var(--text-main) !important;
          text-decoration: none !important;
        }
        .aha-brand-button:hover {
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--brand-accent) 70%, rgba(255,255,255,.18));
          box-shadow: 0 24px 70px color-mix(in srgb, var(--brand-accent) 20%, rgba(0,0,0,.48));
        }
        .aha-brand-card-active {
          border-color: var(--brand-accent);
          box-shadow: 0 22px 54px color-mix(in srgb, var(--brand-accent) 18%, transparent);
          transform: translateY(-2px);
          background: linear-gradient(140deg, color-mix(in srgb, var(--brand-accent) 18%, rgba(255,255,255,.08)), rgba(255,255,255,.07) 72%);
        }
        .aha-brand-mark {
          width: 48px; height: 48px; border-radius: 17px; display: grid; place-items: center;
          margin-bottom: 12px;
          border: 1px solid rgba(255,255,255,.12);
          background: color-mix(in srgb, var(--brand-accent) 18%, rgba(255,255,255,.06));
        }
        .aha-brand-mark img {
          width: 30px;
          max-height: 28px;
          object-fit: contain;
          filter: invert(1) saturate(.15) brightness(1.7);
        }
        .stButton > button {
          width: 100%;
          border-radius: var(--radius-pill) !important;
          border: 1px solid rgba(255,255,255,.13) !important;
          background: linear-gradient(135deg, rgba(255,255,255,.10), rgba(255,255,255,.04)) !important;
          color: var(--text-main) !important;
          font-weight: 900 !important;
          min-height: 44px;
          box-shadow: 0 12px 28px rgba(0,0,0,.22);
        }
        .stButton > button:hover {
          border-color: rgba(79,140,255,.58) !important;
          color: #dbe8ff !important;
          box-shadow: 0 0 28px rgba(79,140,255,.20);
        }

        .aha-assistant-panel {
          border: 1px solid var(--glass-border); border-radius: 28px;
          background: linear-gradient(145deg, rgba(255,255,255,.095), rgba(255,255,255,.035));
          padding: 21px;
          box-shadow: 0 14px 36px rgba(23,34,52,.07);
          backdrop-filter: blur(20px) saturate(150%);
        }
        .aha-control-label { font-size: 11px; color: var(--text-muted); font-weight: 900; text-transform: uppercase; margin: 14px 0 4px; }
        .aha-showcase {
          position: relative; min-height: 420px; border-radius: 28px; overflow: hidden;
          background:
            radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--brand-accent) 16%, transparent), transparent 34%),
            linear-gradient(180deg, rgba(17,27,46,.68), rgba(7,11,19,.55));
          animation: ahaLiftIn .7s ease both;
        }
        .aha-showcase .aha-model-stage {
          left: 0;
          right: 22%;
          top: 34px;
          height: 295px;
          z-index: 2;
        }
        .aha-showcase .aha-vehicle-stage {
          left: 9%;
          top: 35%;
          width: 72%;
          height: 190px;
        }
        .aha-showcase-metrics {
          position: absolute;
          left: 22px;
          bottom: 20px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          z-index: 5;
        }
        .aha-showcase-road {
          position: absolute;
          left: 9%;
          right: 22%;
          bottom: 58px;
          height: 108px;
          transform: perspective(620px) rotateX(64deg);
          transform-origin: bottom center;
          border-radius: 38px;
          background:
            linear-gradient(90deg, transparent 48%, rgba(255,255,255,.22) 49% 51%, transparent 52%),
            linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.028));
          box-shadow: 0 26px 56px rgba(0,0,0,.28);
          z-index: 1;
        }
        @keyframes ahaLiftIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ahaCarReveal {
          from { opacity: 0; transform: translateY(18px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .aha-score-ring {
          width: 118px; height: 118px; border-radius: 50%; display: grid; place-items: center;
          background: conic-gradient(var(--accent-blue) calc(var(--score) * 1%), rgba(255,255,255,.10) 0);
          margin: 0 auto 14px;
        }
        .aha-score-ring-inner {
          width: 88px; height: 88px; border-radius: 50%; background: #090f19; display: grid; place-items: center;
          font: 700 24px 'IBM Plex Mono'; color: var(--text-main);
        }
        .aha-reason-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 14px; }
        .aha-reason-card {
          padding: 13px; border: 1px solid rgba(255,255,255,.10); border-radius: 18px; background: rgba(255,255,255,.055);
          font-size: 13px;
        }
        .aha-action-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 14px 0; }
        .aha-action-tile { padding: 13px; border-radius: 16px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.10); font-weight: 900; font-size: 12px; }
        .aha-chat-input { border-radius: 20px; background: rgba(255,255,255,.06); padding: 13px 14px; font-size: 13px; color: var(--text-muted); }
        .aha-feature-card {
          min-height: 170px;
          margin-bottom: 16px;
          padding: 22px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 26px;
          background: linear-gradient(145deg, rgba(255,255,255,.09), rgba(255,255,255,.035));
          box-shadow: var(--shadow-soft);
          backdrop-filter: blur(18px) saturate(150%);
        }
        .aha-feature-card span {
          display: inline-grid; place-items: center; min-width: 40px; height: 32px; margin-bottom: 14px;
          border: 1px solid rgba(255,255,255,.12); border-radius: var(--radius-pill);
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
        .aha-live-section,
        .aha-glass-panel {
          margin-top: 28px;
          padding: 30px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 34px;
          background:
            radial-gradient(circle at 12% 15%, rgba(54,214,255,0.14), transparent 30%),
            linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.035));
          box-shadow: var(--shadow-soft);
          backdrop-filter: blur(24px) saturate(160%);
        }
        .aha-live-section h2,
        .aha-glass-panel h2 {
          color: var(--text-main);
          font-size: clamp(34px, 4vw, 58px);
          margin: 10px 0 12px;
        }
        .aha-video-grid,
        .aha-variant-grid,
        .aha-founder-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 16px;
        }
        .aha-video-card,
        .aha-variant-card,
        .aha-founder-card,
        .aha-install-row {
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 24px;
          background: linear-gradient(145deg, rgba(255,255,255,.10), rgba(255,255,255,.035));
          box-shadow: var(--shadow-soft);
          backdrop-filter: blur(20px) saturate(150%);
          overflow: hidden;
        }
        .aha-video-frame {
          aspect-ratio: 16 / 9;
          background: #05070d;
        }
        .aha-video-iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }
        .aha-video-copy,
        .aha-variant-card,
        .aha-founder-card div {
          padding: 18px;
        }
        .aha-video-copy span,
        .aha-variant-card span,
        .aha-founder-card span {
          color: #b9d3ff;
          font: 800 11px 'IBM Plex Mono';
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .aha-video-copy h3,
        .aha-variant-card h3,
        .aha-founder-card h3,
        .aha-install-row h3 {
          color: var(--text-main);
          margin: 8px 0 6px;
        }
        .aha-install-grid {
          display: grid;
          gap: 12px;
        }
        .aha-install-row {
          display: grid;
          grid-template-columns: 58px 1fr;
          gap: 16px;
          align-items: start;
          padding: 16px;
        }
        .aha-install-row > span {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(79,140,255,.22);
          color: #dbe9ff;
          font: 900 13px 'IBM Plex Mono';
        }
        .aha-variant-card.featured {
          border-color: rgba(255,180,92,.36);
          background:
            radial-gradient(circle at 82% 10%, rgba(255,180,92,.18), transparent 36%),
            linear-gradient(145deg, rgba(255,255,255,.13), rgba(255,255,255,.045));
        }
        .aha-variant-card strong {
          display: block;
          color: var(--text-main);
          font-size: 28px;
          margin: 8px 0;
        }
        .aha-founder-card {
          display: grid;
          grid-template-columns: 160px 1fr;
          align-items: center;
        }
        .aha-founder-card img {
          width: 100%;
          height: 100%;
          min-height: 180px;
          object-fit: cover;
        }
        .aha-press-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }
        .aha-press-strip a {
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          padding: 9px 12px;
          color: #dbe9ff !important;
          text-decoration: none !important;
          font-weight: 850;
          font-size: 12px;
        }
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
            linear-gradient(145deg, #05070d, #121d33);
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
          border: 1px solid rgba(255,255,255,.12) !important;
          background: rgba(255,255,255,.08) !important;
          color: var(--text-main) !important;
          box-shadow: 0 10px 24px rgba(0,0,0,.20) !important;
        }
        .stSelectbox [data-baseweb="select"] > div,
        .stSelectbox [data-baseweb="select"] div,
        .stSelectbox [data-baseweb="select"] span,
        .stSelectbox [data-baseweb="select"] svg,
        .stTextInput input,
        .stTextArea textarea {
          background: transparent !important;
          color: var(--text-main) !important;
          fill: var(--text-main) !important;
        }
        .stSelectbox [data-baseweb="select"] > div[class],
        [data-testid="stSelectbox"] [data-baseweb="select"] > div[class] {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
          color: var(--text-main) !important;
        }
        .stSelectbox.stSelectbox.stSelectbox [data-baseweb="select"][data-baseweb="select"][data-baseweb="select"] > div[class][class][class][class][class],
        [data-testid="stSelectbox"][data-testid="stSelectbox"][data-testid="stSelectbox"] [data-baseweb="select"][data-baseweb="select"][data-baseweb="select"] > div[class][class][class][class][class] {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
          color: var(--text-main) !important;
        }
        .stSelectbox [data-baseweb="select"] input {
          color: transparent !important;
          caret-color: var(--text-main) !important;
        }
        .stSelectbox div[data-baseweb="select"] {
          min-height: 50px;
          background:
            linear-gradient(135deg, rgba(255,255,255,.10), rgba(255,255,255,.045)) !important;
          backdrop-filter: blur(18px) saturate(145%);
        }
        div[data-baseweb="popover"] div[role="listbox"] {
          border: 1px solid rgba(255,255,255,.14) !important;
          border-radius: 16px !important;
          background: #101827 !important;
          color: var(--text-main) !important;
          box-shadow: 0 22px 52px rgba(0,0,0,.42) !important;
        }
        div[data-baseweb="popover"] li,
        div[data-baseweb="popover"] [role="option"] {
          background: #101827 !important;
          color: var(--text-main) !important;
        }
        div[data-baseweb="popover"] [role="option"]:hover {
          background: rgba(79,140,255,.18) !important;
        }
        details {
          border: 1px solid rgba(255,255,255,.12) !important;
          border-radius: 20px !important;
          background: rgba(255,255,255,.06) !important;
          box-shadow: 0 10px 24px rgba(0,0,0,.22);
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
          .aha-stat-grid, .aha-reason-grid, .aha-action-grid, .aha-video-grid, .aha-variant-grid, .aha-founder-grid { grid-template-columns: 1fr; }
          .aha-founder-card { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
        </style>
        """,
        unsafe_allow_html=True,
    )
