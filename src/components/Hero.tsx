import React, { useEffect, useMemo, useState } from "react";
import { Moon, Sun, ArrowUpRight, ChevronDown } from "lucide-react";

// ----------------------------------------------
//  Tek Sayfa Portföy – React + Tailwind
//  Başlıklar: Çalışmalar, Katkılar, Konuşmalar, Topluluk, İletişim, Özgeçmiş
//  Özellikler: Sabit header, aktif link vurgusu, yumuşak scroll,
//              light/dark mod, erişilebilirlik, mint gradient arka plan
// ----------------------------------------------

const SECTIONS = [
    { id: "works", label: "Çalışmalar" },
    { id: "contributions", label: "Katkılar" },
    { id: "talks", label: "Konuşmalar" },
    { id: "community", label: "Topluluk" },
    { id: "contact", label: "İletişim" },
    { id: "resume", label: "Özgeçmiş" },
] as const;

type SectionId = typeof SECTIONS[number]["id"];

export default function PortfolioOnePage() {
    // ---- Tema (light/dark) -------------------------------------------------
    const prefersDark = useMemo(
        () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches,
        []
    );
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "light";
        const saved = window.localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") return saved;
        return prefersDark ? "dark" : "light";
    });

    useEffect(() => {
        // HTML köküne de yazalım (global)
        const root = document.documentElement;
        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    // ---- Aktif bölüm takibi ------------------------------------------------
    const [active, setActive] = useState<SectionId>("works");

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        const id = e.target.getAttribute("id") as SectionId | null;
                        if (id) setActive(id);
                    }
                }
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
        );

        SECTIONS.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    const onJump = (id: SectionId) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
            {/* Arka plan: mint/ışık degrade, koyu modda kömür tonlar */}
            <div className="relative min-h-screen scroll-smooth bg-gradient-to-b from-emerald-50/70 via-white to-white dark:from-zinc-900 dark:via-zinc-950 dark:to-black text-zinc-800 dark:text-zinc-100">
                {/* Yumuşak büyük eliptik ışık lekeleri */}
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(70%_60%_at_50%_20%,black,transparent)]">
                    <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-500/10" />
                    <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-400/10" />
                </div>

                {/* Header */}
                <header className="sticky top-0 z-50 w-full border-b border-zinc-200/70 bg-white/70 backdrop-blur-md dark:border-zinc-800/70 dark:bg-black/40">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                        <a href="#works" onClick={(e)=>{e.preventDefault(); onJump("works");}} className="group inline-flex items-center gap-2 text-xl font-semibold tracking-tight">
              <span className="relative">
                Buse&nbsp;Apaydın
                <span className="absolute -right-2 -top-1 h-2 w-2 rounded-full bg-emerald-500/90 ring-2 ring-emerald-500/20" />
              </span>
                            <span className="sr-only">Ana sayfa</span>
                        </a>

                        <nav aria-label="Birincil" className="hidden items-center gap-1 md:flex">
                            {SECTIONS.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => onJump(s.id)}
                                    className={`rounded-full px-3 py-2 text-sm transition-colors hover:bg-zinc-900/5 dark:hover:bg-white/5 ${
                                        active === s.id ? "text-emerald-700 dark:text-emerald-300" : "text-zinc-700 dark:text-zinc-300"
                                    }`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            <button
                                aria-label="Tema değiştir"
                                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/70 bg-white/70 shadow-sm transition hover:scale-[1.03] dark:border-zinc-800/70 dark:bg-zinc-900"
                            >
                                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Hero */}
                <section id="hero" className="relative mx-auto max-w-6xl px-4 pb-8 pt-16 sm:pt-24">
                    <div className="grid items-center gap-10 md:grid-cols-2">
                        <div>
                            <h1 className="mb-6 text-5xl font-serif leading-[1.05] sm:text-6xl">Merhaba, ben <span className="text-emerald-700 dark:text-emerald-300">Buse</span>.</h1>
                            <p className="max-w-xl text-lg text-zinc-700 dark:text-zinc-300">
                                Full‑Stack (React / React Native / Spring Boot) geliştiricisiyim. Kullanıcı odaklı ürünler
                                geliştirir, performans & erişilebilirlik standartlarına özen gösteririm. Aşağıda seçki işlerim,
                                açık kaynak katkılarım ve konuşmalarım var.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a href="#works" onClick={(e)=>{e.preventDefault(); onJump("works");}} className="inline-flex items-center gap-2 rounded-full border border-transparent bg-emerald-600 px-4 py-2 text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950">
                                    Çalışmaları Gör
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                                <a href="#contact" onClick={(e)=>{e.preventDefault(); onJump("contact");}} className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-zinc-800 transition hover:bg-zinc-900/5 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-white/5">
                                    İletişim
                                </a>
                            </div>
                        </div>

                        <div className="relative mx-auto aspect-square w-64 sm:w-80 md:w-full max-w-sm">
                            <div className="absolute inset-0 rounded-[2rem] bg-zinc-900/90 shadow-2xl ring-1 ring-black/10 dark:bg-zinc-800" />
                            <div className="absolute inset-2 rounded-[1.75rem] bg-gradient-to-br from-emerald-200/60 to-emerald-100/30 blur-xl dark:from-emerald-400/10 dark:to-emerald-300/5" />
                            <div className="relative z-10 flex h-full items-center justify-center rounded-[2rem]">
                                <span className="text-7xl">👩🏻‍💻</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Çalışmalar */}
                <section id="works" className="scroll-mt-24 border-t border-zinc-200/70 bg-transparent px-4 py-16 dark:border-zinc-800/70">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="mb-2 text-4xl font-serif">Seçili Projeler</h2>
                        <p className="mb-8 max-w-2xl text-zinc-600 dark:text-zinc-400">Gerçek projelerden bir seçki. Performans, temiz mimari ve kullanıcı deneyimi odaklı.</p>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    title: "Emlaksepette – Mobil",
                                    desc: "Gelişmiş filtreler, harita, bildirimler, derin linkler ve offline cache.",
                                    tags: ["React Native", "Redux", "Firebase"],
                                    link: "#",
                                },
                                {
                                    title: "Sinana – Uyku Programı",
                                    desc: "Video içerik, günlük görev akışları, premium/abonelik entegrasyonu.",
                                    tags: ["React Native", "RevenueCat", "WebSocket"],
                                    link: "#",
                                },
                                {
                                    title: "PlantApp – Web Portal",
                                    desc: "Bitki tanıma, kategori yönetimi ve içerik panelleri.",
                                    tags: ["React", "Vite", "Strapi"],
                                    link: "#",
                                },
                            ].map((p, i) => (
                                <a
                                    key={i}
                                    href={p.link}
                                    className="group relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-white/70 p-5 shadow-sm ring-1 ring-black/5 transition hover:shadow-md dark:border-white/10 dark:bg-zinc-900/40"
                                >
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_10%,rgba(16,185,129,0.12),transparent)] opacity-0 transition group-hover:opacity-100" />
                                    <h3 className="mb-2 text-2xl font-serif text-emerald-800 dark:text-emerald-300">{p.title}</h3>
                                    <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{p.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {p.tags.map((t) => (
                                            <span key={t} className="rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs text-emerald-800 ring-1 ring-emerald-600/15 dark:text-emerald-300">
                        {t}
                      </span>
                                        ))}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Katkılar */}
                <section id="contributions" className="scroll-mt-24 border-t border-zinc-200/70 px-4 py-16 dark:border-zinc-800/70">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="mb-2 text-4xl font-serif">Açık Kaynak Katkıları</h2>
                        <p className="mb-6 max-w-2xl text-zinc-600 dark:text-zinc-400">Küçük ama anlamlı PR'lar, örnekler ve makaleler.</p>
                        <ul className="space-y-3">
                            {[
                                { repo: "react-native-vision-camera örnekleri", link: "#" },
                                { repo: "redux-toolkit boilerplate düzeltmeleri", link: "#" },
                                { repo: "tailwind + RN stil rehberi notları", link: "#" },
                            ].map((c) => (
                                <li key={c.repo} className="flex items-center justify-between rounded-xl border border-zinc-200/70 bg-white/70 p-4 dark:border-zinc-800/70 dark:bg-zinc-900/40">
                                    <span>{c.repo}</span>
                                    <a href={c.link} className="inline-flex items-center gap-1 text-emerald-700 transition hover:underline dark:text-emerald-300">
                                        Gör <ArrowUpRight className="h-4 w-4" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Konuşmalar */}
                <section id="talks" className="scroll-mt-24 border-t border-zinc-200/70 px-4 py-16 dark:border-zinc-800/70">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="mb-2 text-4xl font-serif">Konuşmalar</h2>
                        <p className="mb-8 max-w-2xl text-zinc-600 dark:text-zinc-400">Topluluk buluşmaları ve şirket içi paylaşımlar.</p>

                        <div className="space-y-4">
                            {["2024 – Günümüz", "2023", "2022"].map((year, i) => (
                                <details key={i} className="group overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 open:shadow-md dark:border-zinc-800/70 dark:bg-zinc-900/40">
                                    <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-lg font-medium">
                                        <span>{year}</span>
                                        <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                                    </summary>
                                    <div className="space-y-3 border-t border-zinc-200/70 px-5 py-4 text-sm leading-relaxed dark:border-zinc-800/70">
                                        <p><strong>React Native Performans İpuçları</strong> – JS thread optimizasyonu, Reanimated, memo & listeler.</p>
                                        <p><strong>Mobilde Erişilebilirlik</strong> – Ekran okuyucu, kontrast, dokunmatik hedefler.</p>
                                        <p><strong>Full‑Stack Kariyer Yolculuğu</strong> – RN + Spring Boot ile uçtan uca geliştirme.</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Topluluk */}
                <section id="community" className="scroll-mt-24 border-t border-zinc-200/70 px-4 py-16 dark:border-zinc-800/70">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="mb-2 text-4xl font-serif">Topluluk</h2>
                        <p className="mb-8 max-w-2xl text-zinc-600 dark:text-zinc-400">Mentorluk, meet‑up'lar ve içerik üretimi.</p>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                { title: "RN İstanbul", desc: "Aylık mini sunumlar ve soru‑cevap." },
                                { title: "Kadın Yazılımcılar", desc: "Mentorluk ve kariyer eşleştirmeleri." },
                                { title: "Dev.to & Medium", desc: "Makale ve notlar paylaşıyorum." },
                            ].map((c) => (
                                <div key={c.title} className="rounded-3xl border border-zinc-200/70 bg-white/70 p-5 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900/40">
                                    <h3 className="mb-1 text-xl font-semibold">{c.title}</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* İletişim */}
                <section id="contact" className="scroll-mt-24 border-t border-zinc-200/70 px-4 py-16 dark:border-zinc-800/70">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="mb-2 text-4xl font-serif">İletişim</h2>
                        <p className="mb-6 max-w-2xl text-zinc-600 dark:text-zinc-400">Proje, danışmanlık ya da konuşma davetleri için bana ulaşın.</p>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-3xl border border-zinc-200/70 bg-white/70 p-5 dark:border-zinc-800/70 dark:bg-zinc-900/40">
                                <h3 className="mb-2 font-semibold">Bağlantılar</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a className="text-emerald-700 hover:underline dark:text-emerald-300" href="mailto:buse@example.com">buse@example.com</a>
                                    </li>
                                    <li>
                                        <a className="text-emerald-700 hover:underline dark:text-emerald-300" href="#">LinkedIn</a>
                                    </li>
                                    <li>
                                        <a className="text-emerald-700 hover:underline dark:text-emerald-300" href="#">GitHub</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-3xl border border-zinc-200/70 bg-white/70 p-5 dark:border-zinc-800/70 dark:bg-zinc-900/40">
                                <h3 className="mb-2 font-semibold">Kısa Not</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">Kısaca fikrinizden bahsedin, müsaitlik ve yol haritası ile dönüş yapayım.</p>
                                <div className="mt-4 grid grid-cols-1 gap-3">
                                    <input className="rounded-xl border border-zinc-300 bg-white/80 px-3 py-2 text-sm outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950" placeholder="Ad / Şirket" />
                                    <input className="rounded-xl border border-zinc-300 bg-white/80 px-3 py-2 text-sm outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950" placeholder="E‑posta" />
                                    <textarea rows={4} className="rounded-xl border border-zinc-300 bg-white/80 px-3 py-2 text-sm outline-none ring-emerald-500/30 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950" placeholder="Mesaj" />
                                    <button className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700">Gönder</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Özgeçmiş */}
                <section id="resume" className="scroll-mt-24 border-t border-zinc-200/70 px-4 py-16 dark:border-zinc-800/70">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="mb-2 text-4xl font-serif">Özgeçmiş</h2>
                        <p className="mb-6 max-w-2xl text-zinc-600 dark:text-zinc-400">Öne çıkanlar ve PDF indir seçeneği.</p>

                        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
                            <ul className="space-y-3 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 dark:border-zinc-800/70 dark:bg-zinc-900/40">
                                <li><strong>7+ yıl</strong> deneyim, mobil & web odağı.</li>
                                <li>React Native 0.74+, Redux Toolkit, RTK Query.</li>
                                <li>Java 21 / Spring Boot 3.5, WebSocket, RabbitMQ.</li>
                                <li>CI/CD ve mağaza dağıtımları (TestFlight, Play Console).</li>
                            </ul>

                            <div className="rounded-3xl border border-zinc-200/70 bg-white/70 p-5 text-center dark:border-zinc-800/70 dark:bg-zinc-900/40">
                                <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">Detaylı CV'yi indirin.</p>
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                                >
                                    PDF İndir <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-zinc-200/70 px-4 py-10 text-sm text-zinc-600 dark:border-zinc-800/70 dark:text-zinc-400">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
                        <p>© {new Date().getFullYear()} Buse Apaydın. Her hakkı saklıdır.</p>
                        <div className="flex items-center gap-3">
                            {SECTIONS.map((s) => (
                                <button key={s.id} onClick={() => onJump(s.id)} className="rounded-full px-3 py-1 hover:bg-zinc-900/5 dark:hover:bg-white/5">
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
