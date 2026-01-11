// src/MobileShowcase.tsx
import React, { useEffect, useRef, useState } from "react";

interface MobileShowcaseProps {
    appName?: string;
    tagline?: string;
    screenshots?: string[];
    primaryColor?: string;
    autoPlay?: boolean;
    autoPlayMs?: number;
}

const MobileShowcase: React.FC<MobileShowcaseProps> = ({
                                                           appName = "My App",
                                                           tagline = "Kısa proje açıklaması",
                                                           screenshots = [],
                                                           primaryColor = "#0F172A",
                                                           autoPlay = true,
                                                           autoPlayMs = 3500,
                                                       }) => {
    const [index, setIndex] = useState<number>(0);
    const touchStartX = useRef<number>(0);
    const touchDeltaX = useRef<number>(0);
    const total = Math.max(screenshots.length, 1);

    const next = () => setIndex((i) => (i + 1) % total);
    const prev = () => setIndex((i) => (i - 1 + total) % total);

    // autoplay
    useEffect(() => {
        if (!autoPlay || total < 2) return;
        const id = setInterval(next, autoPlayMs);
        return () => clearInterval(id);
    }, [autoPlay, autoPlayMs, total]);

    // touch swipe
    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };
    const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };
    const onTouchEnd = () => {
        if (Math.abs(touchDeltaX.current) > 40) {
            touchDeltaX.current < 0 ? next() : prev();
        }
        touchStartX.current = 0;
        touchDeltaX.current = 0;
    };

    const Placeholder: React.FC = () => (
        <div className="placeholder">
            <div className="ph-grad" />
            <div className="ph-text">Ekran Görüntüsü</div>
        </div>
    );

    return (
        <div className="wrap">
            <style>{css(primaryColor)}</style>

            <div className="content">
                <div className="left">
                    <h1>{appName}</h1>
                    <p className="tag">{tagline}</p>
                    <ul className="bullets">
                        <li>• React Native mobil arayüz</li>
                        <li>• Gerçek cihaz çerçevesinde önizleme</li>
                        <li>• Ok/Swipe ile ekranlar arası geçiş</li>
                    </ul>
                    <div className="badges">
                        <a className="badge" href="#" aria-label="App Store (demo)">
                             App Store
                        </a>
                        <a className="badge" href="#" aria-label="Google Play (demo)">
                            ▶︎ Google Play
                        </a>
                    </div>
                </div>

                <div className="phone-area">
                    <div className="device">
                        <div className="notch" />
                        <div
                            className="screen"
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                        >
                            <button className="nav prev" onClick={prev} aria-label="Önceki">
                                ‹
                            </button>
                            <button className="nav next" onClick={next} aria-label="Sonraki">
                                ›
                            </button>

                            <div
                                className="slider"
                                style={{ transform: `translateX(-${index * 100}%)` }}
                            >
                                {(total === 1 ? [undefined] : screenshots).map((src, i) => (
                                    <div className="slide" key={i}>
                                        {src ? (
                                            <img src={src} alt={`screen-${i + 1}`} loading="lazy" />
                                        ) : (
                                            <Placeholder />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="dots">
                                {Array.from({ length: total }).map((_, i) => (
                                    <button
                                        key={i}
                                        className={`dot ${i === index ? "active" : ""}`}
                                        onClick={() => setIndex(i)}
                                        aria-label={`Ekran ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hint">Swipe veya oklarla gez</div>
                </div>
            </div>
        </div>
    );
};

export default MobileShowcase;

// Inline CSS
const css = (primary: string) => `
:root { --ring: ${primary}; }
*{box-sizing:border-box}
.wrap{min-height:100dvh;background:linear-gradient(180deg,#0b1220, #0e1627 40%, #0b1220);display:grid;place-items:center;padding:48px}
.content{width:min(1100px,100%);display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:center}
@media(max-width:980px){.content{grid-template-columns:1fr;gap:36px}}
.left h1{color:white;font-size:40px;line-height:1.1;margin:0 0 8px;font-weight:800}
.left .tag{opacity:.85;color:#e5e7eb;margin:0 0 16px;font-size:16px}
.bullets{margin:16px 0 24px;padding:0;list-style:none;color:#cbd5e1}
.badges{display:flex;gap:12px;flex-wrap:wrap}
.badge{background:#0f172a;border:1px solid #1f2937;color:#e5e7eb;padding:10px 14px;border-radius:12px;text-decoration:none;font-weight:600;box-shadow:0 4px 18px rgba(0,0,0,.35);transition:.2s}
.badge:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.5)}

.phone-area{display:grid;place-items:center}
.device{position:relative;width:390px;height:844px;border-radius:48px;background:#000;box-shadow:0 20px 60px rgba(0,0,0,.6), inset 0 0 0 2px #111, inset 0 0 0 10px #000;}
@media(max-width:420px){.device{width:320px;height:690px;border-radius:40px}}
.notch{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:180px;height:28px;background:#000;border-radius:20px;box-shadow:0 0 0 2px #111}
.screen{position:absolute;inset:18px;border-radius:36px;overflow:hidden;background:#0b1220;border:1px solid #111}

.slider{display:flex;height:100%;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
.slide{flex:0 0 100%;height:100%;display:grid;place-items:center}
.slide img{width:100%;height:100%;object-fit:cover}

.nav{position:absolute;top:50%;transform:translateY(-50%);z-index:10;width:36px;height:36px;border-radius:999px;border:1px solid #1f2937;background:rgba(15,23,42,.7);color:#e5e7eb;font-size:20px;display:grid;place-items:center;cursor:pointer}
.nav:hover{background:rgba(15,23,42,.9)}
.prev{left:10px}.next{right:10px}

.dots{position:absolute;left:0;right:0;bottom:12px;display:flex;gap:6px;justify-content:center}
.dot{width:8px;height:8px;border-radius:999px;border:none;background:#475569;opacity:.6;cursor:pointer}
.dot.active{background:var(--ring);opacity:1}

.hint{color:#9ca3af;font-size:12px;text-align:center;margin-top:10px}

.placeholder{position:relative;width:100%;height:100%;display:grid;place-items:center;color:#cbd5e1}
.ph-grad{position:absolute;inset:0;background:linear-gradient(135deg,#0f172a 0%,#111827 50%,#0b1220 100%)}
.ph-text{position:relative;z-index:1;background:rgba(0,0,0,.35);padding:6px 10px;border-radius:10px;border:1px solid #1f2937}
`;
