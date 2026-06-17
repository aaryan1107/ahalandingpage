import streamlit as st

from components.dashboard_hero import render_dynamic_vehicle


def render_vehicle_showcase(selected_brand, brand_data, selected_model):
    metrics = brand_data["metrics"]
    vehicle_visual = render_dynamic_vehicle(selected_brand, selected_model, brand_data, surface="compatibility")
    st.markdown(
        f"""
        <div class="aha-showcase" style="--brand-accent:{brand_data['accent']}">
          <div class="aha-showcase-road"></div>
          {vehicle_visual}
          <div class="aha-showcase-metrics">
            <span class="aha-chip">{metrics['price']}</span>
            <span class="aha-chip">{metrics['install']} install</span>
            <span class="aha-chip">{metrics['confidence']} confidence</span>
          </div>
        </div>
        """,
        unsafe_allow_html=True,
    )
