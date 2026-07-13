import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

// Driver-POV cockpit loop. The cockpit/dashboard stays stable while the road
// through the windshield appears to move continuously toward the viewer.
//
// Technique: two copies of the same cockpit plate run a linear forward zoom,
// offset by half the loop, crossfaded with triangle-wave opacity. Because both
// layers are the same image at slightly different scales, the crossfade is
// invisible and the push-in never ends — reading as steady forward motion.
// Passing-light streaks and a road shimmer sell speed without hurting text.

const LOOP = 270; // 9s at 30fps

function tri(t) {
  // 0 at cycle edges, 1 in the middle
  return 1 - Math.abs(2 * t - 1);
}

function ZoomLayer({ frame, offset }) {
  const t = ((frame + offset) % LOOP) / LOOP;
  const scale = interpolate(t, [0, 1], [1.05, 1.16]);
  const opacity = Math.min(1, tri(t) * 2.4);
  return (
    <AbsoluteFill style={{ opacity }}>
      <Img
        src={staticFile("hero/cockpit-source.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "62% center",
          transform: `scale(${scale})`,
          filter: "saturate(.68) contrast(1.08) brightness(.66)"
        }}
      />
    </AbsoluteFill>
  );
}

function LightStreak({ frame, period, offset, top, height, tint, peak }) {
  const t = ((frame + offset) % period) / period;
  const x = interpolate(t, [0, 1], [-30, 130]);
  const opacity = tri(t) * peak;
  return (
    <div
      style={{
        position: "absolute",
        top: `${top}%`,
        left: `${x}%`,
        width: "34%",
        height: `${height}%`,
        background: `linear-gradient(90deg, transparent, ${tint}, transparent)`,
        transform: "skewX(-24deg)",
        filter: "blur(26px)",
        opacity,
        mixBlendMode: "screen"
      }}
    />
  );
}

export function HeroProductFilm() {
  const frame = useCurrentFrame();
  // Barely-there cockpit sway so the cabin feels occupied, not frozen.
  const sway = Math.sin((frame / LOOP) * Math.PI * 4) * 4;
  const bob = Math.sin((frame / LOOP) * Math.PI * 6) * 2.5;

  return (
    <AbsoluteFill style={{ backgroundColor: "#001733", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `translate(${sway}px, ${bob}px) scale(1.02)` }}>
        <ZoomLayer frame={frame} offset={0} />
        <ZoomLayer frame={frame} offset={LOOP / 2} />
      </AbsoluteFill>

      {/* Passing highway lights across the windshield zone */}
      <LightStreak frame={frame} period={135} offset={0} top={6} height={30} tint="rgba(180,220,255,.55)" peak={0.16} />
      <LightStreak frame={frame} period={135} offset={62} top={14} height={22} tint="rgba(24,220,220,.4)" peak={0.1} />
      <LightStreak frame={frame} period={90} offset={30} top={2} height={16} tint="rgba(255,244,214,.5)" peak={0.12} />

      {/* Road shimmer near the dashboard base */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "18%",
          height: "10%",
          background: "linear-gradient(90deg, transparent 8%, rgba(140,190,255,.1) 42%, rgba(24,220,220,.08) 62%, transparent 92%)",
          filter: "blur(18px)",
          opacity: 0.5 + tri((frame % 90) / 90) * 0.3,
          mixBlendMode: "screen"
        }}
      />

      {/* Contrast scrims: heavy left for copy, grounded base */}
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(0,23,51,.94) 0%, rgba(0,23,51,.7) 34%, rgba(0,23,51,.14) 66%, rgba(0,23,51,.42) 100%)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(0,10,24,.85) 0%, transparent 38%, rgba(0,10,24,.3) 100%)" }} />
    </AbsoluteFill>
  );
}
