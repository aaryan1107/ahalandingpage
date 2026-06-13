import streamlit as st


def inject_global_styles():
    st.markdown(
        """
        <style>
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=Inter:wght@400;500;600;700;800&family=Rajdhani:wght@600;700&display=swap');

        :root {
          --bg-main: #eef2f6;
          --bg-panel: #ffffff;
          --bg-panel-soft: #f7f9fc;
          --bg-glass: rgba(255,255,255,0.68);
          --text-main: #111827;
          --text-muted: #6b7280;
          --text-soft: #a6adba;
          --accent-blue: #2563eb;
          --accent-green: #10b981;
          --accent-violet: #7c3aed;
          --accent-amber: #ff7a1a;
          --border-soft: rgba(15,23,42,0.09);
          --shadow-soft: 0 10px 34px rgba(15,23,42,0.10);
          --shadow-float: 0 28px 80px rgba(15,23,42,0.16);
          --radius-lg: 20px;
          --radius-xl: 28px;
          --radius-pill: 999px;
        }

        #MainMenu, footer, header { visibility: hidden; }
        .stDeployButton { display: none !important; }
        [data-testid="stToolbar"] { display: none !important; }
        [data-testid="stAppViewContainer"] {
          background:
            radial-gradient(circle at 15% 8%, rgba(37,99,235,0.12), transparent 28%),
            radial-gradient(circle at 88% 18%, rgba(16,185,129,0.12), transparent 26%),
            linear-gradient(135deg, #edf2f7 0%, #f9fafb 48%, #e4ebf5 100%);
          color: var(--text-main);
          font-family: Inter, sans-serif;
        }
        .main .block-container {
          max-width: 1280px;
          padding: 1.1rem 2rem 4rem;
        }
        h1, h2, h3 {
          font-family: Rajdhani, Inter, sans-serif !important;
          letter-spacing: 0.01em;
        }
        p { color: var(--text-muted); }
        div[data-testid="stVerticalBlock"] { gap: 1rem; }

        .aha-shell {
          border: 1px solid var(--border-soft);
          border-radius: var(--radius-xl);
          background: var(--bg-glass);
          box-shadow: var(--shadow-float);
          backdrop-filter: blur(24px) saturate(150%);
          overflow: hidden;
        }
        .aha-nav {
          position: sticky;
          top: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 22px;
          padding: 14px 18px;
          border: 1px solid rgba(255,255,255,0.72);
          border-radius: var(--radius-pill);
          background: rgba(255,255,255,0.72);
          box-shadow: 0 12px 40px rgba(15,23,42,0.08);
          backdrop-filter: blur(22px);
        }
        .aha-logo { display: flex; align-items: center; gap: 12px; font-weight: 800; }
        .aha-logo-mark {
          width: 38px; height: 38px; display: grid; place-items: center;
          border-radius: 13px; color: white; background: #111827;
          font: 700 13px Rajdhani, sans-serif; letter-spacing: .08em;
        }
        .aha-nav-links { display: flex; gap: 22px; color: var(--text-muted); font-size: 13px; font-weight: 700; }
        .aha-status-pill, .aha-chip {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(37,99,235,0.16);
          border-radius: var(--radius-pill);
          background: rgba(37,99,235,0.08);
          color: #1d4ed8;
          padding: 8px 13px;
          font-size: 12px;
          font-weight: 800;
        }

        .aha-hero {
          position: relative;
          min-height: 620px;
          padding: 44px;
          border-radius: 34px;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.96) 0 38%, rgba(255,255,255,0.64) 38% 100%),
            radial-gradient(circle at 74% 40%, rgba(37,99,235,0.18), transparent 34%),
            #eff4fb;
          box-shadow: var(--shadow-float);
          overflow: hidden;
        }
        .aha-hero::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0 48%, rgba(37,99,235,0.12) 48% 50%, transparent 50%);
          pointer-events: none;
        }
        .aha-hero-copy { position: relative; z-index: 2; max-width: 430px; padding-top: 24px; }
        .aha-kicker { color: var(--accent-blue); text-transform: uppercase; font: 800 12px Inter; letter-spacing: .14em; }
        .aha-hero h1 { margin: 12px 0 14px; color: var(--text-main); font-size: clamp(48px, 6vw, 82px); line-height: .92; }
        .aha-hero p { font-size: 16px; line-height: 1.7; }
        .aha-primary-btn, .aha-secondary-btn {
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: var(--radius-pill); padding: 13px 22px; margin: 7px 8px 7px 0;
          font-weight: 800; font-size: 14px; text-decoration: none !important;
        }
        .aha-primary-btn, .aha-primary-btn:visited, .aha-primary-btn:hover { color: white !important; }
        .aha-secondary-btn, .aha-secondary-btn:visited, .aha-secondary-btn:hover { color: var(--text-main) !important; }
        .aha-primary-btn { background: var(--accent-blue); box-shadow: 0 0 26px rgba(37,99,235,.32); }
        .aha-secondary-btn { border: 1px solid var(--border-soft); background: white; }
        .aha-dashboard-canvas {
          position: absolute; right: 34px; top: 80px; width: 58%; height: 460px;
          border-radius: 30px;
          background: linear-gradient(150deg, #dce7f5, #f7f9fc 48%, #c8d7eb);
          box-shadow: var(--shadow-float);
          overflow: hidden;
        }
        .aha-vehicle-stage {
          position: absolute; left: 9%; top: 22%; width: 78%; height: 38%;
          border-radius: 100px 120px 46px 46px;
          background: linear-gradient(180deg, #f9fafb, #aab8c9);
          box-shadow: inset 0 -24px 40px rgba(15,23,42,.18), 0 32px 70px rgba(15,23,42,.16);
        }
        .aha-vehicle-stage::before, .aha-vehicle-stage::after {
          content: ""; position: absolute; bottom: -24px; width: 78px; height: 78px; border-radius: 50%;
          background: radial-gradient(circle, #111827 0 36%, #e5e7eb 37% 54%, #111827 55%);
        }
        .aha-vehicle-stage::before { left: 12%; }
        .aha-vehicle-stage::after { right: 12%; }
        .aha-floating-card {
          position: absolute; right: 28px; top: 28px; width: 230px; padding: 18px;
          border: 1px solid rgba(255,255,255,.8); border-radius: 22px;
          background: rgba(255,255,255,.78); box-shadow: var(--shadow-soft); backdrop-filter: blur(16px);
        }
        .aha-stat-grid { position: absolute; left: 42%; right: 44px; bottom: 34px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .aha-stat-card {
          padding: 17px; border: 1px solid rgba(255,255,255,.8); border-radius: 18px;
          background: rgba(255,255,255,.7); box-shadow: var(--shadow-soft);
        }
        .aha-stat-value { font: 700 25px 'IBM Plex Mono'; color: var(--text-main); }
        .aha-stat-label { color: var(--text-muted); font-size: 11px; font-weight: 800; text-transform: uppercase; }

        .aha-section-title { margin: 52px 0 18px; }
        .aha-section-title h2 { font-size: 46px; margin: 5px 0; }
        .aha-brand-strip { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
        .aha-brand-card {
          min-height: 132px; padding: 18px; border: 1px solid var(--border-soft); border-radius: 22px;
          background: rgba(255,255,255,.72); box-shadow: var(--shadow-soft);
        }
        .aha-brand-card-active {
          border-color: var(--brand-accent);
          box-shadow: 0 18px 48px rgba(37,99,235,.18);
          transform: translateY(-2px);
        }
        .aha-brand-mark { width: 42px; height: 42px; border-radius: 14px; display: grid; place-items: center; color: white; font-weight: 900; margin-bottom: 12px; }
        .stButton > button {
          width: 100%;
          border-radius: var(--radius-pill) !important;
          border: 1px solid rgba(37,99,235,.18) !important;
          background: white !important;
          color: var(--text-main) !important;
          font-weight: 800 !important;
          min-height: 42px;
        }
        .stButton > button:hover { border-color: var(--accent-blue) !important; color: var(--accent-blue) !important; }

        .aha-compat-shell {
          display: grid; grid-template-columns: 270px 1fr 340px; gap: 18px;
          padding: 22px; border: 1px solid var(--border-soft); border-radius: 32px;
          background: rgba(255,255,255,.72); box-shadow: var(--shadow-float);
        }
        .aha-compat-left, .aha-compat-center, .aha-compat-right, .aha-assistant-panel {
          border: 1px solid var(--border-soft); border-radius: 24px; background: rgba(255,255,255,.78); padding: 20px;
        }
        .aha-control-label { font-size: 11px; color: var(--text-muted); font-weight: 800; text-transform: uppercase; margin: 14px 0 4px; }
        .aha-showcase {
          position: relative; min-height: 340px; border-radius: 24px; overflow: hidden;
          background: linear-gradient(180deg, #edf4fb, #d7e3f1);
        }
        .aha-road { position: absolute; inset: 0 42%; background: linear-gradient(#dbe6f5, #b8c7d9); }
        .aha-road::before { content: ""; position: absolute; left: calc(50% - 3px); top: 0; width: 6px; height: 100%; background: linear-gradient(#8b5cf6, #2563eb); border-radius: 99px; }
        .aha-car-top {
          position: absolute; left: 34%; top: 18%; width: 32%; height: 64%;
          border-radius: 46% 46% 30% 30%;
          background: linear-gradient(90deg, #e5e7eb, #ffffff 40%, #aeb9c7);
          box-shadow: 0 24px 50px rgba(15,23,42,.18);
        }
        .aha-score-ring {
          width: 116px; height: 116px; border-radius: 50%; display: grid; place-items: center;
          background: conic-gradient(var(--accent-green) calc(var(--score) * 1%), #e5e7eb 0);
          margin: 0 auto 14px;
        }
        .aha-score-ring-inner {
          width: 88px; height: 88px; border-radius: 50%; background: white; display: grid; place-items: center;
          font: 700 24px 'IBM Plex Mono'; color: var(--text-main);
        }
        .aha-reason-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 14px; }
        .aha-reason-card {
          padding: 13px; border: 1px solid var(--border-soft); border-radius: 16px; background: white;
          font-size: 13px;
        }
        .aha-assistant-panel { min-height: 100%; }
        .aha-action-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 14px 0; }
        .aha-action-tile { padding: 12px; border-radius: 14px; background: var(--bg-panel-soft); border: 1px solid var(--border-soft); font-weight: 800; font-size: 12px; }
        .aha-chat-input { border-radius: var(--radius-pill); background: var(--bg-panel-soft); padding: 12px 14px; font-size: 13px; color: var(--text-muted); }

        .aha-game-shell {
          position: relative; overflow: hidden; border-radius: 34px; padding: 34px;
          background: radial-gradient(circle at 20% 30%, rgba(255,69,0,.18), transparent 34%), linear-gradient(145deg, #0a0502, #101827);
          box-shadow: 0 0 60px rgba(255,69,0,.16), var(--shadow-float);
          color: white;
        }
        .aha-game-grid { display: grid; grid-template-columns: 320px 1fr; gap: 26px; }
        .aha-driver-card, .aha-game-stage {
          border: 1px solid rgba(255,255,255,.08); border-radius: 28px; background: rgba(255,255,255,.045); padding: 22px;
          backdrop-filter: blur(12px);
        }
        .aha-driver-portrait {
          aspect-ratio: 3 / 4; border-radius: 22px; margin-bottom: 18px;
          background: radial-gradient(circle at 50% 28%, rgba(255,120,40,.42), transparent 30%), linear-gradient(160deg, #1f130c, #070402);
        }
        .aha-skill-track { height: 5px; background: rgba(255,255,255,.1); border-radius: 99px; overflow: hidden; }
        .aha-skill-fill { height: 100%; background: linear-gradient(90deg, #ff4500, #ff9b22); box-shadow: 0 0 8px rgba(255,69,0,.5); }
        .aha-game-stage { min-height: 360px; background: linear-gradient(180deg, #0d1520, #060c15); }
        .aha-route-line { height: 12px; border-radius: 999px; background: linear-gradient(90deg, var(--accent-blue), var(--accent-green), var(--accent-amber)); margin: 22px 0; box-shadow: 0 0 28px rgba(37,99,235,.35); }
        .aha-game-meter { height: 12px; border-radius: 999px; background: rgba(255,255,255,.1); overflow: hidden; }
        .aha-game-meter span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #10b981, #3b82f6); }
        .aha-game-control { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }

        .aha-lead-panel {
          max-width: 920px; margin: 54px auto 0; padding: 34px; text-align: center;
          border: 1px solid rgba(255,255,255,.12); border-radius: 32px;
          background: linear-gradient(145deg, #061020, #0a1628); color: white; box-shadow: var(--shadow-float);
        }
        .aha-footer { margin-top: 46px; padding: 24px 0 8px; color: var(--text-muted); text-align: center; font-size: 13px; }

        @media (max-width: 960px) {
          .aha-nav-links { display: none; }
          .aha-hero { padding: 28px; }
          .aha-dashboard-canvas { position: relative; right: auto; top: auto; width: 100%; margin-top: 24px; }
          .aha-stat-grid, .aha-brand-strip, .aha-compat-shell, .aha-game-grid { grid-template-columns: 1fr; }
          .aha-compat-shell { display: grid; }
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
