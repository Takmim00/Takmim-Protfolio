import { motion, useAnimation, useInView } from "framer-motion";
import { Download, Github, Instagram, Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { usePortfolio } from "../context/PortfolioContext";

// TypewriterEffect Component
const TypewriterEffect = ({ words = ["Frontend Developer"], speed = 100 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    const word = words[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        setTypingSpeed(speed);

        if (currentText === word) {
          setTypingSpeed(1500);
          setIsDeleting(true);
        }
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
        setTypingSpeed(speed / 2);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, speed]);

  return (
    <span className="text-amber-400">
      {currentText}
      <span className="animate-pulse">_</span>
    </span>
  );
};

// SocialIcon Component
const SocialIcon = ({ icon: Icon, href, delay = 0 }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-600 blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
      <div className="relative flex items-center justify-center h-12 w-12 rounded-full border-2 border-orange-500 bg-black text-amber-400 hover:text-white transition-colors duration-300 z-10">
        <Icon className="h-6 w-6" />
      </div>
    </motion.a>
  );
};

// Main Banner Component
const Banner = () => {
  const { portfolioData } = usePortfolio();
  const personal = portfolioData.personal;
  const social = portfolioData.social;
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, threshold: 0.3 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Handle animation when component is in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  // Track mouse position for 3D effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  // Calculate transform for 3D effect
  const calculateTransform = (x, y) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (x - centerX) / 50;
    const moveY = (y - centerY) / 50;
    return { x: moveX, y: moveY };
  };

  // Floating Particles Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId;
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.2; // Make it a bit taller to ensure full coverage
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
        this.life = 100; // Used for fading in/out
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
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100); // Responsive count

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    // Connect particles with lines
    const connectParticles = () => {
      const maxDistance = 150;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 0.15 * (1 - distance / maxDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(251, 191, 36, ${opacity})`;
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
  }, []);

  return (
    <div className="pt-14 bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Floating Particles Background */}
      {/* <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "transparent" }}
      /> */}
      <div className="container mx-auto md:px-16 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Text Section */}
          <motion.div
            ref={ref}
            className="lg:w-1/2 space-y-6 text-center lg:text-left"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <h3 className="text-xl text-amber-400 font-medium mb-2">
                Hello, I am
              </h3>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
                <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
                  {personal.name}
                </span>
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <TypewriterEffect words={personal.titles} speed={80} />
              </h2>
            </motion.div>
            <motion.p
              className="text-lg text-gray-300 max-w-lg mx-auto lg:mx-0"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              {personal.bio}
            </motion.p>
            <motion.div
              className="flex gap-4 justify-center lg:justify-start"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
            >
              <SocialIcon icon={Linkedin} href={social.linkedin} delay={0.1} />
              <SocialIcon
                icon={Instagram}
                href={social.instagram}
                delay={0.2}
              />
              <SocialIcon icon={Github} href={social.github} delay={0.3} />
              <SocialIcon icon={FaDiscord} href={social.discord} delay={0.4} />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.6 },
                },
              }}
            >
              <a
                href={personal.resume}
                download="Takmim_Resume"
                className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all bg-transparent rounded-full hover:bg-transparent"
              >
                <span className="absolute inset-0 border-2 border-amber-500 rounded-full"></span>
                <span className="absolute inset-0 border-2 border-orange-600 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100"></span>
                <span className="relative flex items-center justify-center gap-2 text-amber-400 group-hover:text-white transition-colors duration-300 z-10">
                  Download Resume
                  <Download className="h-5 w-5 animate-bounce-slow" />
                </span>
                <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-80"></span>
              </a>
            </motion.div>
          </motion.div>
          {/* Image Section */}
          <motion.div
            className="lg:w-1/2 flex justify-center items-center mt-10 lg:mt-0"
            style={{
              transform: `perspective(1000px) rotateY(${
                calculateTransform(mousePosition.x, mousePosition.y).x
              }deg) rotateX(${-calculateTransform(
                mousePosition.x,
                mousePosition.y
              ).y}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-full border-4 border-orange-500 overflow-hidden">
                <img
                  src={
                    personal.profileImage || "https://via.placeholder.com/400"
                  }
                  alt={personal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <motion.div
                className="absolute -bottom-4 -right-4 h-24 w-24 md:h-32 md:w-32 rounded-full bg-black flex items-center justify-center border-2 border-orange-500"
                initial={{ scale: 0, rotate: -40 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="text-center">
                  <p className="text-amber-400 text-sm font-bold">
                    {personal.experience}
                  </p>
                  <p className="text-white text-xs">Experience</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <p className="text-amber-400 text-sm mb-2">Scroll Down</p>
            <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center p-1">
              <motion.div
                className="w-1 h-2 bg-amber-400 rounded-full"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
