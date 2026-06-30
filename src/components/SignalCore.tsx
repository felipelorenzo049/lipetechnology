/// <reference types="@react-three/fiber" />
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

const COUNT = 2800;

const VERT = `
  uniform float uTime;
  uniform float uHead;
  uniform float uRadius;
  uniform float uStream;
  uniform vec3  uFreq;
  uniform vec3  uPhase;
  uniform float uPixelRatio;
  attribute float aT;
  varying float vT;
  varying float vHead;
  void main() {
    vT = aT;
    float theta = aT * 6.2831853 * 3.0;
    float breathe = 0.97 + 0.03 * sin(uTime * 0.5);
    vec3 p = vec3(
      sin(uFreq.x * theta + uPhase.x),
      sin(uFreq.y * theta + uPhase.y),
      sin(uFreq.z * theta + uPhase.z)
    );
    p *= uRadius * breathe;
    float s = uStream;
    p.x *= (1.0 - s);
    p.z *= (1.0 - s);
    p.y = mix(p.y, -1.15 - aT * 4.5, s);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float d = abs(aT - uHead);
    d = min(d, 1.0 - d);
    float head = smoothstep(0.05, 0.0, d);
    vHead = head;
    float size = 2.2 + head * 6.0;
    gl_PointSize = size * uPixelRatio * (4.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = `
  uniform float uOpacity;
  varying float vT;
  varying float vHead;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float a = smoothstep(0.5, 0.0, length(uv));
    if (a <= 0.001) discard;
    vec3 blue = vec3(0.231, 0.490, 0.910);
    vec3 teal = vec3(0.169, 0.722, 0.627);
    vec3 cyan = vec3(0.235, 0.925, 1.0);
    vec3 col = mix(blue, teal, smoothstep(0.0, 0.5, vT));
    col = mix(col, cyan, smoothstep(0.5, 1.0, vT));
    col = mix(col, vec3(0.86, 0.98, 1.0), vHead * 0.85);
    float intensity = 0.5 + 0.7 * vHead;
    gl_FragColor = vec4(col * intensity, a * uOpacity);
  }
`;

function Filament({ reduced }: { reduced: boolean }) {
  const target = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  const points = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const aT = new Float32Array(COUNT);
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) aT[i] = i / (COUNT - 1);
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aT", new THREE.BufferAttribute(aT, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uHead: { value: 0 },
        uRadius: { value: 0.6 },
        uStream: { value: 0 },
        uFreq: { value: new THREE.Vector3(3, 4, 5) },
        uPhase: { value: new THREE.Vector3(0, 1.2, 0.5) },
        uPixelRatio: { value: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.25) },
        uOpacity: { value: 1 },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.Points(geo, mat);
  }, []);

  useEffect(() => {
    return () => {
      points.geometry.dispose();
      (points.material as THREE.Material).dispose();
    };
  }, [points]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const mat = points.material as THREE.ShaderMaterial;
    const u = mat.uniforms;
    const t = state.clock.elapsedTime;
    if (!reduced) {
      u.uTime.value = t;
      u.uHead.value = (t * 0.09) % 1.0;
      const ph = u.uPhase.value as THREE.Vector3;
      ph.x = t * 0.025 + mouse.current.x * 0.6;
      ph.y = 1.2 + t * 0.018 + mouse.current.y * 0.6;
      ph.z = 0.5 + t * 0.021;
    }
    const k = Math.min(1, delta * 3);
    mouse.current.x += (target.current.x - mouse.current.x) * k;
    mouse.current.y += (target.current.y - mouse.current.y) * k;
    const prog = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));
    const sp = 1 - prog;
    const k2 = Math.min(1, delta * 2);
    points.rotation.y += (mouse.current.x * 0.5 * sp - points.rotation.y) * k2;
    points.rotation.x += (-mouse.current.y * 0.35 * sp - points.rotation.x) * k2;
    points.rotation.z = t * 0.02 * sp;
    u.uStream.value = prog;
    u.uOpacity.value = 1 - Math.min(1, Math.max(0, (prog - 0.5) / 0.5));
  });

  const primitiveProps: any = { object: points };
  return <primitive {...primitiveProps} />;
}

const FALLBACK_PATH = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 600; i++) {
    const th = (i / 600) * 6.2831853 * 3;
    const x = Math.sin(3 * th).toFixed(3);
    const y = Math.sin(2 * th + 1.2).toFixed(3);
    pts.push(`${i === 0 ? "M" : "L"}${x} ${y}`);
  }
  return pts.join(" ");
})();

const SignalCoreFallback = () => (
  <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-60" aria-hidden>
    <svg viewBox="-1.25 -1.25 2.5 2.5" className="w-[min(70vw,460px)] h-auto">
      <defs>
        <linearGradient id="signalcore-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B7DE8" />
          <stop offset="50%" stopColor="#2BB8A0" />
          <stop offset="100%" stopColor="#3CECFF" />
        </linearGradient>
      </defs>
      <path d={FALLBACK_PATH} fill="none" stroke="url(#signalcore-grad)" strokeWidth="0.014" strokeLinecap="round" />
    </svg>
  </div>
);

const SignalCore = () => {
  const reduced = useReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    let ok = false;
    try {
      const c = document.createElement("canvas");
      ok = !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch {
      ok = false;
    }
    setWebgl(ok);
  }, []);

  if (webgl === false) return <SignalCoreFallback />;
  if (webgl === null) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 4.2], fov: 50 }}
        frameloop={reduced ? "demand" : "always"}
        style={{ background: "transparent" }}
      >
        <Filament reduced={!!reduced} />
      </Canvas>
    </div>
  );
};

export default SignalCore;
