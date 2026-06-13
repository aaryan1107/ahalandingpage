import streamlit as st

from utils.state import reset_game, update_game_score


def render_minigame():
    energy = st.session_state.game_energy
    score = st.session_state.game_score
    st.markdown(
        f"""
        <div class="aha-section-title">
          <div class="aha-kicker">Mini game</div>
          <h2>Charge Route Precision</h2>
          <p>Balance speed, energy, and route efficiency through an AI-assisted mobility simulation.</p>
        </div>
        <section class="aha-game-shell">
          <div class="aha-game-grid">
            <div class="aha-driver-card">
              <div class="aha-driver-portrait"></div>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <h3 style="color:white;margin:0">AHA Driver</h3>
                <span class="aha-chip" style="background:#ff4500;color:white;border:0">LEVEL 12</span>
              </div>
              <p style="color:rgba(255,255,255,.58)">Route intelligence profile</p>
              <small>Speed · {min(100, 50 + score)}%</small><div class="aha-skill-track"><div class="aha-skill-fill" style="width:{min(100, 50 + score)}%"></div></div>
              <small>Handling · 82%</small><div class="aha-skill-track"><div class="aha-skill-fill" style="width:82%"></div></div>
              <small>Endurance · {energy}%</small><div class="aha-skill-track"><div class="aha-skill-fill" style="width:{energy}%"></div></div>
              <div style="display:flex;justify-content:space-between;margin-top:18px;font-family:'IBM Plex Mono';font-size:13px">
                <span>Runs 48</span><span>Wins 31</span><span>Rating 4.7</span>
              </div>
            </div>
            <div class="aha-game-stage">
              <div style="display:flex;justify-content:space-between">
                <span class="aha-chip">SCORE {score}</span>
                <span class="aha-chip">ENERGY {energy}%</span>
              </div>
              <div class="aha-route-line"></div>
              <h3 style="color:white">Current decision: {st.session_state.game_route_choice}</h3>
              <p style="color:rgba(255,255,255,.62)">{st.session_state.game_feedback}</p>
              <div class="aha-game-meter"><span style="width:{energy}%"></span></div>
            </div>
          </div>
        </section>
        """,
        unsafe_allow_html=True,
    )

    c1, c2, c3, c4, c5 = st.columns(5)
    with c1:
        if st.button("Start Simulation", key="game_start"):
            st.session_state.game_started = True
            st.session_state.game_feedback = "Simulation active. Choose the next route strategy."
    with c2:
        if st.button("Eco Route", key="eco"):
            update_game_score("Eco Route")
    with c3:
        if st.button("Fast Route", key="fast"):
            update_game_score("Fast Route")
    with c4:
        if st.button("Smart Route", key="smart"):
            update_game_score("Smart Route")
    with c5:
        if st.button("Reset", key="game_reset"):
            reset_game()
