import streamlit as st


def render_header():
    st.markdown(
        """
        <nav class="aha-nav">
          <div class="aha-logo">
            <div class="aha-logo-mark">AHA</div>
            <div>
              <div>AHA NexCruise</div>
              <small style="color:var(--text-muted);font-weight:800">Compatibility OS</small>
            </div>
          </div>
          <div class="aha-nav-links">
            <span>Dashboard</span><span>Compatibility</span><span>Intelligence</span><span>Game</span><span>Contact</span>
          </div>
          <div class="aha-status-pill">● Live Compatibility Engine</div>
        </nav>
        """,
        unsafe_allow_html=True,
    )
