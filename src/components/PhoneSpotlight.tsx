import React, { useEffect, useMemo, useRef, useState } from "react";

export type DemoSlide = {
    id: string;
    title: string;
    subtitle: string;
    media: string;          // png / jpg / gif / mp4 poster gibi görsel de olur
    cta?: { label: string; href: string }[];
};

type Props = {
    slides: DemoSlide[];
    autoPlay?: boolean;
    intervalMs?: number;      // default 4500
    className?: string;
};

const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function PhoneSpotlight({
                                           slides,
                                           autoPlay = true,
                                           intervalMs = 4500,
                                           className
                                       }: Props) {
    const [index, setIndex] = useState(0);
    const [isHover, setIsHover] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const safeSlides = slides?.length ? slides : [];
    const active = safeSlides[index];

    // autoplay
    useEffect(() => {
        if (!autoPlay || prefersReducedMotion) return;
        if (isHover) return;
        const t = setInterval(() => {
            setIndex((i) => (i + 1) % safeSlides.length);
        }, intervalMs);
        return () => clearInterval(t);
    }, [autoPlay, intervalMs, safeSlides.length, isHover]);

    // klavye ok tuşları
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next();
            else if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const next = () => setIndex((i) => (i + 1) % safeSlides.length);
    const prev = () => setIndex((i) => (i - 1 + safeSlides.length) % safeSlides.length);

    const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
        const start = touchStartX.current;
        const end = e.changedTouches[0].clientX;
        if (start == null) return;
        const dx = end - start;
        if (Math.abs(dx) > 40) {
            if (dx < 0) next();
            else prev();
        }
        touchStartX.current = null;
    };

    const progress = useMemo(() => {
        if (!safeSlides.length) return 0;
        return (index + 1) / safeSlides.length;
    }, [index, safeSlides.length]);

    return (
        <div
            className={`phoneSpotlight ${className ?? ""}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            aria-roledescription="carousel"
            aria-label="Uygulama vitrini"
        >
            {/* Telefon kasası */}
            <div className="phoneFrame" role="group" aria-live="polite">
                <div className="phoneNotch" aria-hidden />
                {/* Slide görseli */}
                {active && (
                    <img
                        key={active.id}
                        src={active.media}
                        alt={active.title}
                        className="phoneScreen fadeSlide"
                        draggable={false}
                    />
                )}

                {/* Üst başlıklar-etiketler */}
                {active && (
                    <div className="slideInfo">
                        <h4 className="slideTitle">{active.title}</h4>
                        <p className="slideSubtitle">{active.subtitle}</p>
                        {!!active.cta?.length && (
                            <div className="slideCtas">
                                {active.cta.map((c) => (
                                    <a
                                        key={c.label}
                                        className="chipButton"
                                        href={c.href}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {c.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Kontroller */}
                <button className="navBtn left" aria-label="Önceki slayt" onClick={prev}>
                    ‹
                </button>
                <button className="navBtn right" aria-label="Sonraki slayt" onClick={next}>
                    ›
                </button>

                {/* Dots */}
                <div className="dots" role="tablist" aria-label="Slayt sayfaları">
                    {safeSlides.map((s, i) => (
                        <button
                            key={s.id}
                            className={`dot ${i === index ? "active" : ""}`}
                            aria-selected={i === index}
                            aria-label={`${i + 1}. slayt: ${s.title}`}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>

                {/* Progress bar (autoplay görünür) */}
                {autoPlay && !prefersReducedMotion && (
                    <div className="progress">
                        <div className="progressInner" style={{ width: `${progress * 100}%` }} />
                    </div>
                )}
            </div>
        </div>
    );
}
