import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const bgOffsetRef = useRef({ x: 0, y: 0 });
  const mouseTrailRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    const particleCount = Math.min(80, Math.floor((width * height) / 15000));
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        originalX: Math.random() * width,
        originalY: Math.random() * height,
      });
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
      
      mouseTrailRef.current.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (mouseTrailRef.current.length > 20) {
        mouseTrailRef.current.shift();
      }
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      
      const mouse = mouseRef.current;
      
      if (mouse.active) {
        const targetX = (mouse.x - width / 2) * 0.05;
        const targetY = (mouse.y - height / 2) * 0.05;
        bgOffsetRef.current.x += (targetX - bgOffsetRef.current.x) * 0.05;
        bgOffsetRef.current.y += (targetY - bgOffsetRef.current.y) * 0.05;
      } else {
        bgOffsetRef.current.x *= 0.95;
        bgOffsetRef.current.y *= 0.95;
      }

      const bgX = bgOffsetRef.current.x;
      const bgY = bgOffsetRef.current.y;
      
      canvas.style.background = `
        radial-gradient(
          ellipse at ${50 + bgX * 0.5}% ${50 + bgY * 0.5}%, 
          rgba(14, 165, 233, 0.15) 0%, 
          transparent 50%
        ),
        radial-gradient(
          ellipse at ${30 + bgX}% ${70 + bgY}%, 
          rgba(139, 92, 246, 0.1) 0%, 
          transparent 40%
        ),
        radial-gradient(
          ellipse at ${70 - bgX}% ${30 - bgY}%, 
          rgba(236, 72, 153, 0.08) 0%, 
          transparent 40%
        ),
        linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #1a1a25 100%)
      `;

      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, width, height);

        const particles = particlesRef.current;
        
        mouseTrailRef.current = mouseTrailRef.current.filter(p => {
          p.life -= 0.05;
          return p.life > 0;
        });

        mouseTrailRef.current.forEach((point, index) => {
          const nextPoint = mouseTrailRef.current[index + 1];
          if (nextPoint) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${point.life * 0.3})`;
            ctx.lineWidth = 2 * point.life;
            ctx.stroke();
          }
        });

        particles.forEach((particle) => {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (mouse.active && dist < 200 && dist > 0) {
            const force = (200 - dist) / 200;
            particle.vx += (dx / dist) * force * 0.5;
            particle.vy += (dy / dist) * force * 0.5;
          }

          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= 0.98;
          particle.vy *= 0.98;

          if (Math.abs(particle.vx) < 0.1) particle.vx += (Math.random() - 0.5) * 0.1;
          if (Math.abs(particle.vy) < 0.1) particle.vy += (Math.random() - 0.5) * 0.1;

          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          
          const opacity = mouse.active && dist < 100 
            ? particle.opacity + (1 - dist / 100) * 0.5 
            : particle.opacity;
          
          ctx.fillStyle = `rgba(14, 165, 233, ${opacity})`;
          ctx.fill();
        });

        if (mouse.active) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)';
          ctx.lineWidth = 1;
          ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)';
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particles.length; i++) {
          let connections = 0;
          for (let j = i + 1; j < particles.length && connections < 3; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              connections++;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none transition-all duration-300"
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #1a1a25 100%)',
        transform: 'translateZ(0)',
      }}
    />
  );
};

export default ParticleBackground;
