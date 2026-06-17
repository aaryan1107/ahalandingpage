import html
import textwrap
from pathlib import Path

import streamlit as st

from data.vehicles import BRANDS


MODEL_FILES = {
    ("Tata", "Nexon"): "tata-nexon.glb",
    ("Tata", "Punch"): "tata_punch.glb",
    ("Tata", "Safari"): "tata-safari.glb",
}


def _vehicle_class(model):
    model_lower = model.lower()
    if any(word in model_lower for word in ["innova", "carens", "marazzo", "rumion", "xl6", "ertiga", "carnival"]):
        return "mpv"
    if any(word in model_lower for word in ["city", "verna", "amaze", "civic", "camry", "ciaz", "dzire", "tigor", "aura"]):
        return "sedan"
    if any(word in model_lower for word in ["swift", "baleno", "i20", "altroz", "tiago", "glanza", "jazz", "wagonr", "ignis"]):
        return "hatch"
    return "suv"


def _model_url(brand, model):
    filename = MODEL_FILES.get((brand, model))
    if not filename:
        return ""
    model_path = Path(__file__).resolve().parents[1] / "static" / "models" / filename
    if not model_path.exists():
        return ""
    return f"/app/static/models/{filename}"


def _render_vehicle_visual(selected_brand, selected_model, brand, vehicle_class, surface="hero"):
    model_src = _model_url(selected_brand, selected_model)
    if model_src:
        if surface == "compatibility":
            camera_orbit = "0deg 0deg 185%"
            field_of_view = "34deg"
            plate_class = "aha-real-model-plate aha-compat-model-plate"
        else:
            camera_orbit = "90deg 82deg 78%"
            field_of_view = "20deg"
            plate_class = "aha-real-model-plate"
        iframe_doc = html.escape(
            f"""
            <!doctype html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
                <style>
                  html, body {{
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    overflow: hidden;
                    background: transparent;
                  }}
                  model-viewer {{
                    width: 100%;
                    height: 100%;
                    min-height: 360px;
                    --poster-color: transparent;
                    background: transparent;
                    filter: drop-shadow(0 34px 52px rgba(0,0,0,.42));
                  }}
                </style>
              </head>
              <body>
                <model-viewer
                  src="{model_src}"
                  exposure="1.12"
                  shadow-intensity="0.85"
                  camera-orbit="{camera_orbit}"
                  field-of-view="{field_of_view}"
                  min-camera-orbit="{camera_orbit}"
                  max-camera-orbit="{camera_orbit}"
                  interaction-prompt="none"
                  disable-pan
                  disable-zoom
                  disable-tap
                ></model-viewer>
              </body>
            </html>
            """,
            quote=True,
        )
        return textwrap.dedent(f"""
            <div class="aha-model-stage">
              <iframe class="aha-model-iframe" title="{selected_brand} {selected_model} 3D model" srcdoc="{iframe_doc}"></iframe>
              <div class="aha-car-nameplate {plate_class}">{selected_brand} {selected_model}</div>
            </div>
        """).strip()
    return textwrap.dedent(f"""
            <div class="aha-vehicle-stage aha-vehicle-{vehicle_class}">
              <div class="aha-car-shadow"></div>
              <div class="aha-car-body">
                <div class="aha-car-nose"></div>
                <div class="aha-car-cabin">
                  <div class="aha-car-window aha-window-front"></div>
                  <div class="aha-car-window aha-window-rear"></div>
                </div>
                <div class="aha-car-hood"></div>
                <div class="aha-car-light aha-light-front"></div>
                <div class="aha-car-light aha-light-rear"></div>
                <div class="aha-car-wheel aha-wheel-front"><span></span></div>
                <div class="aha-car-wheel aha-wheel-rear"><span></span></div>
              </div>
              <div class="aha-car-nameplate">{selected_brand} {selected_model}</div>
            </div>
    """).strip()


def render_dynamic_vehicle(selected_brand, selected_model, brand, surface="hero"):
    return _render_vehicle_visual(
        selected_brand,
        selected_model,
        brand,
        _vehicle_class(selected_model),
        surface=surface,
    )


def render_dashboard_hero():
    utm = st.session_state.get("utm_context", {})
    selected_brand = st.session_state.get("selected_brand", "Tata")
    selected_model = st.session_state.get("selected_model", BRANDS[selected_brand]["hero"])
    brand = BRANDS[selected_brand]
    vehicle_class = _vehicle_class(selected_model)
    headline = utm.get("headline", "Your next highway drive. No leg pain. No fatigue stops.")
    subcopy = utm.get(
        "subcopy",
        "Plug-and-play cruise control, Eco/Sport/City drive modes, and speed governor support for compatible Indian cars.",
    )
    cta = utm.get("cta", "Direct visitor")
    vehicle_visual = _render_vehicle_visual(selected_brand, selected_model, brand, vehicle_class)
    st.markdown(
        f"""
        <section class="aha-hero">
          <div class="aha-hero-copy">
            <div class="aha-kicker">NexCruise by AHA Automobiles - {cta}</div>
            <h1>{headline}</h1>
            <p>{subcopy}</p>
            <p class="aha-punchline">When cruise mode sets in... AHA.</p>
            <a class="aha-primary-btn" href="#compatibility">Check Compatibility</a>
            <a class="aha-secondary-btn" href="https://wa.me/91XXXXXXXXXX" target="_blank">WhatsApp AHA</a>
          </div>
          <div class="aha-dashboard-canvas" style="--brand-accent:{brand['accent']}">
            <div class="aha-hero-road">
              <span></span><span></span><span></span>
            </div>
            {vehicle_visual}
            <div class="aha-floating-card">
              <strong>NexCruise Smart</strong>
              <p style="margin:8px 0 0">Configured for {selected_brand} {selected_model}: cruise control, drive modes, resume after braking, and speed governor.</p>
            </div>
          </div>
          <div class="aha-stat-grid">
            <div class="aha-stat-card"><div class="aha-stat-value">4K+</div><div class="aha-stat-label">Drives transformed</div></div>
            <div class="aha-stat-card"><div class="aha-stat-value">30m</div><div class="aha-stat-label">Plug-play install</div></div>
            <div class="aha-stat-card"><div class="aha-stat-value">50+</div><div class="aha-stat-label">Installer cities</div></div>
            <div class="aha-stat-card"><div class="aha-stat-value">Rs19K</div><div class="aha-stat-label">Starting price</div></div>
          </div>
        </section>
        """,
        unsafe_allow_html=True,
    )
