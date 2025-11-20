import { useEffect, useRef } from "react";

const FloatingParticles = ({
  count = 80,
  color = "rgba(251, 191, 36, 0.3)",
  maxDistance = 150,
  className = "",
}) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId;
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.2;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;

        // Colors that match the amber/orange theme
        const colors = [
          "rgba(251, 191, 36, 0.4)", // amber-400
          "rgba(245, 158, 11, 0.3)", // amber-500
          "rgba(234, 88, 12, 0.2)", // orange-500
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.velocity = {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3,
        };
        this.opacity = Math.random() * 0.5 + 0.2;
        this.life = 100;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(
          /[^,]+(?=\))/,
          this.opacity.toString()
        );
        ctx.fill();
      }
      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        // Bounce off edges with damping
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
          this.velocity.x = -this.velocity.x * 0.9;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
          this.velocity.y = -this.velocity.y * 0.9;
        }
        // Slowly change direction occasionally
        if (Math.random() < 0.01) {
          this.velocity.x += (Math.random() - 0.5) * 0.1;
          this.velocity.y += (Math.random() - 0.5) * 0.1;
          // Limit max velocity
          this.velocity.x = Math.max(-0.5, Math.min(0.5, this.velocity.x));
          this.velocity.y = Math.max(-0.5, Math.min(0.5, this.velocity.y));
        }
        // Pulsate opacity
        this.opacity += Math.sin(this.life * 0.05) * 0.01;
        this.opacity = Math.max(0.1, Math.min(0.6, this.opacity));
        this.life--;
        if (this.life <= 0) this.life = 100;
        this.draw();
      }
    }
    // Create particles
    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), count); // Responsive count
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    // Connect particles with lines
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            const opacity = 0.15 * (1 - distance / maxDistance);
            ctx.beginPath();
            ctx.strokeStyle = color.replace(/[^,]+(?=\))/, opacity.toString());
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.update());
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, color, maxDistance]);
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
      style={{ background: "transparent" }}
    />
  );
};

export default FloatingParticles;
