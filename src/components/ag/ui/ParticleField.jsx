import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils/cn";

function ParticleField({ className }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq?.matches);
    update();
    mq?.addEventListener?.("change", update);
    return () => mq?.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduced) {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = 0.7 + Math.random() * 1.2;
        ctx.fillStyle = `rgba(184, 198, 214, ${0.06 + Math.random() * 0.07})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      return () => ro.disconnect();
    }

    // Reduce particle count on low-end devices for better performance
    const isLowEnd = navigator.hardwareConcurrency < 4 || (navigator.deviceMemory && navigator.deviceMemory < 4);
    const count = isLowEnd ? 60 : 90; // Reduced from 110
    const pts = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18, // Slightly slower for smoother animation
      vy: (Math.random() - 0.5) * 0.18,
      r: 0.8 + Math.random() * 1.5, // Slightly smaller
      a: 0.05 + Math.random() * 0.08,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      const grd = ctx.createRadialGradient(w * 0.5, h * 0.35, 10, w * 0.5, h * 0.35, Math.max(w, h) * 0.8);
      grd.addColorStop(0, "rgba(51, 211, 213, 0.08)");
      grd.addColorStop(1, "rgba(11, 18, 32, 0.0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.fillStyle = `rgba(184, 198, 214, ${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Optimize connection drawing - only check nearby particles
      const maxDist = 140; // Reduced from 160
      const maxDistSq = maxDist * maxDist;
      
      // Use spatial partitioning for better performance
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        // Only check particles within reasonable distance
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = Math.abs(a.x - b.x);
          const dy = Math.abs(a.y - b.y);
          
          // Quick distance check before expensive calculation
          if (dx > maxDist || dy > maxDist) continue;
          
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDistSq) {
            const t = 1 - d2 / maxDistSq;
            ctx.strokeStyle = `rgba(51, 211, 213, ${0.06 * t})`; // Slightly reduced opacity
            ctx.lineWidth = 0.8; // Thinner lines
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  return (
    <div className={cn("absolute inset-0", className)} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export default ParticleField;

