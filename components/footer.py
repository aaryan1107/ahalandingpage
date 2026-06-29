import streamlit as st

from utils.whatsapp import WHATSAPP_LINK


def render_footer():
    st.markdown(
        f"""
        <footer class="aha-footer">
          <strong>AHA Automobiles</strong> - NexCruise smart car upgrades, cruise control, speed governor, Eco/Sport/City modes, and compatibility-led callbacks.
          <br/>Phone: 83069 24400 - Email: support@aha.store - WhatsApp: {WHATSAPP_LINK}
          <br/>Copyright 2026 AHA Automobiles. Streamlit funnel prototype for local demo.
        </footer>
        """,
        unsafe_allow_html=True,
    )
