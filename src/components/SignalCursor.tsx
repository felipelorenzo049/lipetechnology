import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * SignalCursor — custom dual cursor (dot + trailing ring) for the marketing
 * surface. Uses the "signal" cyan accent. Movement is an rAF lerp written to
 * the CSS `translate` property; hover scale/colour are gsap on `transform`.
 *
 * Disabled on coarse/touch pointers and prefers-reduced-motion (native cursor
 * left untouched). Text fields keep their caret.
 */
const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor]';

export const SignalCursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const style = document.createElement("style");
    style.setAttribute("data-signal-cursor", "");
    style.textContent =
      "*{cursor:none !important;}" +
      'input,textarea,select,[contenteditable="true"]{cursor:auto !important;}';
    document.head.appendChild(style);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const render = () => {
      dx += (mx - dx) * 0.35;
      dy += (my - dy) * 0.35;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.translate = `${dx}px ${dy}px`;
      ring.style.translate = `${rx}px ${ry}px`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    let shown = false;
    const reveal = () => {
      if (shown) return;
      shown = true;
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      reveal();
      mx = e.clientX;
      my = e.clientY;
    };

    const hover = (active: boolean) => {
      gsap.to(ring, {
        scale: active ? 1.9 : 1,
        borderColor: active ? "rgba(26,236,255,0.9)" : "rgba(26,236,255,0.35)",
        backgroundColor: active ? "rgba(26,236,255,0.08)" : "rgba(26,236,255,0)",
        duration: 0.3,
        ease: "power3",
        overwrite: "auto",
      });
      gsap.to(dot, { scale: active ? 0 : 1, duration: 0.25, ease: "power3", overwrite: "auto" });
    };

    const onOver = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(INTERACTIVE)) hover(true);
    };
    const onOut = (e: PointerEvent) => {
      const from = (e.target as Element)?.closest?.(INTERACTIVE);
      const to = (e.relatedTarget as Element)?.closest?.(INTERACTIVE);
      if (from && from !== to) hover(false);
    };

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.18, overwrite: "auto" });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3, overwrite: "auto" });
    const onLeave = () => {
      shown = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.25, overwrite: "auto" });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("color: "rgba(26,236,255,0.35)",
        mixBlendMode: "screen",
        willChange: "translate, transform",
      }}
    />
    <div
      ref={dotRef}
      className="fixed left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full opacity-0"
      style={{
        backgroundColor: "#1AECFF",
        boxShadow: "0 0 12px rgba(26,236,255,0.85)",
        willChange: "translate, transform",
      }}
    />
  </div>
);
};

export default SignalCursor;
