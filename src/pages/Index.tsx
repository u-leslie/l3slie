import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { experiences, projects } from "../constants/data.ts";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ChevronDown,
  Moon,
  Sun,
  ExternalLink,
} from "lucide-react";

import { Badge } from "../components/ui/badge.tsx";
import { Button } from "../components/ui/button.tsx";

export default function Index() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const brownOverlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.1, 0.2, 0.1]
  );

  const springConfig = { damping: 30, stiffness: 500 };
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const cursorX = useSpring(pointerX, {
    stiffness: 1500,
    damping: 50,
    mass: 0.15,
  });
  const cursorY = useSpring(pointerY, {
    stiffness: 1500,
    damping: 50,
    mass: 0.15,
  });
  const auraX = useSpring(pointerX, { stiffness: 200, damping: 25 });
  const auraY = useSpring(pointerY, { stiffness: 200, damping: 25 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
      mouseX.set((e.clientX - window.innerWidth / 2) / 60);
      mouseY.set((e.clientY - window.innerHeight / 2) / 60);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, pointerX, pointerY]);

  const isDark = theme === "dark";

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 overflow-x-hidden">
      {/* Custom Cursor - Desktop Only */}
      <motion.div
        className="fixed top-0 left-0 hidden md:block w-2 h-2 rounded-full bg-black dark:bg-white pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className="fixed top-0 left-0 hidden md:block w-8 h-8 rounded-full border border-black/20 dark:border-white/20 pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2"
        style={{ x: auraX, y: auraY }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.9, 1.05, 0.9],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle Background Elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ x: mouseX, y: mouseY }}
      >
        <div className="absolute top-[15%] left-[8%] w-px h-24 bg-gradient-to-b from-black/5 dark:from-white/5 to-transparent" />
        <div className="absolute top-[55%] right-[12%] w-1.5 h-1.5 bg-black/10 dark:bg-white/10 rounded-full" />
        <div className="absolute bottom-[25%] left-[15%] w-px h-16 bg-gradient-to-t from-black/5 dark:from-white/5 to-transparent" />
      </motion.div>

      {/* Cool Brown Background Animations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Animated Brown Gradient Blobs */}
        <motion.div
          className="absolute top-0 -left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 dark:opacity-10"
          style={{
            background: "radial-gradient(circle, #8B4513 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 150, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 -right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 dark:opacity-8"
          style={{
            background: "radial-gradient(circle, #D2691E 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -120, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 dark:opacity-5"
          style={{
            background: "radial-gradient(circle, #A0522D 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 60, -60, 0],
            y: [0, -80, 80, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Brown Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-sm"
            style={{
              width: `${20 + i * 15}px`,
              height: `${20 + i * 15}px`,
              background: i % 2 === 0 ? "#8B4513" : "#D2691E",
              opacity: 0.15,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.15, 0.25, 0.15],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Scroll-based Brown Gradient Overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              rgba(139, 69, 19, 0.03) 0%, 
              transparent 50%, 
              rgba(210, 105, 30, 0.03) 100%)`,
            opacity: brownOverlayOpacity,
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/5 dark:border-white/5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-6 flex items-center justify-between">
          <motion.a
            href="#"
            className="text-sm font-medium tracking-[0.15em] uppercase"
            whileHover={{ letterSpacing: "0.2em" }}
            transition={{ duration: 0.3 }}
          >
            Anne Leslie UHIRIWE
          </motion.a>

          <div className="hidden md:flex items-center gap-10 text-sm font-light">
            {["Work", "About", "Experience", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative overflow-hidden group"
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  variants={{
                    initial: { y: 0 },
                    hover: { y: "-100%" },
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item}
                </motion.div>
                <motion.div
                  className="absolute top-0"
                  variants={{
                    initial: { y: "100%" },
                    hover: { y: 0 },
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item}
                </motion.div>
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {mounted && (
              <motion.button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
            <motion.div
              className="text-xs font-light hidden lg:block"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Available
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center relative pt-24 overflow-hidden">
          {/* Hero Brown Background Animation */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <motion.div
              className="absolute top-1/4 right-1/4 w-[800px] h-[800px] rounded-full blur-3xl opacity-15 dark:opacity-8"
              style={{
                background:
                  "radial-gradient(circle, #8B4513 0%, transparent 70%)",
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-12 dark:opacity-6"
              style={{
                background:
                  "radial-gradient(circle, #D2691E 0%, transparent 70%)",
              }}
              animate={{
                x: [0, -40, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-16 relative z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.div
                className="mb-6 text-xs font-light tracking-[0.2em] uppercase text-black/60 dark:text-white/60"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Frontend Developer & Creative Technologist
              </motion.div>

              <div className="space-y-2">
                <motion.h1
                  className="text-[clamp(2.5rem,7vw,10rem)] leading-[0.9] font-light tracking-[-0.03em]"
                  style={{ y: y1 }}
                >
                  <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.9,
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    Crafting Digital
                  </motion.div>
                  <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 1.1,
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-black/90 dark:text-white/90"
                  >
                    Experiences
                  </motion.div>
                </motion.h1>
              </div>

              <motion.p
                className="text-lg font-light leading-relaxed text-black/70 dark:text-white/70 max-w-2xl mx-auto mt-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                I'm Uhiriwe Anne Leslie, creating digital products where design
                and code come together to deliver smooth, user-friendly
                experiences.
              </motion.p>

              <motion.div
                className="flex items-center justify-center gap-6 mt-16"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                <motion.a
                  href="#work"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-[#8B4513] dark:hover:bg-[#D2691E] px-8 py-5 text-sm font-light rounded-none border-2 border-black dark:border-white transition-all duration-300 group-hover:shadow-lg group-hover:border-[#8B4513] dark:group-hover:border-[#D2691E]">
                    <span>View Selected Work</span>
                    <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Button>
                </motion.a>

                <motion.a
                  href="#contact"
                  className="text-sm font-light tracking-wide border-b border-black/30 dark:border-white/30 pb-1 hover:border-[#8B4513] dark:hover:border-[#D2691E] transition-colors duration-300"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  Get in touch
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center gap-2 text-xs font-light text-black/50 dark:text-white/50"
              >
                <span>Scroll to discover</span>
                <ChevronDown className="w-3 h-3" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <motion.div
              className="mb-20 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-black/50 dark:text-white/50 mb-3">
                Experience
              </div>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight">
                My{" "}
                <span className="text-black/60 dark:text-white/60">
                  professional journey
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  className="group relative border border-black/10 dark:border-white/10 bg-white dark:bg-black p-8 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -4 }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="text-xs font-medium text-black/50 dark:text-white/50 tracking-wider">
                        {exp.year}
                      </div>
                      <div className="w-2 h-2 rounded-full bg-black dark:bg-white opacity-20 group-hover:opacity-40 transition-opacity" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-light">{exp.title}</h3>
                      <p className="text-sm font-light text-black/60 dark:text-white/60">
                        {exp.company}
                      </p>
                      <p className="text-sm font-light text-black/70 dark:text-white/70 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 dark:border-white/5">
                      {exp.tech.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className="text-xs font-light px-2.5 py-1 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-32 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            {/* Unique Minimal Typography-Focused Layout */}
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="mb-20 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-xs font-light tracking-[0.2em] uppercase text-black/50 dark:text-white/50 mb-3">
                  Selected Work
                </div>
                <h2 className="text-[clamp(2rem,5vw,4rem)] font-light leading-tight">
                  Projects that push boundaries
                </h2>
              </motion.div>

              <div className="space-y-8">
                {projects.map((project, index) => {
                  const isHovered = hoveredProject === index;

                  return (
                    <motion.article
                      key={project.title}
                      className="group relative"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay: index * 0.08,
                      }}
                      onHoverStart={() => setHoveredProject(index)}
                      onHoverEnd={() => setHoveredProject(null)}
                    >
                      <motion.a
                        href={project.link || "#"}
                        target={project.link ? "_blank" : undefined}
                        rel={project.link ? "noopener noreferrer" : undefined}
                        className="block py-6 relative"
                      >
                        {/* Subtle Background on Hover with Brown Glow */}
                        <motion.div
                          className="absolute inset-0 bg-black/2 dark:bg-white/2 rounded-lg -z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-lg -z-10 blur-xl"
                          style={{
                            background: isHovered
                              ? "radial-gradient(circle, rgba(139, 69, 19, 0.15) 0%, transparent 70%)"
                              : "transparent",
                          }}
                          animate={{
                            opacity: isHovered ? [0.3, 0.5, 0.3] : 0,
                            scale: isHovered ? [1, 1.1, 1] : 1,
                          }}
                          transition={{
                            duration: 3,
                            repeat: isHovered ? Infinity : 0,
                            ease: "easeInOut",
                          }}
                        />

                        <div className="space-y-3">
                          {/* Top Row - Meta & Link */}
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="text-xs font-light text-black/30 dark:text-white/30">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="text-xs font-light text-black/40 dark:text-white/40">
                                {project.year}
                              </span>
                              <span className="text-xs font-light text-black/30 dark:text-white/30">
                                •
                              </span>
                              <span className="text-xs font-light text-black/50 dark:text-white/50 uppercase tracking-wider">
                                {project.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className="bg-black/5 dark:bg-white/5 text-black dark:text-white border border-black/10 dark:border-white/10 rounded-full text-xs font-light px-2.5 py-0.5">
                                {project.status}
                              </Badge>
                              {project.link && (
                                <motion.div
                                  animate={{
                                    opacity: isHovered ? 1 : 0.3,
                                    x: isHovered ? 0 : -5,
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ArrowUpRight className="w-4 h-4 text-black/40 dark:text-white/40" />
                                </motion.div>
                              )}
                            </div>
                          </div>

                          {/* Title */}
                          <motion.h3 className="text-2xl lg:text-3xl font-light leading-tight  group-hover:text-black/90 dark:group-hover:text-white/90 transition-colors">
                            {project.title}
                          </motion.h3>

                          {/* Description */}
                          <p className="text-sm font-light text-black/70 dark:text-white/70 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tech Stack - Minimal */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
                            {project.tech.map((tech, techIndex) => (
                              <motion.span
                                key={tech}
                                className="text-xs font-light text-black/50 dark:text-white/50"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: techIndex * 0.02 }}
                                whileHover={{ x: 2, opacity: 1 }}
                              >
                                {tech}
                                {techIndex < project.tech.length - 1 && (
                                  <span className="mx-2 text-black/20 dark:text-white/20">
                                    /
                                  </span>
                                )}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Border Animation */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-px bg-black/10 dark:bg-white/10"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isHovered ? 1 : 0.3 }}
                          transition={{ duration: 0.4 }}
                        />
                      </motion.a>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-32 bg-white dark:bg-black border-t border-black/5 dark:border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <motion.div
                className="lg:col-span-7"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="space-y-8">
                  <div>
                    <div className="text-xs font-light tracking-[0.2em] uppercase text-black/50 dark:text-white/50 mb-4">
                      About
                    </div>
                    <h2 className="text-[clamp(2rem,4vw,3rem)] font-light leading-tight mb-8">
                      Designing the future, one pixel at a time
                    </h2>
                  </div>

                  <div className="space-y-6 text-base font-light leading-relaxed text-black/70 dark:text-white/70">
                    <p>
                      I'm Leslie, a digital creator with over 4 years of
                      experience in design and development. I love crafting web
                      experiences that feel as good as they look, blending
                      aesthetics with functionality.
                    </p>
                    <p>
                      I've worked on a variety of projects — from e-portfolios
                      and CSR platforms to management systems and modern web
                      apps — all built with a focus on clean design, great user
                      experience, and smart technology.
                    </p>
                  </div>

                  <motion.a
                    href="https://docs.google.com/document/d/1v6ctfIN5Qyp9rQWTW8hO6Tmo_B-z-DwcUgXN499r8dQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-light border-b border-black/30 dark:border-white/30 pb-1 hover:border-[#8B4513] dark:hover:border-[#D2691E] transition-colors duration-300 group"
                    whileHover={{ x: 8 }}
                  >
                    View Resume
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                className="lg:col-span-5"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="space-y-12">
                  <div>
                    <h3 className="text-lg font-light mb-8">Expertise</h3>
                    <div className="space-y-4">
                      {[
                        "Frontend Development",
                        "UI/UX Design",
                        "Creative Development",
                        "Web Performance",
                      ].map((skill, index) => (
                        <motion.div
                          key={skill}
                          className="text-sm font-light text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors duration-300"
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 8 }}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-light mb-8">Connect</h3>
                    <div className="space-y-4">
                      {[
                        {
                          label: "GitHub",
                          href: "https://github.com/u-leslie",
                          icon: Github,
                        },
                        {
                          label: "LinkedIn",
                          href: "https://www.linkedin.com/in/uhiriwe-anne-leslie-040552256",
                          icon: Linkedin,
                        },
                        {
                          label: "Email",
                          href: "mailto:anneuhiriwe@gmail.com",
                          icon: Mail,
                        },
                      ].map((social, index) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm font-light text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors duration-300 group"
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 8 }}
                        >
                          <social.icon className="w-4 h-4" />
                          {social.label}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-32 bg-white dark:bg-black border-t border-black/5 dark:border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-12"
              >
                <div>
                  <div className="text-xs font-light tracking-[0.2em] uppercase text-black/50 dark:text-white/50 mb-4">
                    Get In Touch
                  </div>
                  <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-tight">
                    Let's create something
                    <br />
                    <span className="text-black/80 dark:text-white/80">
                      extraordinary together
                    </span>
                  </h2>
                </div>

                <motion.a
                  href="mailto:anneuhiriwe@gmail.com"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block group"
                >
                  <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-[#8B4513] dark:hover:bg-[#D2691E] px-12 py-6 text-base font-light rounded-none border-2 border-black dark:border-white transition-all duration-300 group-hover:shadow-lg group-hover:border-[#8B4513] dark:group-hover:border-[#D2691E]">
                    <Mail className="w-5 h-5 mr-3" />
                    Start a conversation
                    <ArrowUpRight className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Button>
                </motion.a>

                <motion.p
                  className="text-sm font-light text-black/50 dark:text-white/50"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Currently based in Rwanda, working worldwide
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-light text-black/50 dark:text-white/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                © {new Date().getFullYear()} Anne Leslie UHIRIWE. All rights
                reserved.
              </div>
              <div className="flex items-center gap-6">
                <span>Made with passion in Rwanda</span>
              </div>
            </motion.div>
          </div>
        </footer>
      </main>
    </div>
  );
}
