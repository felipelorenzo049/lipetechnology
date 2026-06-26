const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/**
 * AtmosphereOverlay — fixed, non-interactive atmosphere layered over the
 * AuroraField but beneath page content: a faint film grain (kills the flat
 * digital look) plus a soft cinematic vignette. Pure CSS, zero JS cost.
 */
const AtmosphereOverlay = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-[5]">
    <div
      className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
      style={{
        backgroundImage: `url("${GRAIN_SVG}")`,
        backgroundSize: "200px 200px",
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 28%, transparent 52%, rgba(2,4,9,0.55) 100%)",
      }}
    />
  </div>
);

export default AtmosphereOverlay;
