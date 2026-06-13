import streamlit as st

from data.vehicles import BRANDS


def render_lead_capture():
    st.markdown(
        """
        <section class="aha-lead-panel">
          <div class="aha-kicker">Final recommendation</div>
          <h2>Get a compatibility recommendation tailored to your exact vehicle.</h2>
          <p style="color:rgba(255,255,255,.65)">Share your contact details and the AHA team can confirm fitment, installer route, and the best NexCruise variant.</p>
        </section>
        """,
        unsafe_allow_html=True,
    )
    with st.container():
        col1, col2, col3 = st.columns(3)
        with col1:
            st.session_state.lead_name = st.text_input("Name", value=st.session_state.lead_name)
        with col2:
            st.session_state.lead_phone = st.text_input("Phone", value=st.session_state.lead_phone)
        with col3:
            preferred = st.selectbox("Preferred brand", list(BRANDS.keys()))
        if st.button("Request premium callback", key="lead_submit"):
            st.success(f"Request captured for {preferred}. AHA Automobiles will contact you shortly.")
        st.markdown('<a class="aha-primary-btn" href="https://wa.me/91XXXXXXXXXX" target="_blank">Chat on WhatsApp</a>', unsafe_allow_html=True)
