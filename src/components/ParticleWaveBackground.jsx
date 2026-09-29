import React, { useEffect, useRef } from 'react';

export default function ParticleWaveBackground({ darkMode = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    // Mouse state for gentle cursor interaction
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      radius: 120, // Interaction radius in px
      active: false
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particle grid definition: 3 organic ribbon streams matching the reference image
    const particles = [];

    // Ribbon 0: Primary central wave ribbon (dense, voluminous sweep across center)
    const R0_COLS = 105;
    const R0_ROWS = 32;
    for (let r = 0; r < R0_ROWS; r++) {
      for (let c = 0; c < R0_COLS; c++) {
        particles.push({
          gridX: c / (R0_COLS - 1),
          gridZ: r / (R0_ROWS - 1),
          ribbon: 0,
          dispX: 0,
          dispY: 0,
          vx: 0,
          vy: 0,
          randPhase: Math.random() * Math.PI * 2,
          sizeNoise: 0.75 + Math.random() * 0.5
        });
      }
    }

    // Ribbon 1: Upper diagonal twisting strand (upper-left to center-right)
    const R1_COLS = 65;
    const R1_ROWS = 16;
    for (let r = 0; r < R1_ROWS; r++) {
      for (let c = 0; c < R1_COLS; c++) {
        particles.push({
          gridX: c / (R1_COLS - 1),
          gridZ: r / (R1_ROWS - 1),
          ribbon: 1,
          dispX: 0,
          dispY: 0,
          vx: 0,
          vy: 0,
          randPhase: Math.random() * Math.PI * 2,
          sizeNoise: 0.7 + Math.random() * 0.4
        });
      }
    }

    // Ribbon 2: Lower sweeping counter-wave strand (bottom depth)
    const R2_COLS = 65;
    const R2_ROWS = 14;
    for (let r = 0; r < R2_ROWS; r++) {
      for (let c = 0; c < R2_COLS; c++) {
        particles.push({
          gridX: c / (R2_COLS - 1),
          gridZ: r / (R2_ROWS - 1),
          ribbon: 2,
          dispX: 0,
          dispY: 0,
          vx: 0,
          vy: 0,
          randPhase: Math.random() * Math.PI * 2,
          sizeNoise: 0.7 + Math.random() * 0.4
        });
      }
    }

    // Resize handler
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    // Main animation render loop
    const render = () => {
      time += 0.010; // Gentle, smooth wave undulation

      // Smooth mouse interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      ctx.clearRect(0, 0, width, height);

      // 3D Camera / Perspective projection parameters
      const fov = 440;
      const cameraZ = 360;
      const centerY = height * 0.54;
      const centerX = width * 0.50;

      // Color palettes based on theme
      // Dark Mode: Whitish pixel beads with luminous pale icy blue crest highlights
      // Light Mode: Dark blueish pixel beads (deep navy / royal / cobalt)
      const baseR = darkMode ? 245 : 18;
      const baseG = darkMode ? 248 : 36;
      const baseB = darkMode ? 255 : 82;

      const crestR = darkMode ? 210 : 37;
      const crestG = darkMode ? 235 : 99;
      const crestB = darkMode ? 255 : 235;

      const totalParticles = particles.length;
      for (let i = 0; i < totalParticles; i++) {
        const p = particles[i];

        let x3d, y3d, z3d;

        if (p.ribbon === 0) {
          // Primary main ribbon: expansive sweeping wave
          const spanX = width * 1.45;
          const spanZ = 680;

          const rawX = (p.gridX - 0.5) * spanX;
          const rawZ = p.gridZ * spanZ;

          // Multi-frequency harmonic 3D waves for organic fluid ribbons
          const w1 = Math.sin(rawX * 0.0028 + time * 1.1 + p.randPhase * 0.08) * 80;
          const w2 = Math.cos(rawZ * 0.0042 + time * 0.8) * 58;
          const w3 = Math.sin((rawX * 0.7 + rawZ) * 0.0022 - time * 0.5) * 42;
          const rawY = w1 + w2 + w3;

          const rotAngle = -0.16;
          x3d = rawX * Math.cos(rotAngle) - rawZ * Math.sin(rotAngle);
          z3d = rawX * Math.sin(rotAngle) + rawZ * Math.cos(rotAngle) + cameraZ;
          y3d = rawY + (p.gridZ - 0.5) * 70;
        } else if (p.ribbon === 1) {
          // Secondary upper twisting strand
          const spanX = width * 1.25;
          const spanZ = 480;

          const rawX = (p.gridX - 0.46) * spanX;
          const rawZ = p.gridZ * spanZ;

          const w1 = Math.sin(rawX * 0.0038 + time * 0.95) * 48;
          const w2 = Math.cos(rawZ * 0.0055 - time * 0.7) * 36;
          const rawY = w1 + w2 - 95;

          const rotAngle = 0.20;
          x3d = rawX * Math.cos(rotAngle) - rawZ * Math.sin(rotAngle);
          z3d = rawX * Math.sin(rotAngle) + rawZ * Math.cos(rotAngle) + cameraZ + 60;
          y3d = rawY;
        } else {
          // Tertiary lower depth ribbon
          const spanX = width * 1.30;
          const spanZ = 520;

          const rawX = (p.gridX - 0.52) * spanX;
          const rawZ = p.gridZ * spanZ;

          const w1 = Math.sin(rawX * 0.0034 - time * 0.85) * 52;
          const w2 = Math.cos(rawZ * 0.0048 + time * 0.65) * 40;
          const rawY = w1 + w2 + 85;

          const rotAngle = -0.08;
          x3d = rawX * Math.cos(rotAngle) - rawZ * Math.sin(rotAngle);
          z3d = rawX * Math.sin(rotAngle) + rawZ * Math.cos(rotAngle) + cameraZ + 40;
          y3d = rawY;
        }

        // Perspective projection
        if (z3d <= 1) continue;
        const perspective = fov / z3d;
        const projX = centerX + x3d * perspective;
        const projY = centerY + y3d * perspective;

        // Interactive mouse deflection: "cursor goes through the beads they move slightly"
        // Controlled gentle repulsion with smooth cubic falloff
        const dx = (projX + p.dispX) - mouse.x;
        const dy = (projY + p.dispY) - mouse.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = mouse.radius * mouse.radius;

        if (distSq < radiusSq && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const normX = dx / dist;
          const normY = dy / dist;
          // Gentle deflection force: max ~8px to 14px displacement for a subtle, natural fluid ripple
          const force = Math.pow(1 - dist / mouse.radius, 2) * 5.5;
          p.vx += normX * force;
          p.vy += normY * force;
        }

        // Gentle spring-back to wave origin + smooth damping
        const springK = 0.065;
        p.vx -= p.dispX * springK;
        p.vy -= p.dispY * springK;
        p.vx *= 0.88; // Damping
        p.vy *= 0.88;
        p.dispX += p.vx;
        p.dispY += p.vy;

        // Final screen position with interactive movement
        const screenX = projX + p.dispX;
        const screenY = projY + p.dispY;

        // Viewport cull
        if (screenX < -25 || screenX > width + 25 || screenY < -25 || screenY > height + 25) {
          continue;
        }

        // Depth perspective scaling for bead radius
        const depthFactor = Math.max(0.18, Math.min(1.25, perspective * 1.05));
        const beadRadius = Math.max(0.65, depthFactor * 1.65 * p.sizeNoise);

        // Alpha calculation: deeper particles are soft; foreground crests are prominent
        const crestFactor = Math.sin(p.gridX * 6.5 + time) > 0.4;
        let alpha = Math.max(0.12, Math.min(0.88, depthFactor * (darkMode ? 0.72 : 0.82)));

        // Color selection: dark blueish in light mode, whitish in dark mode
        const r = crestFactor ? crestR : baseR;
        const g = crestFactor ? crestG : baseG;
        const b = crestFactor ? crestB : baseB;

        // Draw individual pixel bead
        ctx.beginPath();
        ctx.arc(screenX, screenY, beadRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        // Foreground bead shimmer in dark mode
        if (darkMode && depthFactor > 0.85 && crestFactor) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, beadRadius * 2.0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 242, 254, ${alpha * 0.20})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full block z-0"
      style={{ willChange: 'transform' }}
    />
  );
}
