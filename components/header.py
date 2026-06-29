import streamlit as st


def render_header():
    st.markdown(
        """
        <nav class="aha-nav">
          <div class="aha-logo">
            <div class="aha-logo-mark">AHA</div>
            <div>
              <div>AHA Automobiles</div>
              <small style="color:var(--text-muted);font-weight:800">NexCruise compatibility OS</small>
            </div>
          </div>
          <div class="aha-nav-links">
            <span>Brands</span><span>Compatibility</span><span>Owners</span><span>Videos</span><span>Callback</span>
          </div>
          <div class="aha-status-pill">Live AHA fitment funnel</div>
        </nav>
        """,
        unsafe_allow_html=True,
    )
