import streamlit as st


def render_dashboard_hero():
    st.markdown(
        """
        <section class="aha-hero">
          <div class="aha-hero-copy">
            <div class="aha-kicker">NexCruise by AHA Automobiles</div>
            <h1>Your next highway drive. No leg pain. No fatigue stops.</h1>
            <p>Plug-and-play cruise control, Eco/Sport/City drive modes, and speed governor support for compatible Indian cars.</p>
            <p class="aha-punchline">When cruise mode sets in... AHA.</p>
            <a class="aha-primary-btn" href="#compatibility">Check Compatibility</a>
            <a class="aha-secondary-btn" href="https://wa.me/91XXXXXXXXXX" target="_blank">WhatsApp AHA</a>
          </div>
          <div class="aha-dashboard-canvas">
            <div class="aha-vehicle-stage"></div>
            <div class="aha-floating-card">
              <strong>NexCruise Smart</strong>
              <p style="margin:8px 0 0">Cruise control, Eco mode, Sport mode, City mode, resume after braking, and speed governor.</p>
            </div>
          </div>
          <div class="aha-stat-grid">
            <div class="aha-stat-card"><div class="aha-stat-value">4K+</div><div class="aha-stat-label">Drives transformed</div></div>
            <div class="aha-stat-card"><div class="aha-stat-value">30m</div><div class="aha-stat-label">Plug-play install</div></div>
            <div class="aha-stat-card"><div class="aha-stat-value">50+</div><div class="aha-stat-label">Installer cities</div></div>
            <div class="aha-stat-card"><div class="aha-stat-value">Rs19K</div><div class="aha-stat-label">Starting price</div></div>
          </div>
        </section>
        """,
        unsafe_allow_html=True,
    )
