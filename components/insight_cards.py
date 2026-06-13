import streamlit as st


def render_metric_card(label, value, detail, tone="blue"):
    st.markdown(
        f"""
        <div class="aha-stat-card">
          <div class="aha-stat-value">{value}</div>
          <div class="aha-stat-label">{label}</div>
          <p style="margin:.35rem 0 0;font-size:12px">{detail}</p>
        </div>
        """,
        unsafe_allow_html=True,
    )


def render_reason_card(title, body, status="positive"):
    color = {"positive": "#10B981", "warning": "#F59E0B", "negative": "#EF4444", "info": "#2563EB"}.get(status, "#2563EB")
    st.markdown(
        f"""
        <div class="aha-reason-card" style="border-left:3px solid {color}">
          <strong>{title}</strong>
          <p style="margin:6px 0 0;font-size:12px">{body}</p>
        </div>
        """,
        unsafe_allow_html=True,
    )


def render_recommendation_chip(text, tone="neutral"):
    st.markdown(f"""<span class="aha-chip">{text}</span>""", unsafe_allow_html=True)


def render_score_ring(score, label):
    st.markdown(
        f"""
        <div class="aha-score-ring" style="--score:{score}">
          <div class="aha-score-ring-inner">{score}</div>
        </div>
        <p style="text-align:center;margin-top:-4px;font-weight:800;color:var(--text-muted)">{label}</p>
        """,
        unsafe_allow_html=True,
    )
