import streamlit as st


VIDEOS = [
    ("GxAH4LcJVbk", "Full install and demo - Aha! Car.OS Explained", "8:55"),
    ("rlrIGqnEPDM", "For better performance, choose Aha NexCruise", "0:43"),
    ("8fNHTVPz7JU", "World's First Adaptive Speed Limit - No More Challans", "10:29"),
    ("8D1yLErzi_c", "NexCruise Basic - Full Demo", "Basic"),
    ("rH7ape15Dq0", "NexCruise Smart - Full Demo", "Smart"),
]

INSTALL_STEPS = [
    ("01", "Unbox NexCruise + your car's cable set", "Each order includes a car-specific accelerator pedal cable."),
    ("02", "Connect to the accelerator pedal", "Plug the NexCruise coupler in-line. No cuts, no permanent changes."),
    ("03", "Plug into the OBD port", "Found under the dashboard on the driver's side."),
    ("04", "Mount the dial + pair via Bluetooth", "Stick the control dial on the steering column and pair quickly."),
    ("05", "Drive. Set your speed. Done.", "Hit 40 km/h, press Set, and let NexCruise hold the speed."),
]

FOUNDERS = [
    ("Aakash Sharma", "Founder & CEO", "https://ahanexcruise.com/nexcruise-assets/nexcruise-founder-aakash.png", "Gold medallist from MNIT Jaipur and hardware founder behind 4,000+ NexCruise installations."),
    ("Krishna Koravadi", "Co-Founder", "https://ahanexcruise.com/nexcruise-assets/nexcruise-founder-krishna.png", "20+ years in automotive ADAS, 20+ US patents, and ISO 26262 safety committee experience."),
]

TESTIMONIALS = [
    ("umahesh612", "Honda Amaze 2023 VX CVT", "All I need to say is that my right foot can rest easy on long drives.", "Team-BHP"),
    ("sumeethaldankar", "Maruti Swift 2019, Mumbai", "There was no cutting of wires and the device fitted neatly under the dashboard and was ready to use in just 30 mins.", "Team-BHP"),
    ("Kernelmann", "Tata Nexon EV, Chennai", "Having installed and driven with the NexCruise, it has transformed my highway driving experience completely.", "Nexon EV Owners Club"),
]

VALUE_POINTS = [
    ("Less fatigue", "Cruise holds speed so the right foot is not working the whole highway."),
    ("Smoother mileage habits", "Eco mode reduces sharp throttle spikes that waste fuel."),
    ("Safer family limits", "Speed governor can cap top speed for family cars and fleets."),
    ("One upgrade, many years", "Transfer the unit to another compatible car with a new cable set."),
]


def render_live_content():
    testimonials_html = "".join(
        f"""
        <article class="aha-testimonial-card">
          <p>"{quote}"</p>
          <strong>{name}</strong>
          <span>{car} - {source}</span>
        </article>
        """
        for name, car, quote, source in TESTIMONIALS
    )
    value_html = "".join(
        f"""
        <article>
          <strong>{title}</strong>
          <p>{body}</p>
        </article>
        """
        for title, body in VALUE_POINTS
    )
    st.markdown(
        f"""
        <section class="aha-live-section">
          <div class="aha-kicker">Owner proof</div>
          <h2>4,000+ cars. Keep the buyer proof close to the fitment workflow.</h2>
          <p>NexCruise is not a generic accessory page. It has owner reviews, installation stories, safety questions, support expectations, and variant decisions that should stay visible while the user checks compatibility.</p>
          <div class="aha-testimonial-grid">{testimonials_html}</div>
          <div class="aha-value-grid">{value_html}</div>
        </section>
        """,
        unsafe_allow_html=True,
    )

    st.markdown(
        """
        <section class="aha-live-section">
          <div class="aha-kicker">Official AHA films</div>
          <h2>Watch the product in motion before the fitment call.</h2>
          <p>Installation walkthroughs, Basic and Smart demos, and the adaptive speed-limit story are embedded inside the Streamlit prototype so the sales workflow does not break into scattered tabs.</p>
        </section>
        """,
        unsafe_allow_html=True,
    )

    rows = [VIDEOS[:3], VIDEOS[3:]]
    for row in rows:
        cols = st.columns(len(row))
        for col, (video_id, title, duration) in zip(cols, row):
            with col:
                st.video(f"https://www.youtube.com/watch?v={video_id}")
                st.markdown(
                    f"""
                    <div class="aha-video-copy">
                      <span>{duration}</span>
                      <h3>{title}</h3>
                    </div>
                    """,
                    unsafe_allow_html=True,
                )

    steps_html = "".join(
        f"""
        <div class="aha-install-row">
          <span>{num}</span>
          <div><h3>{title}</h3><p>{body}</p></div>
        </div>
        """
        for num, title, body in INSTALL_STEPS
    )
    st.markdown(
        f"""
        <section class="aha-glass-panel">
          <div class="aha-kicker">Setup in 20 minutes</div>
          <h2>No wire cutting. No drilling. Fully reversible.</h2>
          <div class="aha-install-grid">{steps_html}</div>
        </section>
        """,
        unsafe_allow_html=True,
    )

    st.markdown(
        """
        <section class="aha-variant-grid">
          <article class="aha-variant-card">
            <span>Essential upgrade</span>
            <h3>NexCruise Basic</h3>
            <strong>Rs 19,990</strong>
            <p>Cruise control from 15 km/h, one-touch resume, brake override, iCAT certification, and car-specific cable.</p>
          </article>
          <article class="aha-variant-card featured">
            <span>Most popular</span>
            <h3>NexCruise Smart</h3>
            <strong>Rs 27,490</strong>
            <p>Everything in Basic plus Eco, City and Sport modes, speed governor, wireless steering dial, and OTA updates.</p>
          </article>
        </section>
        """,
        unsafe_allow_html=True,
    )

    founders_html = "".join(
        f"""
        <article class="aha-founder-card">
          <img src="{image}" alt="{name}" />
          <div><span>{role}</span><h3>{name}</h3><p>{bio}</p></div>
        </article>
        """
        for name, role, image, bio in FOUNDERS
    )
    st.markdown(
        f"""
        <section class="aha-glass-panel">
          <div class="aha-kicker">Who builds NexCruise</div>
          <h2>Built by automotive and hardware people.</h2>
          <div class="aha-founder-grid">{founders_html}</div>
          <div class="aha-press-strip">
            <a href="https://thebetterindia.com/279528/aha-nexacruise-plug-and-play-tata-nexon-ev-increases-battery-range/" target="_blank">The Better India</a>
            <a href="https://www.team-bhp.com/news/installed-aha-nexcruise-cruise-control-device-my-maruti-swift" target="_blank">Team-BHP</a>
            <a href="https://www.nexonevowners.club/the-aha-nexcruise-saga" target="_blank">Nexon EV Owners Club</a>
            <a href="https://www.youtube.com/@ahainnovations" target="_blank">AHA YouTube</a>
          </div>
        </section>
        """,
        unsafe_allow_html=True,
    )
