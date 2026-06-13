import streamlit as st


def render_vehicle_showcase(brand_data, selected_model):
    metrics = brand_data["metrics"]
    st.markdown(
        f"""
        <div class="aha-showcase">
          <div class="aha-road"></div>
          <div class="aha-car-top"></div>
          <div class="aha-floating-card" style="right:18px;top:18px;width:210px">
            <span class="aha-chip">{brand_data['metrics']['fit']} fit</span>
            <h3 style="margin:12px 0 4px">{selected_model}</h3>
            <p style="font-size:13px">{brand_data['tone']}</p>
          </div>
          <div style="position:absolute;left:18px;bottom:18px;display:flex;gap:10px;flex-wrap:wrap">
            <span class="aha-chip">Range {metrics['range']}</span>
            <span class="aha-chip">Charge {metrics['charge']}</span>
            <span class="aha-chip">Confidence {metrics['confidence']}</span>
          </div>
        </div>
        """,
        unsafe_allow_html=True,
    )
