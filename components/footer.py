import streamlit as st


def render_footer():
    st.markdown(
        """
        <footer class="aha-footer">
          <strong>AHA NexCruise</strong> · Smart compatibility, installer confidence, and premium drive intelligence.
          <br/>Copyright 2026 AHA Automobiles. Dashboard prototype for local demo.
        </footer>
        """,
        unsafe_allow_html=True,
    )
