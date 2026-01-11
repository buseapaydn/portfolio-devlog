// src/App.tsx
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Moon,
  Sun,
  Mail,
  Linkedin,
  Github,
  MapPin,
  ChevronDown,
  Smartphone,
  Code2,
  Database,
  Layers,
  Gamepad2,
  Users,
  GraduationCap,
  Briefcase,
  Languages,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

const PERSONAL_INFO = {
  name: "Buse Apaydın",
  title: "Mobile Developer",
  subtitle: "React Native • Kotlin • Spring Boot",
  email: "buseapaydin8@gmail.com",
  linkedin: "https://www.linkedin.com/in/buse-apaydın-5281ab176",
  github: "https://github.com/buseapaydyn",
  location: "Istanbul, Turkey",
};

const ABOUT_TEXT = `Full-Stack Developer with experience in building scalable, user-friendly mobile and web applications using React, React Native, Java Spring Boot, and Kotlin. Skilled in real-time communication, media processing, and service integration. Strong foundation in software development lifecycle and problem-solving, with a focus on delivering sustainable and effective solutions.`;

const SKILLS = {
  mobile: {
    title: "Mobile Development",
    icon: Smartphone,
    color: "from-cyan-400 to-blue-500",
    items: ["React Native", "Expo", "CLI", "Kotlin", "Android Studio"],
  },
  frontend: {
    title: "Frontend",
    icon: Code2,
    color: "from-purple-400 to-pink-500",
    items: ["React", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  backend: {
    title: "Backend",
    icon: Database,
    color: "from-emerald-400 to-teal-500",
    items: ["Java", "Spring Boot", "REST APIs", "WebSocket", "Firebase"],
  },
  tools: {
    title: "Tools & Others",
    icon: Layers,
    color: "from-orange-400 to-red-500",
    items: ["Git", "SQL", "CI/CD", "GitHub Actions", "Jenkins"],
  },
  extra: {
    title: "Game Dev & VR",
    icon: Gamepad2,
    color: "from-violet-400 to-purple-500",
    items: ["Unity", "C#", "MVC Pattern", "VR Development"],
  },
  soft: {
    title: "Soft Skills",
    icon: Users,
    color: "from-rose-400 to-pink-500",
    items: ["Team Management", "Agile", "Problem Solving", "Planning"],
  },
};

const EXPERIENCES = [
  {
    company: "HUBX",
    location: "Istanbul",
    role: "React Native Developer",
    type: "Full-time",
    period: "10.2025 - Present",
    project: "Mobile Applications",
    platforms: "iOS & Android",
    highlights: [
      "Building scalable mobile applications using React Native",
      "Collaborating with cross-functional teams for feature development",
      "Implementing best practices for mobile app architecture",
      "Working on performance optimization and user experience improvements",
    ],
  },
  {
    company: "NETFARK INFORMATION TECHNOLOGIES",
    location: "Istanbul",
    role: "Mid. Software Developer",
    type: "Freelance",
    period: "06.2025 - 10.2025",
    project: "Sinana Mobile App",
    platforms: "iOS & Android",
    highlights: [
      "Developed a maintainable mobile app using React Native",
      "Integrated payment options for in-app purchases",
      "Managed application state using Redux",
      "Firebase Cloud Integration for real-time notifications",
      "Built communication features for consultancy services",
    ],
  },
  {
    company: "EVE MAĞAZACILIK / AYDIN HOLDİNG",
    location: "Istanbul",
    role: "Mid. Software Developer",
    type: "Full-time",
    period: "10.2023 - 05.2025",
    project: "Pluto Mobile App & Web Portal",
    platforms: "iOS & Android & Web",
    highlights: [
      "Developed maintainable mobile and web frontends using React Native with MVC architecture",
      "Built Pluto Web Portal with React for monitoring field personnel activities and reports",
      "Managed scalable application state with Redux",
      "Built flexible mobile apps using Expo for rapid prototyping and React Native CLI for production",
      "Implemented secure backend services and REST APIs with Java Spring Boot",
      "Integrated WebSocket for real-time features and data synchronization",
      "Automated CI/CD pipelines with GitHub Actions and Jenkins",
      "Ensured data security using HTTPS, OAuth2, and JWT",
    ],
  },
  {
    company: "IOTTECH Informatics and Consultancy",
    location: "Istanbul",
    role: "Jr. Software Developer",
    type: "Full-time",
    period: "06.2022 - 09.2023",
    project: "Multiple Projects",
    platforms: "iOS & Android & VR & Web",
    highlights: [
      "Developed 4 cross-platform mobile games (Rocky Plateaus, Catlicious, ColorSwitch, T Space Ships) using Unity and C#",
      "Built Neptune HandHeld Terminal app with Kotlin for barcode-based inventory tracking",
      "Created Neptune Web Portal with React for centralized inventory management",
      "Contributed to TÜBİTAK EveShop Meta VR app for Meta Quest 1/2/3 using Unity",
      "Led PhysioVR & PsychVR projects as Project Manager - developed therapeutic VR games with hand tracking",
      "Built e-Payroll React Native app with OAuth2, JWT, PDF viewing, and offline caching",
      "Applied MVC architecture and managed Git/Bitbucket workflows for Unity projects",
    ],
  },
  {
    company: "GENEMEK",
    location: "Istanbul",
    role: "R&D Intern Computer Engineer",
    type: "Internship",
    period: "2021 - 1.5 months",
    project: "AVOX Control",
    platforms: "Android",
    highlights: [
      "Developed mobile app for elevator company using Android Studio and Java",
      "Enabled automatic connection of elevators to system through sensors",
      "Implemented real-time monitoring and control features",
      "Built user account creation, elevator personalization, and malfunction detection",
      "Gained experience in embedded system integration and real-time data handling",
    ],
  },
];

const EDUCATION = [
  {
    school: "Marmara University",
    degree: "Computer Engineering",
    faculty: "Faculty of Engineering",
    period: "2020 - 2023",
  },
  {
    school: "Istanbul Şehir University",
    degree: "Computer Science and Engineering",
    faculty: "Faculty of Engineering",
    period: "2017 - 2020",
  },
];

const LANGUAGES = [
  { name: "Turkish", level: "Native", percentage: 100 },
  { name: "English", level: "B2", percentage: 75 },
  { name: "Spanish", level: "A1", percentage: 25 },
];

const REFERENCE = {
  name: "Osman Ertürk",
  title: "R&D Software Dev. Manager",
  phone: "+90 543 226 26 34",
};

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

// Animated Phone Mockup
function PhoneMockup() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [
    { bg: "from-cyan-500 to-blue-600", app: "Pluto App", icon: "📱" },
    { bg: "from-purple-500 to-pink-600", app: "Sinana", icon: "😴" },
    { bg: "from-emerald-500 to-teal-600", app: "Neptune", icon: "📦" },
    { bg: "from-orange-500 to-red-600", app: "Rocky Plateaus", icon: "🎮" },
    { bg: "from-violet-500 to-purple-600", app: "PhysioVR", icon: "🥽" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="relative"
      initial={{ rotateY: -15, rotateX: 5 }}
      animate={{
        rotateY: [-15, 15, -15],
        rotateX: [5, -5, 5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-[3rem] blur-2xl animate-pulse" />

      {/* Phone frame */}
      <div className="relative w-64 h-[520px] bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[3rem] p-2 shadow-2xl border border-zinc-700/50">
        {/* Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />

        {/* Screen */}
        <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
          {screens.map((screen, idx) => (
            <motion.div
              key={idx}
              className={`absolute inset-0 bg-gradient-to-br ${screen.bg} flex flex-col items-center justify-center`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: currentScreen === idx ? 1 : 0,
                scale: currentScreen === idx ? 1 : 0.95,
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="text-7xl mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {screen.icon}
              </motion.span>
              <span className="text-white font-bold text-xl">{screen.app}</span>
              <span className="text-white/60 text-sm mt-2">by Buse Apaydın</span>
            </motion.div>
          ))}

          {/* Status bar simulation */}
          <div className="absolute top-8 left-0 right-0 flex justify-between px-8 text-white/80 text-xs font-medium">
            <span>9:41</span>
            <div className="flex gap-1">
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full" />
        </div>
      </div>

      {/* Floating tech badges */}
      <motion.div
        className="absolute -right-16 top-16 px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-cyan-400 text-sm font-medium backdrop-blur-sm"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        React Native
      </motion.div>
      <motion.div
        className="absolute -left-20 top-32 px-3 py-1.5 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-400 text-sm font-medium backdrop-blur-sm"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        Kotlin
      </motion.div>
      <motion.div
        className="absolute -right-12 bottom-32 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-400 text-sm font-medium backdrop-blur-sm"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        Spring Boot
      </motion.div>
    </motion.div>
  );
}

// Skill Card Component
function SkillCard({
  skill,
  index,
}: {
  skill: (typeof SKILLS)[keyof typeof SKILLS];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const Icon = skill.icon;

    return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm" />
      <div className="relative bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-3">{skill.title}</h3>
        <div className="flex flex-wrap gap-2">
          {skill.items.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-lg border border-zinc-700/50"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Experience Timeline Item
function ExperienceItem({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCES)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative pl-8 pb-12 border-l-2 border-cyan-500/30 last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" />

      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
            <p className="text-cyan-400 font-medium">{exp.company}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-sm rounded-full border border-cyan-500/20">
              {exp.period}
            </span>
            <span className="text-zinc-500 text-sm">{exp.type}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-zinc-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {exp.location}
          </span>
          <span className="flex items-center gap-1">
            <Smartphone className="w-4 h-4" /> {exp.platforms}
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-lg text-sm font-medium mb-4 border border-purple-500/20">
          📱 {exp.project}
        </div>

        <ul className="space-y-2">
          {exp.highlights.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
              className="flex items-start gap-2 text-zinc-400 text-sm"
            >
              <span className="text-cyan-500 mt-1">▹</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// Animated Background
function AnimatedBackground() {
    return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[128px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}

// Floating Nav
function FloatingNav({
  theme,
  setTheme,
}: {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.a
          href="#hero"
          className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          BA<span className="text-zinc-500">.</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
            >
              {s.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:border-cyan-500/50 transition-all"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </nav>
    </motion.header>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────────────────────────────────── */

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    useEffect(() => {
    document.documentElement.classList.add("dark");
    }, []);

    return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatedBackground />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <FloatingNav theme={theme} setTheme={setTheme} />

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm mb-6"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Turning ideas into apps
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-zinc-300">Hi, I'm</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-zinc-400 mb-4">
              {PERSONAL_INFO.title}
            </p>

            <p className="text-zinc-500 mb-8 max-w-lg">
              {PERSONAL_INFO.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-medium text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
              >
                Get in Touch
              </motion.a>
              <motion.a
                href="#experience"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-zinc-700 rounded-xl font-medium text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-600 transition-colors"
              >
                View My Work
              </motion.a>
                    </div>

            <div className="flex items-center gap-4 mt-10">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              >
                <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              >
                <Github className="w-5 h-5" />
                                </a>
                            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <PhoneMockup />
          </motion.div>
                        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* ════════════════════════ ABOUT ════════════════════════ */}
      <section id="about" className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl" />
            <div className="relative bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 sm:p-12">
              <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed">
                {ABOUT_TEXT}
              </p>

              <div className="mt-8 pt-8 border-t border-zinc-800 grid sm:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    3+
                  </div>
                  <div className="text-zinc-500 mt-1">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    10+
                  </div>
                  <div className="text-zinc-500 mt-1">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                    4
                  </div>
                  <div className="text-zinc-500 mt-1">Published Games</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    3
                  </div>
                  <div className="text-zinc-500 mt-1">VR Projects</div>
                            </div>
                        </div>
            </div>
          </motion.div>
                    </div>
                </section>

      {/* ════════════════════════ SKILLS ════════════════════════ */}
      <section id="skills" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Skills & Technologies
              </span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern mobile and web applications
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(SKILLS).map((skill, index) => (
              <SkillCard key={skill.title} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

      {/* ════════════════════════ EXPERIENCE ════════════════════════ */}
      <section id="experience" className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              My professional journey in mobile development
            </p>
          </motion.div>

          <div className="space-y-0">
            {EXPERIENCES.map((exp, index) => (
              <ExperienceItem key={exp.company} exp={exp} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

      {/* ════════════════════════ EDUCATION ════════════════════════ */}
      <section id="education" className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Education & Languages
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>

              <div className="space-y-4">
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.school}
                    className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 hover:border-cyan-500/30 transition-colors"
                  >
                    <h4 className="text-lg font-semibold text-white">{edu.school}</h4>
                    <p className="text-cyan-400">{edu.degree}</p>
                    <p className="text-zinc-500 text-sm">{edu.faculty}</p>
                    <p className="text-zinc-600 text-sm mt-2">{edu.period}</p>
                                </div>
                            ))}
                        </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <Languages className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Languages</h3>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6">
                {LANGUAGES.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{lang.name}</span>
                      <span className="text-cyan-400">{lang.level}</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Reference */}
              <div className="mt-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <Briefcase className="w-5 h-5 text-emerald-400" />
                            </div>
                  <span className="text-zinc-400 text-sm">Reference</span>
                                </div>
                <p className="text-white font-semibold">{REFERENCE.name}</p>
                <p className="text-cyan-400 text-sm">{REFERENCE.title}</p>
                <p className="text-zinc-500 text-sm mt-1">{REFERENCE.phone}</p>
                            </div>
            </motion.div>
                        </div>
                    </div>
                </section>

      {/* ════════════════════════ CONTACT ════════════════════════ */}
      <section id="contact" className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-3 gap-4"
          >
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="group bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">Email</h3>
              <p className="text-zinc-500 text-sm break-all">{PERSONAL_INFO.email}</p>
            </a>


            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Linkedin className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">LinkedIn</h3>
              <p className="text-zinc-500 text-sm">Connect with me</p>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-pink-500/50 transition-all text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-pink-500/20 to-pink-500/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Github className="w-7 h-7 text-pink-400" />
                            </div>
              <h3 className="text-white font-semibold mb-1">GitHub</h3>
              <p className="text-zinc-500 text-sm">View my code</p>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-zinc-400 text-sm">
              <MapPin className="w-4 h-4" />
              {PERSONAL_INFO.location}
                        </div>
          </motion.div>
                    </div>
                </section>

      {/* ════════════════════════ FOOTER ════════════════════════ */}
      <footer className="border-t border-zinc-800/50 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React & Framer Motion.
          </p>
          <div className="flex items-center gap-4">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-zinc-500 hover:text-cyan-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-cyan-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-cyan-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
                        </div>
                    </div>
                </footer>
        </div>
    );
}
