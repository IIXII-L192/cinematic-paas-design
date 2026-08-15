import { useEffect, useRef, useState } from "react";
import { LeftPanel } from "./components/strata/LeftPanel";
import { MapPanel, type Viewport } from "./components/strata/MapPanel";
import { Header } from "./components/strata/Header";
import type { MapMode } from "./lib/severity";
import { CITIES, type Range } from "./lib/pollen";

function getViewport(): Viewport {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  return w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
}

// Height of the top header bar (py-4 = 32px + logo ~24px line-height ≈ 56px)
const HEADER_H = 56;

// Minimum and maximum width for the resizable left data panel. Anything below
// MIN_PANEL_WIDTH starts to overflow the dense rows (7-day forecast matrix,
// pollen breakdown chips, etc.).
const MIN_PANEL_WIDTH = 400;
const MAX_PANEL_WIDTH = 680;

// Map card background stack: dot grid on top, 5% black tint, solid page bg underneath.
// The solid base prevents the data panel content from showing through any transparent
// region of the SVG (insets gap, edges, etc.).
const TINT_LIGHT = "linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05))";
const TINT_DARK  = "linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))";
const DOTS_LIGHT = "radial-gradient(circle, rgba(0,0,0,0.10) 0.7px, transparent 0.7px)";
const DOTS_DARK  = "radial-gradient(circle, rgba(255,255,255,0.14) 0.7px, transparent 0.7px)";
const DOT_SIZE = "10px 10px, auto"; // 10px = STEP in MapPanel; tint covers whole element

