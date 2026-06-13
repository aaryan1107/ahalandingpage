import streamlit as st

from utils.state import reset_game, update_game_score


def render_minigame():
    energy = st.session_state.game_energy
    score = st.session_state.game_score
    zone_width = min(100, max(12, energy))
    st.markdown(
        f"""
        <div class="aha-section-title">
          <div class="aha-kicker">Mini game</div>
          <h2>AHA Cruise Challenge</h2>
          <p>Activate the drive mode, balance comfort and response, and land inside the AHA zone.</p>
        </div>
        <section class="aha-game-shell">
          <div class="aha-game-grid">
            <div class="aha-driver-card">
              <div class="aha-driver-portrait"></div>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <h3 style="color:white;margin:0">NexCruise Driver</h3>
                <span class="aha-chip" style="background:#2f6fed;color:white;border:0">AHA MODE</span>
              </div>
              <p style="color:rgba(255,255,255,.62)">Long-drive comfort profile</p>
              <small>Comfort - {min(100, 50 + score)}%</small><div class="aha-skill-track"><div class="aha-skill-fill" style="width:{min(100, 50 + score)}%"></div></div>
              <small>Response - 82%</small><div class="aha-skill-track"><div class="aha-skill-fill" style="width:82%"></div></div>
              <small>Energy - {energy}%</small><div class="aha-skill-track"><div class="aha-skill-fill" style="width:{energy}%"></div></div>
              <div style="display:flex;justify-content:space-between;margin-top:18px;font-family:'IBM Plex Mono';font-size:13px">
                <span>Modes 3</span><span>Override ON</span><span>Trial 7D</span>
              </div>
            </div>
            <div class="aha-game-stage">
              <div style="display:flex;justify-content:space-between">
                <span class="aha-chip">SCORE {score}</span>
                <span class="aha-chip">COMFORT {energy}%</span>
              </div>
              <div class="aha-route-line"></div>
              <h3 style="color:white">Current decision: {st.session_state.game_route_choice}</h3>
              <p style="color:rgba(255,255,255,.66)">{st.session_state.game_feedback}</p>
              <div class="aha-game-meter"><span style="width:{zone_width}%"></span></div>
            </div>
          </div>
        </section>
        """,
        unsafe_allow_html=True,
    )

    c1, c2, c3, c4, c5 = st.columns(5)
    with c1:
        if st.button("Start NexCruise", key="game_start"):
            st.session_state.game_started = True
            st.session_state.game_feedback = "Cruise mode armed. Choose the drive response."
    with c2:
        if st.button("Eco Mode", key="eco"):
            update_game_score("Eco Mode")
    with c3:
        if st.button("Sport Mode", key="sport"):
            update_game_score("Sport Mode")
    with c4:
        if st.button("AHA Zone", key="smart"):
            update_game_score("AHA Zone")
    with c5:
        if st.button("Reset", key="game_reset"):
            reset_game()
