/// <reference types="@react-three/fiber" />
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const BASE_HEX = "#05080F";

const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uScroll;

  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                    + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p){
    float s = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { s += a * snoise(p); p *= 2.0; a *= 0.5; }
    return s;
  }

  void main(){
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv - 0.5);
    p.x *= aspect;

    // depth parallax from pointer + scroll
    p += uMouse * 0.05;
    float t = uTime * 0.035;
    float scr = uScroll;
    p.y += scr * 0.35;
    p *= 0.72;

    // domain-warped flow
    vec2 q = vec2(fbm(p*1.1 + vec2(0.0, t)),
                  fbm(p*1.1 + vec2(4.7, -t*0.8)));
    vec2 r = vec2(fbm(p*1.1 + 1.6*q + vec2(1.7, 9.2) + t*0.12),
                  fbm(p*1.1 + 1.6*q + vec2(8.3, 2.8) - t*0.10));
    float f = fbm(p*1.1 + 1.8*r);

    float v = clamp(f*0.5 + 0.5, 0.0, 1.0);
    float ridge = clamp(length(r), 0.0, 1.4);

    vec3 base = vec3(0.016, 0.027, 0.055);
    vec3 blue = vec3(0.231, 0.490, 0.910);
    vec3 teal = vec3(0.169, 0.722, 0.627);
    vec3 cyan = vec3(0.102, 0.925, 1.000);

    vec3 col = base;
    col = mix(col, blue, smoothstep(0.40, 0.80, v) * 0.50);
    col = mix(col, teal, smoothstep(0.60, 0.92, v) * 0.32);
    col += cyan * smoothstep(0.86, 1.0, v) * ridge * 0.16;

    // depth shading: lows sink to base
    col *= 0.45 + 0.55 * v;

    // per-section mood drift with scroll
    col *= 0.90 + 0.12 * sin(scr * 6.2831 * 1.5 + 1.0);

    // vignette
    vec2 vv = (uv - 0.5) * vec2(aspect, 1.0);
    float vig = smoothstep(1.15, 0.20, length(vv));
    col *= mix(0.40, 1.0, vig);

    // keep it premium-dark
    col = mix(base, col, 0.82);
    col *= 0.74;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const AuroraPlane = ({ reduced }: { reduced: boolean }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, invalidate } = useThree();
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const scroll = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    }),
    [],
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
    if (reduced) invalidate();
  }, [size, uniforms, reduced, invalidate]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      scroll.current = Math.min(1, Math.max(0, (window.scrollY || 0) / max));
      if (reduced) invalidate();
    };
    onScroll();
    if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced, invalidate]);

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.04;
    mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.04;
    m.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
    m.uniforms.uScroll.value +=
      (scroll.current - m.uniforms.uScroll.value) * 0.08;
    if (!reduced) m.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const props: any = {
    ref: matRef,
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms,
    depthTest: false,
    depthWrite: false,
  };
  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial {...props} />
    </mesh>
  );
};

const webglAvailable = () => {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
};

const CssFallback = () => (
  <div
    aria-hidden
    className="fixed inset-0 z-0 pointer-events-none"
    style={{
      background: `
        radial-gradient(60% 50% at 20% 18%, rgba(59,125,232,0.18), transparent 70%),
        radial-gradient(55% 45% at 82% 30%, rgba(43,184,160,0.16), transparent 70%),
        radial-gradient(75% 60% at 50% 92%, rgba(26,236,255,0.10), transparent 72%),
        ${BASE_HEX}`,
    }}
  />
);

/**
 * AuroraField — full-page WebGL background. A flowing, domain-warped aurora
 * (blue -> teal -> cyan over a deep base) with pointer + scroll parallax.
 * Fixed behind all content. Falls back to a static CSS mesh when WebGL is
 * unavailable, and renders a single still frame under reduced-motion.
 */
const AuroraField = () => {
  const reduced = useReducedMotion();
  const [ok, setOk] = useState<boolean | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setOk(webglAvailable());
  }, []);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (ok === false) return <CssFallback />;
  if (ok === null)
    return (
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: BASE_HEX }}
      />
    );

  const frameloop = reduced ? "demand" : hidden ? "never" : "always";
  const isSmall = typeof window !== "undefined" && window.innerWidth < 768;
  const dpr = isSmall ? 0.6 : Math.min(window.devicePixelRatio || 1, 1.25);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: BASE_HEX }}
    >
      <Canvas
        frameloop={frameloop}
        dpr={dpr}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(BASE_HEX), 1)}
      >
        <AuroraPlane reduced={!!reduced} />
      </Canvas>
    </div>
  );
};

export default AuroraField;
