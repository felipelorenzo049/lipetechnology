"use client";
import { useEffect, useState, useId } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** override desktop particle count */
  density?: number;
  /** override mobile particle count */
  mobileDensity?: number;
};

/**
 * Living, connected network background — nodes joined by thin lines that
 * react to the cursor. Tuned with the LIPE "Sinal" palette (cyan/blue/teal)
 * over the deep lab background. Respects prefers-reduced-motion and pauses
 * when the tab is hidden.
 */
export const ConnectedBackground = ({
  className,
  density = 70,
  mobileDensity = 28,
}: Props) => {
  const [init, setInit] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const id = useId();

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");
    setReduced(mqMotion.matches);
    setIsMobile(mqMobile.matches);
    const onMotion = (e: MediaQueryListEvent) => setReduced(e.matches);
    const onMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mqMotion.addEventListener("change", onMotion);
    mqMobile.addEventListener("change", onMobile);
    return () => {
      mqMotion.removeEventListener("change", onMotion);
      mqMobile.removeEventListener("change", onMobile);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, [reduced]);

  if (reduced) {
    // Static, subtle fallback — no animation
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          className,
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 30%, hsl(var(--primary) / 0.08), transparent 55%), radial-gradient(circle at 75% 70%, hsl(var(--secondary) / 0.06), transparent 55%)",
        }}
      />
    );
  }

  if (!init) return null;

  const count = isMobile ? mobileDensity : density;

  return (
    <Particles
      id={`connected-bg-${id}`}
      className={cn("absolute inset-0", className)}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        detectRetina: true,
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        interactivity: {
          events: {
            onHover: { enable: !isMobile, mode: "grab" },
            onClick: { enable: false, mode: "push" },
            resize: { enable: true } as any,
          },
          modes: {
            grab: {
              distance: 160,
              links: { opacity: 0.6 },
            },
          },
        },
        particles: {
          number: {
            value: count,
            density: { enable: true, width: 1200, height: 800 },
          },
          color: {
            value: ["#3B7DE8", "#2BB8A0", "#22D3EE"],
          },
          links: {
            enable: true,
            distance: 140,
            color: "#3B7DE8",
            opacity: 0.25,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            outModes: { default: "out" },
            random: false,
            straight: false,
          },
          opacity: {
            value: { min: 0.25, max: 0.7 },
          },
          size: {
            value: { min: 1, max: 2.4 },
          },
          shape: { type: "circle" },
        },
      }}
    />
  );
};

export default ConnectedBackground;
