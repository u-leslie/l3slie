import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
} from "motion/react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { projects } from "../constants/data.ts";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
} from "lucide-react";

export default function Index() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Index");
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scrollY = useMotionValue(0);
  
  // Calculate navbar opacity based on scroll
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.95, 0.85]);
  const navbarBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.85)"]
  );

  useEffect(() => {
    setMounted(true);
    // Set default theme to light
    if (mounted && theme === "dark") {
      setTheme("light");
    }
  }, [mounted, theme, setTheme]);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <motion.nav
        className="sticky top-0 w-full z-40 py-6 backdrop-blur-sm"
        style={{
          backgroundColor: navbarBg,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-8 text-sm font-normal">
            <button
              onClick={() => setActiveTab("Index")}
              className={`${
                activeTab === "Index"
                  ? "text-black font-semibold"
                  : "text-black/50 hover:text-black"
              } transition-colors`}
            >
              Index
            </button>
            <a
              href="https://docs.google.com/document/d/1v6ctfIN5Qyp9rQWTW8hO6Tmo_B-z-DwcUgXN499r8dQ/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/50 hover:text-black transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </motion.nav>

      <main className="pt-8">
        {/* Hero Section - Minimal */}
        <section className="min-h-[80vh] flex flex-col justify-center">
          <div className="max-w-4xl mx-auto px-6 lg:px-16 py-8">
              <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-sm font-bold mb-1.5 text-black/90">
                  Anne Leslie UHIRIWE
                </h1>
                <p className="text-sm font-normal text-black/70 mb-10">
                  Software Engineer
                </p>

                {/* About */}
                <div className="max-w-2xl space-y-3 text-sm font-normal text-black/80 leading-relaxed mb-12">
                  <p>
                    I'm a software engineer and designer focused on building clean, seamless digital experiences. I enjoy crafting minimal, functional interfaces that blend aesthetics with usability, creating products that feel as good as they look.
                  </p>
                  <p>
                    I love building software, exploring new technologies and DevOps concepts, and expressing <a href="https://art.lslie.space/" target="_blank" rel="noopener noreferrer" className="font-bold text-black hover:underline">creativity through art, poetry, and photography</a>, using visuals and design to connect technology with human emotion.
                  </p>
          </div>

                {/* Works */}
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold mb-4">Works</h2>
                  {projects.map((project) => (
                      <a
                  key={project.title}
                        href={project.link || "#"}
                        target={project.link ? "_blank" : undefined}
                        rel={project.link ? "noopener noreferrer" : undefined}
                        className="group block bg-black text-white rounded-lg p-3 hover:opacity-90 transition-opacity"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-sm font-medium mb-0.5">
                              {project.title}
                            </h3>
                            <p className="text-xs font-normal text-white/80">
                              {project.description}
                            </p>
                          </div>
                          {project.link && (
                            <ExternalLink className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors ml-3 flex-shrink-0" />
                          )}
                        </div>
                      </a>
                        ))}
                      </div>

                {/* Playground Section */}
                <div className="mt-12">
                  <h2 className="text-sm font-semibold mb-4">Playground</h2>
                  <div className="space-y-2">
                    <a
                      href="http://13.60.16.21:4000/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-black text-white rounded-lg p-3 hover:opacity-90 transition-opacity"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium mb-0.5">
                            Skitt
                          </h3>
                          <p className="text-xs font-normal text-white/80">
                            Feature flags & A/B testing platform
                          </p>
                  </div>
                        <ExternalLink className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors ml-3 flex-shrink-0" />
            </div>
                    </a>
                  </div>
                  </div>

                {/* Contact Section */}
                <div className="mt-12">
                  <h2 className="text-sm font-semibold mb-6">Contact</h2>
                  <div className="flex items-center gap-6">
                    <a
                      href="https://github.com/u-leslie"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/50 hover:text-black transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/uhiriwe-anne-leslie-040552256"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/50 hover:text-black transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:anneuhiriwe@gmail.com"
                      className="text-black/50 hover:text-black transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.instagram.com/_u.leslie_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/50 hover:text-black transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}