export default function App() {
  const [cityId, setCityId] = useState("nyc");
  const [range, setRange] = useState<Range>("month");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [anchorDate, setAnchorDate] = useState<Date>(() => new Date());
  const [mode, setMode] = useState<MapMode>("radial");
  // Default panel width = 30% of the viewport (clamped to the drag range below).
  const [leftWidth, setLeftWidth] = useState(() =>
    typeof window === "undefined"
      ? 480
      : Math.max(MIN_PANEL_WIDTH, Math.min(MAX_PANEL_WIDTH, Math.round(window.innerWidth * 0.3))),
  );
  const [viewport, setViewport] = useState<Viewport>(getViewport);
  const [panelScrollY, setPanelScrollY] = useState(0);

  const resizing = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const isStacked = viewport !== "desktop";
  const isDocked = isStacked && panelScrollY > 60;
  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");
  const cardBgImage = theme === "dark"
    ? `${DOTS_DARK}, ${TINT_DARK}`
    : `${DOTS_LIGHT}, ${TINT_LIGHT}`;

  // Mini-map: 50vw wide, 3:2 landscape ratio
  const MINI_W = "calc(50vw - 12px)";
  const MINI_H = "calc((50vw - 12px) * 2 / 3)";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // On first load, look up the visitor's approximate location by IP and snap to the
  // nearest known city. Falls back silently to the default if the lookup fails/blocked.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) return;
        const data = await res.json();
        const lat = Number(data.latitude), lng = Number(data.longitude);
        if (!isFinite(lat) || !isFinite(lng)) return;
        let best = CITIES[0], bestD = Infinity;
        for (const c of CITIES) {
          const d = (c.lat - lat) ** 2 + (c.lng - lng) ** 2;
          if (d < bestD) { bestD = d; best = c; }
        }
        if (!cancelled && best) setCityId(best.id);
      } catch {}
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const check = () => setViewport(getViewport());
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!resizing.current) return;
      setLeftWidth(Math.max(MIN_PANEL_WIDTH, Math.min(MAX_PANEL_WIDTH, e.clientX)));
    };
    const onUp = () => { resizing.current = false; document.body.style.cursor = ""; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  function expandMap() {
    panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  const panelWidth = viewport === "tablet" ? Math.min(leftWidth, 340) : leftWidth;

  // Stacked: map is always position:fixed — avoids any ancestor overflow-clip issues.
  // Hero state floats in a rounded card with 16px gap below the header and 16px side margins.
  const HERO_GAP = 16;
  const heroH = `calc(75vh - ${HEADER_H + HERO_GAP * 2}px)`;
  const stackedMapStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 50,
    overflow: "hidden",
    backgroundColor: "var(--strata-bg)", // solid base so panel content can't show through
    backgroundImage: cardBgImage,
    backgroundSize: DOT_SIZE,
    cursor: isDocked ? "pointer" : undefined,
    borderRadius: 8,
    transition: [
      "top 380ms cubic-bezier(.22,.7,.28,1)",
      "left 380ms cubic-bezier(.22,.7,.28,1)",
      "width 380ms cubic-bezier(.22,.7,.28,1)",
      "height 380ms cubic-bezier(.22,.7,.28,1)",
    ].join(", "),
    ...(isDocked ? {
      top: HEADER_H + HERO_GAP,
      left: "calc(50vw)",
      width: MINI_W,
      height: MINI_H,
    } : {
      top: HEADER_H + HERO_GAP,
      left: HERO_GAP,
      width: `calc(100vw - ${HERO_GAP * 2}px)`,
      height: heroH,
    }),
  };

  return (
    <div className="w-full h-screen flex flex-col" style={{ background: "var(--strata-bg)", color: "var(--strata-ink)" }}>
      <style>{`
        .strata-chrome {
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          background: var(--chrome-bg);
          border-radius: 4px;
          font-family: 'Geist Mono', monospace;
        }
        .strata-chip {
          font-family: 'Jura', sans-serif;
          font-weight: 500;
          font-size: 10px;
          line-height: 15px;
          padding: 4px 8px;
          border-radius: 2px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--chip-color);
          background: transparent;
          transition: background 160ms, color 160ms;
          white-space: nowrap;
          text-transform: capitalize;
        }
        .strata-chip[data-active="true"] {
          background: var(--chip-active-bg);
          color: var(--chip-active-color);
          box-shadow: 0 1px 0.75px rgba(0, 0, 0, 0.25);
        }
        .strata-label {
          font-family: 'Jura', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          color: var(--chip-color);
        }
        .strata-tick-text {
          font-family: 'Jura', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 18px;
          letter-spacing: 0.3px;
          color: var(--chip-color-strong);
        }
        /* Stable scrollbar: same width while idle / hover / active, no gutter.
           Overrides the macOS overlay behaviour that thickens the thumb and
           paints a gray track when the user drags it. The track is set to the
           panel background colour (not transparent) so that any browser-painted
           gutter blends seamlessly with the panel. */
        .strata-scroll {
          scrollbar-width: thin;
          scrollbar-color: var(--chip-color) var(--strata-panel);
        }
        .strata-scroll::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          background-color: var(--strata-panel);
        }
        .strata-scroll::-webkit-scrollbar-track,
        .strata-scroll::-webkit-scrollbar-track:hover,
        .strata-scroll::-webkit-scrollbar-track:active,
        .strata-scroll::-webkit-scrollbar-track-piece,
        .strata-scroll::-webkit-scrollbar-track-piece:hover,
        .strata-scroll::-webkit-scrollbar-track-piece:active,
        .strata-scroll::-webkit-scrollbar-corner {
          background-color: var(--strata-panel);
          border: 0;
          box-shadow: none;
        }
        .strata-scroll::-webkit-scrollbar-thumb {
          background-color: var(--chip-color);
          border-radius: 8px;
          border: 0;
          background-clip: padding-box;
          min-height: 24px;
        }
        .strata-scroll::-webkit-scrollbar-thumb:hover,
        .strata-scroll::-webkit-scrollbar-thumb:active {
          background-color: var(--chip-color-strong);
        }
        .strata-scroll::-webkit-scrollbar-button,
        .strata-scroll::-webkit-resizer { display: none; }
        /* Drag handle — just a transparent gap, no visible line */
        .strata-divider {
          width: 6px;
          flex-shrink: 0;
          cursor: col-resize;
          background: transparent;
        }
        @media (pointer: coarse) {
          .strata-chip { min-height: 44px; padding: 10px 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>

      
      <div style={{ flexShrink: 0 }}>
        <Header theme={theme} onToggleTheme={toggleTheme} />
      </div>

      
      <div className={`flex flex-1 min-h-0 ${isStacked ? "flex-col" : "flex-row"}`}>

        
        {isStacked && (
          <>
            
            <div
              style={{
                height: isDocked ? 0 : `calc(${heroH} + ${HERO_GAP * 2}px)`,
                flexShrink: 0,
                transition: "height 380ms cubic-bezier(.22,.7,.28,1)",
              }}
            />

            
            <div style={stackedMapStyle} onClick={isDocked ? expandMap : undefined}>
              <MapPanel
                selectedCityId={cityId}
                onSelectCity={setCityId}
                date={anchorDate}
                onChangeDate={setAnchorDate}
                range={range}
                onChangeRange={setRange}
                mode={mode}
                onChangeMode={setMode}
                theme={theme}
                viewport={viewport}
                isDocked={isDocked}
              />
            </div>

            
            <div
              ref={panelRef}
              className="strata-scroll"
              style={{ flex: 1, overflowY: "auto", overflowX: "hidden", background: "var(--strata-panel)" }}
              onScroll={(e) => setPanelScrollY(e.currentTarget.scrollTop)}
            >
              <LeftPanel
                cityId={cityId}
                onSelectCity={setCityId}
                range={range}
                date={anchorDate}
                theme={theme}
                mode={mode}
              />
            </div>
          </>
        )}

        
        {!isStacked && (
          <>
            <aside
              className="min-h-0 strata-scroll"
              style={{ width: panelWidth, flexShrink: 0, background: "var(--strata-panel)", overflowY: "auto", overflowX: "hidden" }}
            >
              <LeftPanel
                cityId={cityId}
                onSelectCity={setCityId}
                range={range}
                date={anchorDate}
                theme={theme}
                mode={mode}
              />
            </aside>

            
            <div
              className="strata-divider"
              onMouseDown={() => { resizing.current = true; document.body.style.cursor = "col-resize"; }}
            />

            
            <div
              style={{
                flex: 1,
                minWidth: 0,
                margin: "12px 12px 12px 6px",
                borderRadius: 8,
                overflow: "hidden",
                backgroundColor: "var(--strata-bg)",
                backgroundImage: cardBgImage,
                backgroundSize: DOT_SIZE,
              }}
            >
              <MapPanel
                selectedCityId={cityId}
                onSelectCity={setCityId}
                date={anchorDate}
                onChangeDate={setAnchorDate}
                range={range}
                onChangeRange={setRange}
                mode={mode}
                onChangeMode={setMode}
                theme={theme}
                viewport={viewport}
                isDocked={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
