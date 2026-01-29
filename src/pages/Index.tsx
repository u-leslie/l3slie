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

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const cursorX = useSpring(pointerX, {
    stiffness: 800,
    damping: 40,
    mass: 0.2,
  });
  const cursorY = useSpring(pointerY, {
    stiffness: 800,
    damping: 40,
    mass: 0.2,
  });
  const auraX = useSpring(pointerX, { stiffness: 150, damping: 20 });
  const auraY = useSpring(pointerY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let rafId: number;
    let lastTime = 0;
    const throttleMs = 16; // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        pointerX.set(e.clientX);
        pointerY.set(e.clientY);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pointerX, pointerY]);

  const isDark = theme === "dark";

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 overflow-x-hidden">
      {/* Custom Cursor - Desktop Only */}
      <motion.div
        className="fixed top-0 left-0 hidden md:block w-2 h-2 rounded-full bg-black dark:bg-white pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className="fixed top-0 left-0 hidden md:block w-8 h-8 rounded-full border border-black/20 dark:border-white/20 pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ x: auraX, y: auraY }}
      />

      {/* Minimal Brown Accent Line */}
      <div className="fixed left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#8B4513]/20 to-transparent pointer-events-none z-0" />

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
          <div className="text-xs font-light hidden lg:block opacity-50">
            Available
          </div>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center relative pt-24 overflow-hidden">
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

          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <motion.div
              className="mb-20 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 dark:bg-[#D2691E]/40" />
                <div className="text-xs font-medium tracking-[0.2em] uppercase text-black/50 dark:text-white/50">
                Experience
                </div>
                <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 dark:bg-[#D2691E]/40" />
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
                  viewport={{ once: true, margin: "-100px" }}
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
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-light px-2.5 py-1 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors"
                        >
                          {tech}
                        </span>
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
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 dark:bg-[#D2691E]/40" />
                  <div className="text-xs font-light tracking-[0.2em] uppercase text-black/50 dark:text-white/50">
                Selected Work
                  </div>
                  <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 dark:bg-[#D2691E]/40" />
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
                  viewport={{ once: true, margin: "-100px" }}
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
                        {/* Subtle Background on Hover */}
                        <motion.div
                          className="absolute inset-0 bg-black/2 dark:bg-white/2 rounded-lg -z-10 will-change-opacity"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
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
                          <span
                            key={tech}
                            className="text-xs font-light text-black/50 dark:text-white/50"
                          >
                            {tech}
                            {techIndex < project.tech.length - 1 && (
                              <span className="mx-2 text-black/20 dark:text-white/20">
                                /
                              </span>
                            )}
                          </span>
                        ))}
                          </div>
                      </div>

                        {/* Bottom Border Animation */}
                      <motion.div
                          className="absolute bottom-0 left-0 right-0 h-px bg-black/10 dark:bg-white/10 will-change-transform"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isHovered ? 1 : 0.3 }}
                          transition={{ duration: 0.2 }}
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
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 dark:bg-[#D2691E]/40" />
                      <div className="text-xs font-light tracking-[0.2em] uppercase text-black/50 dark:text-white/50">
                      About
                      </div>
                      <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 dark:bg-[#D2691E]/40" />
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
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 dark:bg-[#D2691E]/40" />
                    <div className="text-xs font-light tracking-[0.2em] uppercase text-black/50 dark:text-white/50">
                  Get In Touch
                </div>
                    <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 dark:bg-[#D2691E]/40" />
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
