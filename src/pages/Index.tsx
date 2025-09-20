import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useState, useEffect } from "react";
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ChevronDown,
  Play,
} from "lucide-react";

import { Badge } from "../components/ui/badge.tsx";
import { Button } from "../components/ui/button.tsx";
import { link } from "fs";

export default function Index() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const springConfig = { damping: 25, stiffness: 700 };
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set((e.clientX - window.innerWidth / 2) / 50);
      mouseY.set((e.clientY - window.innerHeight / 2) / 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const projects = [
    {
      year: "2024",
      title: "E-Portfolio Platform",
      category: "RTB Platform",
      description:
        "Innovative e-portfolio platform for TVET schools management",
      tech: ["Next.js", "Tailwindcss"],
      //   link:"https://e-portfolio.rtb.gov.rw",
      status: "Under Development phase",
    },
    {
      year: "2024",
      title: "CSR Platform",
      category: "Corporate Social Responsibility",
      description:
        "E-learning platform for corporate social responsibility initiatives",
      tech: ["Next.js", "Tailwindcss"],
      //   link:"https://csr.vercel.app",
      status: "Under Development phase",
    },
    {
      year: "2024",
      title: "RiseWell Website",
      category: "RiseWell Organisation",
      description: "Empowering wellness with a modern web experience",
      link: "https://risewell-web.vercel.app",
      tech: ["Next.js", "Tailwindcss"],
      status: "Under Development phase",
    },
    {
      year: "2024 - 2025",
      title: "Grant Management System",
      category: "RTB Platform",
      description:
        "Revolutionary TVET grant management experience with modern web app",
      tech: ["React", "Next JS", "TailwindCss"],
      link: "http://197.243.20.222:5800/",
      status: "Live",
    },
    {
      year: "2024 - 2025",
      title: "TVET Management Portal",
      category: "RTB Platform",
      description:
        "Comprehensive TVET management portal for streamlined operations",
      tech: ["ReactJS", "Next JS"],
      link: "https://tvetmanagement.rtb.gov.rw/",
      status: "Live",
    },
    {
      year: "2023 - 2024",
      title: "Topstrate Web App",
      category: "Topskills Company",
      link: "https://topstrate.com",
      description:
        "Modern web app for TopSkills, a strategic plan management company",
      tech: ["Next.js", "Tailwindcss"],
      status: "Live",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white mix-blend-difference rounded-full pointer-events-none z-50"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 800 }}
      />

      {/* Floating Elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ x: mouseX, y: mouseY }}
      >
        <div className="absolute top-[20%] left-[10%] w-px h-32 bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-white/30 rounded-full" />
        <div className="absolute bottom-[30%] left-[20%] w-px h-20 bg-gradient-to-t from-white/10 to-transparent" />
      </motion.div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-40 mix-blend-difference"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between lg:px-32 px-8 py-8 max-w-7xl mx-auto">
          <motion.div
            className="text-sm font-light tracking-[0.2em] uppercase"
            whileHover={{ letterSpacing: "0.3em" }}
            transition={{ duration: 0.3 }}
          >
            Anne Leslie UHIRIWE
          </motion.div>

          <div className="hidden md:flex items-center gap-12 text-sm font-light">
            {["Work", "About", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative overflow-hidden group cursor-pointer"
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

          <motion.div
            className="text-sm font-light"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            Available for work
          </motion.div>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-8 relative">
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          >
            <motion.div
              className="mb-8 text-sm font-light tracking-wider opacity-60"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Frontend Developer & Creative Technologist
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                className="text-[clamp(3rem,8vw,12rem)] leading-[0.85] font-light tracking-[-0.02em]"
                style={{ y: y1 }}
              >
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 1.2,
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  Crafting Digital
                </motion.div>
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 1.4,
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white"
                >
                  Experiences
                </motion.div>
              </motion.h1>
            </div>

            <motion.p
              className="text-lg font-light leading-relaxed opacity-70 max-w-2xl mt-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              I design and develop exceptional digital products that live at the
              intersection of design, technology, and human experience.
            </motion.p>

            <motion.div
              className="flex items-center gap-8 mt-16"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-base font-light rounded-full group-hover:shadow-2xl transition-all duration-300">
                  <a href="#work">View Selected Work</a>
                  <ArrowUpRight className="ml-2 size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Button>
              </motion.div>

              <motion.a
                href="#contact"
                className="text-sm font-light tracking-wide border-b border-white/30 pb-1 hover:border-white transition-colors duration-300"
                whileHover={{ x: 10 }}
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
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-xs font-light opacity-50"
            >
              <span>Scroll to discover</span>
              <ChevronDown className="size-4" />
            </motion.div>
          </motion.div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="mb-32 lg:px-32 px-8 py-8 max-w-7xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-sm font-light tracking-wider opacity-60 mb-4">
                Selected Work
              </div>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-light leading-tight">
                Projects that push boundaries
              </h2>
            </motion.div>

            <div className="space-y-32">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.15,
                  }}
                  whileHover="hover"
                >
                  <motion.div
                    className="max-w-3xl mx-auto space-y-6 text-center lg:text-left"
                    variants={{
                      hover: { x: index % 2 === 0 ? 10 : -10 },
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Meta info */}
                    <div className="flex items-center justify-center lg:justify-start gap-4 text-sm font-light opacity-60">
                      <span>{project.year}</span>
                      <span>•</span>
                      <span>{project.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base font-light leading-relaxed opacity-70">
                      {project.description}
                    </p>

                    {/* Skills / Tech */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="text-xs font-light px-3 py-1 border border-white/20 rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 * techIndex }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Link */}
                    <motion.div
                      className="pt-4 flex gap-10"
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <a
                        href={project.link ?? "#"}
                        className="inline-flex items-center gap-2 text-sm font-light border-b border-white/30 pb-1 hover:border-white transition-colors duration-300"
                      >
                        Explore project
                        <ArrowUpRight className="size-3" />
                      </a>
                      {/* <p>{project.status}</p> */}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-32 px-8 bg-[#111111] lg:px-32 max-w-7xl mx-auto"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-16">
              <motion.div
                className="col-span-12 lg:col-span-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="space-y-8">
                  <div>
                    <div className="text-sm font-light tracking-wider opacity-60 mb-4">
                      About
                    </div>
                    <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-light leading-tight mb-8">
                      Designing the future, one pixel at a time
                    </h2>
                  </div>

                  <div className="space-y-6 text-base font-light md:leading-relaxed opacity-80">
                    <p>
                      With over 4 years of experience in digital design and
                      development, I specialize in creating sophisticated web
                      experiences that seamlessly blend aesthetics with
                      functionality.
                    </p>
                    <p>
                      My work spans across various industries, from fintech to
                      creative agencies, always focusing on user-centered design
                      principles and cutting-edge technology.
                    </p>
                  </div>

                  <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="pt-4"
                  >
                    <a
                      href="https://docs.google.com/document/d/1gJI2QopVwrJ5ZKFF9Vw6gA6OLygRsa_4/edit?usp=sharing&ouid=114032536704967458203&rtpof=true&sd=true"
                      className="inline-flex items-center gap-2 text-sm font-light border-b border-white/30 pb-1 hover:border-white transition-colors duration-300"
                    >
                      View Resume
                      <ArrowUpRight className="size-3" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="col-span-12 lg:col-span-5 lg:col-start-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.2,
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
                          className="text-sm font-light opacity-70 hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 0.7 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 10, opacity: 1 }}
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
                        },
                        {
                          label: "LinkedIn",
                          href: "www.linkedin.com/in/uhiriwe-anne-leslie-040552256 ",
                        },
                        {
                          label: "Twitter",
                          href: "https://twitter.com/ulesli3",
                        },
                      ].map((social, index) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          className="block text-sm font-light opacity-70 hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 0.7 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 10, opacity: 1 }}
                        >
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
        <section id="contact" className="py-32 px-8">
          <div className="max-w-7xl mx-auto text-center lg:px-32 px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-12"
            >
              <div>
                <div className="text-sm font-light tracking-wider opacity-60 mb-4">
                  Get In Touch
                </div>
                <h2 className="text-[clamp(2rem,6vw,5rem)] font-light leading-tight">
                  Let's create something
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                    extraordinary together
                  </span>
                </h2>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button
                  className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-lg font-light rounded-full shadow-2xl group"
                  asChild
                >
                  <a
                    href="mailto:anneuhiriwe@gmail.com"
                    className="flex items-center gap-3"
                  >
                    <Mail className="size-5" />
                    Start a conversation
                    <ArrowUpRight className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </a>
                </Button>
              </motion.div>

              <motion.p
                className="text-sm font-light opacity-60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ delay: 0.5 }}
              >
                Currently based in Rwanda, working worldwide
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center lg:px-32 px-8 ">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between gap-8 text-sm font-light opacity-60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                © {new Date().getFullYear()} Anne Leslie UHIRIWE. All rights
                reserved.
              </div>

              <div className="flex items-center gap-8">
                <span>Made with passion in Rwanda </span>
              </div>
            </motion.div>
          </div>
        </footer>
      </main>
    </div>
  );
}
