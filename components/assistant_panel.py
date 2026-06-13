import streamlit as st


def render_assistant_panel(brand_data, selected_model):
    message = st.session_state.assistant_messages[-1]
    st.markdown(
        f"""
        <div class="aha-assistant-panel">
          <div style="display:flex;justify-content:space-between;gap:16px">
            <div><strong>AI Compatibility Assistant</strong><p style="font-size:12px;margin:5px 0">Online · vehicle profile loaded</p></div>
            <span class="aha-chip">×</span>
          </div>
          <p style="margin-top:14px">I've reviewed your selected <strong>{selected_model}</strong> profile.</p>
          <div class="aha-action-grid">
            <div class="aha-action-tile">Fit Analysis<br><small>{brand_data['metrics']['fit']}</small></div>
            <div class="aha-action-tile">Cable Match<br><small>Recommended</small></div>
            <div class="aha-action-tile">Install Risk<br><small>Low-Med</small></div>
            <div class="aha-action-tile">Recommendation<br><small>{brand_data['metrics']['confidence']}</small></div>
          </div>
          <div class="aha-chat-input">{message}</div>
        </div>
        """,
        unsafe_allow_html=True,
    )
