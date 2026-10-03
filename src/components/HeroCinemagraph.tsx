import React, { useEffect, useRef } from 'react';

export const HeroCinemagraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Street lamp coordinates & flicker state
    const lamp = {
      rx: 0.71,
      ry: 0.42,
      baseRadius: 36,
    };

    let startTime = performance.now();

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const elapsed = (time - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Sunset Glow Luminance Breathing (12s loop cycle)
      const sunBreath = Math.sin((elapsed * Math.PI * 2) / 12) * 0.04 + 0.06;
      const sunGradient = ctx.createRadialGradient(
        width * 0.75,
        height * 0.35,
        10,
        width * 0.75,
        height * 0.35,
        width * 0.35
      );
      sunGradient.addColorStop(0, `rgba(255, 140, 80, ${sunBreath})`);
      sunGradient.addColorStop(0.5, `rgba(255, 60, 140, ${sunBreath * 0.35})`);
      sunGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Street Light Organic Bloom & Gentle Electrical Flicker
      const flickerCycle = elapsed % 7.3;
      let flickerFactor = 1.0;
      if (flickerCycle > 3.1 && flickerCycle < 3.22) {
        flickerFactor = 0.78 + Math.sin(elapsed * 45) * 0.08;
      } else if (flickerCycle > 6.4 && flickerCycle < 6.48) {
        flickerFactor = 0.85;
      }
      const lampX = width * lamp.rx;
      const lampY = height * lamp.ry;
      const lampAlpha = (0.24 + Math.sin(elapsed * 0.8) * 0.03) * flickerFactor;

      const lampGrad = ctx.createRadialGradient(lampX, lampY, 2, lampX, lampY, lamp.baseRadius);
      lampGrad.addColorStop(0, `rgba(255, 235, 170, ${lampAlpha})`);
      lampGrad.addColorStop(0.35, `rgba(255, 180, 100, ${lampAlpha * 0.4})`);
      lampGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = lampGrad;
      ctx.beginPath();
      ctx.arc(lampX, lampY, lamp.baseRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Subtle Water & Wet Ground Shimmer Waves (Lower quarter of frame)
      const shimmerY = height * 0.76;
      const shimmerHeight = height * 0.22;
      const waveCount = 5;
      for (let i = 0; i < waveCount; i++) {
        const waveProgress = (elapsed * 0.15 + i / waveCount) % 1;
        const yPos = shimmerY + waveProgress * shimmerHeight;
        const waveAlpha = Math.sin(waveProgress * Math.PI) * 0.05;
        const waveX = width * 0.55;
        const waveW = width * 0.42;

        const waveGrad = ctx.createLinearGradient(waveX, yPos, waveX + waveW, yPos);
        waveGrad.addColorStop(0, 'rgba(0,0,0,0)');
        waveGrad.addColorStop(0.3, `rgba(255, 60, 140, ${waveAlpha * 0.7})`);
        waveGrad.addColorStop(0.7, `rgba(255, 180, 100, ${waveAlpha * 0.9})`);
        waveGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = waveGrad;
        ctx.fillRect(waveX, yPos, waveW, 2.5);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-[2] overflow-hidden">
      {/* HTML5 Canvas Micro-Cinemagraph Layer */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block mix-blend-screen opacity-90"
      />

      {/* Subtle Skyline Atmospheric Mist Drift (Seamless CSS Loop) */}
      <div
        className="absolute top-[18%] right-0 w-[55%] h-[28%] pointer-events-none opacity-15 mix-blend-screen animate-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,100,160,0.15) 0%, rgba(255,180,100,0.06) 50%, transparent 80%)',
          animationDuration: '10s',
        }}
      />

      {/* Gentle Character Breathing Light Warmth (Subtle 4.8s respiratory rhythm) */}
      <div
        className="absolute bottom-[20%] right-[15%] w-[320px] h-[360px] pointer-events-none mix-blend-soft-light"
        style={{
          background: 'radial-gradient(circle, rgba(255,160,200,0.1) 0%, transparent 70%)',
          animation: 'subtleBreathe 4.8s ease-in-out infinite',
        }}
      />

      {/* Natural Micro Eye Blink Overlay for the visible character (Occurs every ~5.6s for 160ms) */}
      <div
        className="absolute bottom-[44%] right-[24.5%] w-3 h-1.5 pointer-events-none"
        style={{
          animation: 'naturalBlink 5.6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        }}
      >
        <div className="w-full h-[2px] bg-[#25151A]/85 rounded-full blur-[0.3px]" />
      </div>
    </div>
  );
};
