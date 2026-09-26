import { useEffect, useRef } from 'react';

const NODE_COUNT = 140;
const SPHERE_R = 1;
const CONNECT_DIST = 0.42;
const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;

function fibonacciSphere(count, radius) {
  const nodes = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    nodes.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
      phase: Math.random() * Math.PI * 2,
    });
  }
  return nodes;
}

export default function HeroNetworkGraph({ className = '' }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nodes = fibonacciSphere(NODE_COUNT, SPHERE_R);
    const edges = [];
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        if (dx * dx + dy * dy + dz * dz < CONNECT_DIST_SQ) edges.push([i, j]);
      }
    }

    let W = 0;
    let H = 0;
    let dpr = 1;
    const mouse = { x: -9999, y: -9999, active: false };
    const pulses = [];
    let rotY = 0;
    let rotX = 0.35;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('mousemove', onMove, { passive: true });
    canvas.addEventListener('mouseleave', onLeave);

    const project = (node, perspective) => {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      let x = node.x * cosY + node.z * sinY;
      let z = -node.x * sinY + node.z * cosY;
      let y = node.y;

      const y2 = y * cosX - z * sinX;
      const z2 = y * sinX + z * cosX;
      y = y2;
      z = z2;

      const scale = perspective / (perspective + z);
      return {
        sx: W / 2 + x * scale * Math.min(W, H) * 0.38,
        sy: H / 2 + y * scale * Math.min(W, H) * 0.38,
        z,
        scale,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      rotY += 0.0032;
      rotX = 0.32 + Math.sin(Date.now() * 0.00035) * 0.06;

      if (Math.random() < 0.035 && edges.length) {
        pulses.push({ edge: edges[Math.floor(Math.random() * edges.length)], t: 0 });
      }
      for (let p = pulses.length - 1; p >= 0; p -= 1) {
        pulses[p].t += 0.028;
        if (pulses[p].t > 1) pulses.splice(p, 1);
      }

      if (mouse.active) {
        rotY += (mouse.x / Math.max(W, 1) - 0.5) * 0.0016;
        rotX += (mouse.y / Math.max(H, 1) - 0.5) * 0.0012;
      }

      const projected = nodes.map((n) => project(n, 2.8));

      const sortedEdges = [...edges].sort((a, b) => {
        const za = (projected[a[0]].z + projected[a[1]].z) / 2;
        const zb = (projected[b[0]].z + projected[b[1]].z) / 2;
        return za - zb;
      });

      for (const [i, j] of sortedEdges) {
        const a = projected[i];
        const b = projected[j];
        const depth = (a.z + b.z) / 2;
        const alpha = Math.max(0.08, Math.min(0.65, 0.55 + depth * 0.35));
        const isLeft = a.sx < W / 2;
        ctx.lineWidth = 1 + a.scale * 0.6;
        ctx.strokeStyle = isLeft
          ? `rgba(95, 92, 241, ${alpha})`
          : `rgba(14, 165, 233, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      for (const pulse of pulses) {
        const [i, j] = pulse.edge;
        const a = projected[i];
        const b = projected[j];
        const px = a.sx + (b.sx - a.sx) * pulse.t;
        const py = a.sy + (b.sy - a.sy) * pulse.t;
        const isLeft = px < W / 2;
        ctx.beginPath();
        ctx.arc(px, py, 3.2 * (1 - pulse.t * 0.35), 0, Math.PI * 2);
        ctx.fillStyle = isLeft
          ? `rgba(129, 140, 248, ${0.85 * (1 - pulse.t)})`
          : `rgba(56, 189, 248, ${0.85 * (1 - pulse.t)})`;
        ctx.fill();
      }

      const sortedNodes = projected
        .map((p, index) => ({ ...p, index }))
        .sort((a, b) => a.z - b.z);

      for (const p of sortedNodes) {
        const n = nodes[p.index];
        const breathe = 1 + Math.sin(Date.now() * 0.002 + n.phase) * 0.25;
        const r = (2.2 + p.scale * 2.4) * breathe;
        const isLeft = p.sx < W / 2;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = isLeft ? '#5f5cf1' : '#0ea5e9';
        ctx.shadowBlur = 8;
        ctx.shadowColor = isLeft ? 'rgba(95, 92, 241, 0.45)' : 'rgba(14, 165, 233, 0.45)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
