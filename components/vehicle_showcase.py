import streamlit as st


def render_vehicle_showcase(brand_data, selected_model):
    metrics = brand_data["metrics"]
    model_list = " / ".join(brand_data["models"][:5])
    st.markdown(
        f"""
        <div class="aha-showcase" style="--brand-accent:{brand_data['accent']}">
          <div class="aha-road"></div>
          <div class="aha-car-top"></div>
          <div class="aha-floating-card" style="right:18px;top:18px;width:220px">
            <span class="aha-chip">{metrics['fit']} fit</span>
            <h3 style="margin:12px 0 4px">AHA for {selected_model}</h3>
            <p style="font-size:13px">{brand_data['tone']}</p>
          </div>
          <div style="position:absolute;left:18px;bottom:18px;display:flex;gap:10px;flex-wrap:wrap">
            <span class="aha-chip">{metrics['price']}</span>
            <span class="aha-chip">{metrics['install']} install</span>
            <span class="aha-chip">{metrics['confidence']} confidence</span>
          </div>
          <div class="aha-model-strip">{model_list}</div>
        </div>
        """,
        unsafe_allow_html=True,
    )
