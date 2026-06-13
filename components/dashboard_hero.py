import streamlit as st


def render_dashboard_hero():
    st.markdown(
        """
        <section class="aha-hero">
          <div class="aha-hero-copy">
            <div class="aha-kicker">AI mobility workspace</div>
            <h1>Drive Intelligence. Match Your Car Perfectly.</h1>
            <p>Verify compatibility, understand install confidence, and move from browsing to a precise AHA NexCruise recommendation.</p>
            <a class="aha-primary-btn" href="#compatibility">Check Compatibility</a>
            <a class="aha-secondary-btn" href="#system">Explore System</a>
          </div>
          <div class="aha-dashboard-canvas">
            <div class="aha-vehicle-stage"></div>
            <div class="aha-floating-card">
              <strong>AI Fit Signal</strong>
              <p style="margin:8px 0 0">Model profile, region support, install readiness and recommendation confidence are live.</p>
            </div>
          </div>
          <div class="aha-stat-grid">
            <div class="aha-stat-card"><div class="aha-stat-value">94%</div><div class="aha-stat-label">Compatibility Accuracy</div></div>
            <div class="aha-stat-card"><div class="aha-stat-value">8+</div><div class="aha-stat-label">Supported Brands</div></div>
            <div class="aha-stat-card"><div class="aha-stat-value">30m</div><div class="aha-stat-label">Install Confidence</div></div>
            <div class="aha-stat-card"><div class="aha-stat-value">AI</div><div class="aha-stat-label">Smart Recommendations</div></div>
          </div>
        </section>
        """,
        unsafe_allow_html=True,
    )
