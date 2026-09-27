import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 88;
const LINK_DISTANCE = 118;
const MAX_FORCE = 1.8;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function HeroNetworkGraph({ className = '' }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    const particles = [];
    const links = [];

    const makeParticles = () => {
      particles.length = 0;
      const cx = W / 2;
      const cy = H / 2;

      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const angle = Math.PI * 2 * (i / PARTICLE_COUNT);
        const radius = 36 + Math.random() * Math.min(W, H) * 0.42;
        const x = cx + Math.cos(angle) * radius * (0.7 + Math.random() * 0.7);
        const y = cy + Math.sin(angle * 1.45 + i * 0.17) * (H * 0.28 + Math.random() * H * 0.2);

        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.85,
          vy: (Math.random() - 0.5) * 0.85,
          radius: 1.6 + Math.random() * 2.8,
          phase: Math.random() * Math.PI * 2,
          drift: 0.35 + Math.random() * 1.4,
          hue: Math.random() > 0.5 ? 245 : 190,
        });
      }

      links.length = 0;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < LINK_DISTANCE * LINK_DISTANCE) {
            links.push([i, j]);
          }
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeParticles();
    };

    const pointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = event.clientX - rect.left;
      pointerRef.current.y = event.clientY - rect.top;
      pointerRef.current.active = true;
    };

    const pointerLeave = () => {
      pointerRef.current.active = false;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('pointermove', pointerMove, { passive: true });
    canvas.addEventListener('pointerleave', pointerLeave);

    const drawBackground = (time) => {
      ctx.clearRect(0, 0, W, H);

      const glow = ctx.createRadialGradient(W * 0.5, H * 0.52, 20, W * 0.5, H * 0.52, W * 0.72);
      glow.addColorStop(0, 'rgba(99, 102, 241, 0.28)');
      glow.addColorStop(0.38, 'rgba(14, 165, 233, 0.12)');
      glow.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      const orb = ctx.createRadialGradient(
        W * 0.58 + Math.sin(time * 0.0005) * 24,
        H * 0.52 + Math.cos(time * 0.0007) * 20,
        0,
        W * 0.58,
        H * 0.52,
        180,
      );
      orb.addColorStop(0, 'rgba(255, 255, 255, 0.52)');
      orb.addColorStop(0.2, 'rgba(148, 163, 184, 0.15)');
      orb.addColorStop(1, 'rgba(148, 163, 184, 0)');
      ctx.fillStyle = orb;
      ctx.fillRect(0, 0, W, H);
    };

    const animate = (time) => {
      drawBackground(time);

      const cx = W / 2;
      const cy = H / 2;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const pullX = (cx - p.x) * 0.0008;
        const pullY = (cy - p.y) * 0.0008;
        p.vx += pullX + Math.cos(time * 0.0008 + p.phase) * 0.02 * p.drift;
        p.vy += pullY + Math.sin(time * 0.0009 + p.phase) * 0.02 * p.drift;

        if (pointerRef.current.active) {
          const dx = p.x - pointerRef.current.x;
          const dy = p.y - pointerRef.current.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 180 * 180) {
            const dist = Math.sqrt(distSq) || 1;
            const strength = (1 - dist / 180) * 1.35;
            p.vx += (dx / dist) * strength * 1.4;
            p.vy += (dy / dist) * strength * 1.4;
          }
        }

        p.vx *= 0.987;
        p.vy *= 0.987;
        p.x += p.vx;
        p.y += p.vy;

        const margin = 18;
        if (p.x < margin) {
          p.x = margin;
          p.vx *= -0.75;
        } else if (p.x > W - margin) {
          p.x = W - margin;
          p.vx *= -0.75;
        }

        if (p.y < margin) {
          p.y = margin;
          p.vy *= -0.75;
        } else if (p.y > H - margin) {
          p.y = H - margin;
          p.vy *= -0.75;
        }
      }

      for (let iter = 0; iter < 2; iter += 1) {
        for (let i = 0; i < links.length; i += 1) {
          const [aIndex, bIndex] = links[i];
          const a = particles[aIndex];
          const b = particles[bIndex];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;

          if (distSq === 0 || distSq > LINK_DISTANCE * LINK_DISTANCE) continue;

          const dist = Math.sqrt(distSq) || 1;
          const diff = (LINK_DISTANCE - dist) / dist;
          const force = clamp(diff * 0.012, -MAX_FORCE, MAX_FORCE);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          a.vx -= fx;
          a.vy -= fy;
          b.vx += fx;
          b.vy += fy;
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const depth = Math.sin(time * 0.0012 + p.phase) * 0.5 + 0.5;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 76%, ${0.95 + depth * 0.05})`);
        gradient.addColorStop(0.38, `hsla(${p.hue}, 96%, 68%, ${0.5 + depth * 0.25})`);
        gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < links.length; i += 1) {
        const [aIndex, bIndex] = links[i];
        const a = particles[aIndex];
        const b = particles[bIndex];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const alpha = 1 - dist / LINK_DISTANCE;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.06 + alpha * 0.6})`;
        ctx.lineWidth = 0.9 + alpha * 1.5;
        ctx.stroke();
      }

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        ctx.beginPath();
        ctx.fillStyle = p.hue === 245 ? 'rgba(99, 102, 241, 0.96)' : 'rgba(56, 189, 248, 0.96)';
        ctx.shadowBlur = 16;
        ctx.shadowColor = p.hue === 245 ? 'rgba(99, 102, 241, 0.8)' : 'rgba(56, 189, 248, 0.8)';
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      coreGlow.addColorStop(0, 'rgba(255,255,255,0.26)');
      coreGlow.addColorStop(0.2, 'rgba(129,140,248,0.16)');
      coreGlow.addColorStop(1, 'rgba(15,23,42,0)');
      ctx.fillStyle = coreGlow;
      ctx.fillRect(cx - 120, cy - 120, 240, 240);

      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener('pointermove', pointerMove);
      canvas.removeEventListener('pointerleave', pointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
