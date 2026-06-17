import streamlit as st
from urllib.parse import urlencode

from data.vehicles import BRANDS


def render_brand_selector():
    st.markdown(
        """
        <div class="aha-section-title">
          <div class="aha-kicker">Brand-specific experience</div>
          <h2>AHA stays constant. The garage adapts to your car.</h2>
          <p>Select a brand to update logos, models, fit confidence, fleet copy, and the compatibility path.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    cols = st.columns(4)
    for index, (name, data) in enumerate(BRANDS.items()):
        active = name == st.session_state.selected_brand
        with cols[index % 4]:
            params = dict(st.query_params)
            params["brand"] = name
            params["model"] = data["models"][0]
            href = f"?{urlencode(params, doseq=True)}#compatibility"
            st.markdown(
                f"""
                <a class="aha-brand-card aha-brand-button {'aha-brand-card-active' if active else ''}" href="{href}" target="_self" style="--brand-accent:{data['accent']}">
                  <div class="aha-brand-mark" style="--brand-accent:{data['accent']}"><img src="{data['logo']}" alt="{name} logo" /></div>
                  <strong>{name}</strong>
                  <p style="font-size:12px;margin:6px 0">{data['fleet']}</p>
                  <span class="aha-chip">{data['metrics']['confidence']} confidence</span>
                </a>
                """,
                unsafe_allow_html=True,
            )
