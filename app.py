import streamlit as st

from components.brand_selector import render_brand_selector
from components.compatibility_workspace import render_compatibility_workspace
from components.dashboard_hero import render_dashboard_hero
from components.footer import render_footer
from components.header import render_header
from components.lead_capture import render_lead_capture
from components.minigame import render_minigame
from styles.theme import inject_global_styles
from utils.state import init_state


st.set_page_config(
    page_title="AHA NexCruise Compatibility OS",
    page_icon="AHA",
    layout="wide",
    initial_sidebar_state="collapsed",
)

inject_global_styles()
init_state()

render_header()
render_dashboard_hero()
render_brand_selector()
render_compatibility_workspace()
render_minigame()
render_lead_capture()
render_footer()
