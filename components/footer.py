import streamlit as st


def render_footer():
    st.markdown(
        """
        <footer class="aha-footer">
          <strong>AHA Automobiles</strong> - NexCruise smart car upgrades, cruise control, speed governor, Eco/Sport/City modes, and compatibility-led callbacks.
          <br/>Phone: 80039 44400 - Email: support@aha.store - WhatsApp placeholder: https://wa.me/91XXXXXXXXXX
          <br/>Copyright 2026 AHA Automobiles. Streamlit funnel prototype for local demo.
        </footer>
        """,
        unsafe_allow_html=True,
    )
