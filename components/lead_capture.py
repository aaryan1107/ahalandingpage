import streamlit as st

from data.vehicles import BRANDS


def render_lead_capture():
    selected_brand = st.session_state.selected_brand
    selected_model = st.session_state.selected_model
    st.markdown(
        f"""
        <section class="aha-lead-panel">
          <div class="aha-kicker">Request callback</div>
          <h2>Confirm NexCruise fitment for your {selected_model}.</h2>
          <p style="color:rgba(255,255,255,.68)">Share contact details and AHA can verify variant year, transmission, installer route, and the right Basic or Smart variant.</p>
          <div class="aha-retarget-note">Meta Pixel events to map here: Lead, Used_Tool, BrandSelected, CompatibilityFormSubmitted, RequestCallbackSubmitted, WhatsAppClicked.</div>
        </section>
        """,
        unsafe_allow_html=True,
    )
    with st.container():
        col1, col2, col3 = st.columns(3)
        with col1:
            st.session_state.lead_name = st.text_input("Full name", value=st.session_state.lead_name)
        with col2:
            st.session_state.lead_phone = st.text_input("Phone number", value=st.session_state.lead_phone)
        with col3:
            preferred = st.selectbox("Car brand", list(BRANDS.keys()), index=list(BRANDS.keys()).index(selected_brand))
        col4, col5, col6 = st.columns(3)
        with col4:
            model = st.selectbox("Car model", BRANDS[preferred]["models"], index=0)
        with col5:
            city = st.text_input("City", value=st.session_state.selected_region if st.session_state.selected_region != "Other city" else "")
        with col6:
            contact_time = st.selectbox("Preferred contact time", ["Anytime", "Morning", "Afternoon", "Evening"])
        message = st.text_area("Requirement", value=f"I want to check NexCruise compatibility for my {preferred} {model}.")

        if st.button("Request premium callback", key="lead_submit"):
            st.success(f"Lead captured for {preferred} {model}. AHA Automobiles will contact you shortly.")
            st.caption("Backend/API point: send name, phone, city, model, contact time, and message to CRM or Google Sheets here.")
        st.markdown('<a class="aha-primary-btn" href="https://wa.me/91XXXXXXXXXX" target="_blank">Continue on WhatsApp</a>', unsafe_allow_html=True)
