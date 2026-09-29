import React, { useRef, useEffect } from 'react';

/**
 * InteractiveCircuitry: High-performance HTML5 Canvas rendering interactive
 * 3D cybernetic circuit traces, traveling pulse packets, glowing junction nodes,
 * and mouse-reactive energy conduits tailored for the Agentic AI theme.
 */
export default function InteractiveCircuitry({ darkMode }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    // Mouse tracking state
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      radius: 170,
      trail: []
    };

    // Parallax 3D tilt state
    const tilt = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      initCircuitry();
    };

    // Node & Circuit Structure
    let nodes = [];
    let traces = [];
    let pulses = [];
    let chips = [];

    const initCircuitry = () => {
      nodes = [];
      traces = [];
      pulses = [];
      chips = [];

      if (width === 0 || height === 0) return;

      // 1. Grid-aligned circuit nodes with organic tech distribution
      const cols = Math.max(6, Math.floor(width / 95));
      const rows = Math.max(4, Math.floor(height / 65));
      const cellW = width / cols;
      const cellH = height / rows;

      // Create matrix of candidate positions
      const grid = [];
      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          // Add subtle tech jitter
          const jitterX = (Math.random() - 0.5) * (cellW * 0.35);
          const jitterY = (Math.random() - 0.5) * (cellH * 0.35);
          const x = (c + 0.5) * cellW + jitterX;
          const y = (r + 0.5) * cellH + jitterY;
          
          // Layer depth: 0 = far, 1 = mid, 2 = near
          const depth = Math.random() < 0.25 ? 0 : Math.random() < 0.7 ? 1 : 2;

          const node = {
            id: `${c}_${r}`,
            col: c,
            row: r,
            x,
            y,
            baseX: x,
            baseY: y,
            depth,
            radius: depth === 2 ? 3.5 : depth === 1 ? 2.5 : 1.8,
            pulseTimer: Math.random() * Math.PI * 2,
            neighbors: [],
            isChip: Math.random() < 0.08
          };

          grid[r][c] = node;
          nodes.push(node);

          if (node.isChip) {
            chips.push({
              x: node.x,
              y: node.y,
              w: 16 + Math.random() * 12,
              h: 12 + Math.random() * 8,
              pins: Math.floor(3 + Math.random() * 3)
            });
          }
        }
      }

      // 2. Connect nodes with orthogonal & 45-degree circuit traces
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const current = grid[r][c];

          // Right connection
          if (c + 1 < cols && Math.random() < 0.72) {
            const next = grid[r][c + 1];
            addTrace(current, next);
          }
          // Down connection
          if (r + 1 < rows && Math.random() < 0.65) {
            const next = grid[r + 1][c];
            addTrace(current, next);
          }
          // Diagonal 45-degree circuit trace
          if (c + 1 < cols && r + 1 < rows && Math.random() < 0.32) {
            const next = grid[r + 1][c + 1];
            addTrace(current, next, true);
          }
        }
      }

      // 3. Spawn traveling data pulses along traces
      const pulseCount = Math.min(18, Math.max(8, Math.floor(traces.length * 0.28)));
      for (let i = 0; i < pulseCount; i++) {
        if (traces.length > 0) {
          const randomTrace = traces[Math.floor(Math.random() * traces.length)];
          pulses.push({
            trace: randomTrace,
            progress: Math.random(),
            speed: 0.004 + Math.random() * 0.007,
            size: 2.2 + Math.random() * 2,
            direction: Math.random() > 0.5 ? 1 : -1
          });
        }
      }
    };

    const addTrace = (from, to, isDiagonal = false) => {
      // Create PCB trace path: Orthogonal with 45-degree corner bend
      let waypoints = [];
      const dx = to.x - from.x;
      const dy = to.y - from.y;

      if (isDiagonal) {
        waypoints = [{ x: from.x, y: from.y }, { x: to.x, y: to.y }];
      } else if (Math.random() > 0.4) {
        // Bend trace: Horizontal first then vertical or vice versa
        const midX = from.x + dx * 0.5;
        waypoints = [
          { x: from.x, y: from.y },
          { x: midX, y: from.y },
          { x: midX, y: to.y },
          { x: to.x, y: to.y }
        ];
      } else {
        waypoints = [{ x: from.x, y: from.y }, { x: to.x, y: to.y }];
      }

      const trace = {
        from,
        to,
        waypoints,
        length: Math.hypot(dx, dy)
      };

      traces.push(trace);
      from.neighbors.push(to);
    };

    // Mouse & Touch Listeners
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (
        e.clientX >= rect.left - 60 &&
        e.clientX <= rect.right + 60 &&
        e.clientY >= rect.top - 40 &&
        e.clientY <= rect.bottom + 40
      ) {
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.active = true;

        // Calculate 3D tilt based on mouse position from center
        const centerX = width * 0.5;
        const centerY = height * 0.5;
        tilt.targetX = ((mouse.targetX - centerX) / (centerX || 1)) * 16;
        tilt.targetY = ((mouse.targetY - centerY) / (centerY || 1)) * 12;

        // Add to cursor trail
        if (Math.random() < 0.45) {
          mouse.trail.push({
            x: mouse.targetX + (Math.random() - 0.5) * 18,
            y: mouse.targetY + (Math.random() - 0.5) * 18,
            life: 1.0,
            size: 1.5 + Math.random() * 2
          });
        }
      } else if (mouse.active) {
        mouse.active = false;
        tilt.targetX = 0;
        tilt.targetY = 0;
      }
    };

    const handleTouchMove = (e) => {
      if (!containerRef.current || !e.touches || !e.touches[0]) return;
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        mouse.targetX = touch.clientX - rect.left;
        mouse.targetY = touch.clientY - rect.top;
        mouse.active = true;
        const centerX = width * 0.5;
        const centerY = height * 0.5;
        tilt.targetX = ((mouse.targetX - centerX) / (centerX || 1)) * 14;
        tilt.targetY = ((mouse.targetY - centerY) / (centerY || 1)) * 10;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
      tilt.targetX = 0;
      tilt.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.02;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;

      // Smooth 3D tilt lerp
      tilt.x += (tilt.targetX - tilt.x) * 0.08;
      tilt.y += (tilt.targetY - tilt.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Color palette based on theme
      const traceColor = darkMode ? 'rgba(56, 189, 248, 0.22)' : 'rgba(37, 99, 235, 0.16)';
      const traceGlowColor = darkMode ? 'rgba(56, 189, 248, 0.65)' : 'rgba(37, 99, 235, 0.5)';
      const nodeColor = darkMode ? 'rgba(56, 189, 248, 0.75)' : 'rgba(29, 78, 216, 0.65)';
      const pulseColor = darkMode ? '#38bdf8' : '#2563eb';
      const cursorLineColor = darkMode ? 'rgba(56, 189, 248, 0.85)' : 'rgba(37, 99, 235, 0.75)';

      // 1. Draw Traces with Parallax Shift
      ctx.lineWidth = 1.2;
      for (let i = 0; i < traces.length; i++) {
        const trace = traces[i];
        const depth = trace.from.depth;
        const depthFactor = depth === 2 ? 1.0 : depth === 1 ? 0.6 : 0.3;
        const shiftX = tilt.x * depthFactor;
        const shiftY = tilt.y * depthFactor;

        // Check proximity to cursor for interactive highlight
        let isNearMouse = false;
        if (mouse.active) {
          const midX = (trace.from.x + trace.to.x) * 0.5;
          const midY = (trace.from.y + trace.to.y) * 0.5;
          const distToMouse = Math.hypot(mouse.x - midX, mouse.y - midY);
          if (distToMouse < mouse.radius) {
            isNearMouse = true;
          }
        }

        ctx.strokeStyle = isNearMouse ? traceGlowColor : traceColor;
        ctx.lineWidth = isNearMouse ? 1.8 : depth === 2 ? 1.2 : 0.8;

        ctx.beginPath();
        for (let j = 0; j < trace.waypoints.length; j++) {
          const wp = trace.waypoints[j];
          const px = wp.x + shiftX;
          const py = wp.y + shiftY;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // 2. Draw Traveling Electric Pulses
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        p.progress += p.speed * p.direction;

        if (p.progress >= 1) {
          p.progress = 0;
          p.trace = traces[Math.floor(Math.random() * traces.length)];
        } else if (p.progress <= 0) {
          p.progress = 1;
          p.trace = traces[Math.floor(Math.random() * traces.length)];
        }

        const trace = p.trace;
        if (!trace || trace.waypoints.length < 2) continue;

        const totalSegments = trace.waypoints.length - 1;
        const segIndex = Math.min(
          totalSegments - 1,
          Math.floor(p.progress * totalSegments)
        );
        const segProgress = (p.progress * totalSegments) - segIndex;

        const p1 = trace.waypoints[segIndex];
        const p2 = trace.waypoints[segIndex + 1];

        const depthFactor = trace.from.depth === 2 ? 1.0 : trace.from.depth === 1 ? 0.6 : 0.3;
        const posX = (p1.x + (p2.x - p1.x) * segProgress) + tilt.x * depthFactor;
        const posY = (p1.y + (p2.y - p1.y) * segProgress) + tilt.y * depthFactor;

        // Pulse energy particle with glowing tail
        ctx.save();
        ctx.fillStyle = pulseColor;
        ctx.shadowColor = pulseColor;
        ctx.shadowBlur = darkMode ? 12 : 6;
        ctx.beginPath();
        ctx.arc(posX, posY, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Draw Micro Chips & IC Packages
      for (let i = 0; i < chips.length; i++) {
        const chip = chips[i];
        const shiftX = tilt.x * 0.8;
        const shiftY = tilt.y * 0.8;
        const cx = chip.x + shiftX - chip.w * 0.5;
        const cy = chip.y + shiftY - chip.h * 0.5;

        ctx.fillStyle = darkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)';
        ctx.strokeStyle = darkMode ? 'rgba(56, 189, 248, 0.45)' : 'rgba(37, 99, 235, 0.4)';
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.roundRect(cx, cy, chip.w, chip.h, 2);
        ctx.fill();
        ctx.stroke();

        // IC core glowing indicator
        ctx.fillStyle = pulseColor;
        ctx.beginPath();
        ctx.arc(cx + chip.w * 0.5, cy + chip.h * 0.5, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Draw Circuit Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const depthFactor = n.depth === 2 ? 1.0 : n.depth === 1 ? 0.6 : 0.3;
        const posX = n.x + tilt.x * depthFactor;
        const posY = n.y + tilt.y * depthFactor;

        // Proximity glow to cursor
        let activeScale = 1;
        let isHot = false;
        if (mouse.active) {
          const distToMouse = Math.hypot(mouse.x - posX, mouse.y - posY);
          if (distToMouse < mouse.radius) {
            const intensity = 1 - (distToMouse / mouse.radius);
            activeScale = 1 + intensity * 0.9;
            isHot = true;

            // Draw interactive energy connection from node to cursor probe!
            if (distToMouse < 110 && Math.random() < 0.35) {
              ctx.save();
              ctx.strokeStyle = cursorLineColor;
              ctx.lineWidth = 1.4 * intensity;
              ctx.shadowColor = pulseColor;
              ctx.shadowBlur = 8;
              ctx.beginPath();
              ctx.moveTo(posX, posY);

              // Orthogonal bend to cursor
              const midX = posX + (mouse.x - posX) * 0.5;
              ctx.lineTo(midX, posY);
              ctx.lineTo(midX, mouse.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }

        // Draw node ring & center
        ctx.save();
        ctx.fillStyle = isHot ? pulseColor : nodeColor;
        if (isHot) {
          ctx.shadowColor = pulseColor;
          ctx.shadowBlur = darkMode ? 10 : 6;
        }

        ctx.beginPath();
        ctx.arc(posX, posY, n.radius * activeScale, 0, Math.PI * 2);
        ctx.fill();

        // Outer tech ring for near-layer nodes
        if (n.depth === 2 || isHot) {
          ctx.strokeStyle = isHot ? pulseColor : traceColor;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.arc(posX, posY, (n.radius + 3) * activeScale, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 5. Cursor Active Energy Core
      if (mouse.active) {
        ctx.save();
        // Cursor probe aura
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 90
        );
        gradient.addColorStop(0, darkMode ? 'rgba(56, 189, 248, 0.28)' : 'rgba(37, 99, 235, 0.16)');
        gradient.addColorStop(0.5, darkMode ? 'rgba(14, 165, 233, 0.08)' : 'rgba(59, 130, 246, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 90, 0, Math.PI * 2);
        ctx.fill();

        // Cursor micro reticle / target
        ctx.strokeStyle = pulseColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = pulseColor;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 6. Draw fading sparks from cursor trail
        for (let i = mouse.trail.length - 1; i >= 0; i--) {
          const t = mouse.trail[i];
          t.life -= 0.04;
          if (t.life <= 0) {
            mouse.trail.splice(i, 1);
            continue;
          }

          ctx.fillStyle = darkMode 
            ? `rgba(56, 189, 248, ${t.life * 0.8})` 
            : `rgba(37, 99, 235, ${t.life * 0.7})`;
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.size * t.life, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [darkMode]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-auto overflow-hidden select-none z-0"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
      />
    </div>
  );
}
