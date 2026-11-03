import React, { useMemo, useRef, useEffect } from 'react';
import {
  DisplayState,
  GradientSlot,
  CustomMediaItem,
  DEFAULT_BG_FX,
  CompositeBackgroundConfig,
} from '../types';
import { WorshipTimerOverlay } from './WorshipTimerOverlay';
import { formatLyricsWithTranslations } from '../utils/lyricsFormatter';
import { DEFAULT_PRESET_IMAGES } from '../db/presetImages';
import { DEFAULT_BUILTIN_HTML_BACKGROUNDS } from '../db/defaultData';

interface LiveScreenProps {
  state: DisplayState;
  customDataSlots: Record<string, string>;
  customMediaList?: CustomMediaItem[];
  gradientSlots: Record<string, GradientSlot>;
  overlays: {
    logo: string;
    intro: string;
    outro: string;
  };
  isDisplayOnly?: boolean;
  pauseBackgroundAnimation?: boolean;
}

export const LiveScreen: React.FC<LiveScreenProps> = ({
  state,
  customDataSlots,
  customMediaList = [],
  gradientSlots,
  overlays,
  isDisplayOnly = false,
  pauseBackgroundAnimation = false,
}) => {
  // Stars for ambient animation
  const stars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: `${(Math.sin(i * 99) * 0.5 + 0.5) * 100}%`,
      top: `${(Math.cos(i * 33) * 0.5 + 0.5) * 100}%`,
      size: `${(i % 3) + 2}px`,
      duration: `${(i % 4) + 2.5}s`,
    }));
  }, []);

  // Retrieve active media content (from customDataSlots or customMediaList)
  const activeMediaData = useMemo(() => {
    const sel = state.bgSelector || '';
    if (customDataSlots[sel]) return customDataSlots[sel];
    const found = customMediaList.find((m) => m.id === sel);
    return found ? found.data : '';
  }, [state.bgSelector, customDataSlots, customMediaList]);

  // Composite background config resolution (active if compositeBg.enabled or bgSelector starts with comp-)
  const compositeConfig = useMemo<CompositeBackgroundConfig | null>(() => {
    if (state.compositeBg?.enabled) {
      return state.compositeBg;
    }
    const sel = state.bgSelector || '';
    if (sel.startsWith('comp-')) {
      const found = customMediaList.find((m) => m.id === sel);
      if (found) {
        if (found.compositeConfig) return found.compositeConfig;
        try {
          return JSON.parse(found.data);
        } catch {}
      }
    }
    return null;
  }, [state.compositeBg, state.bgSelector, customMediaList]);

  // Composite Base Still Image Data
  const compositeBaseImageData = useMemo(() => {
    if (!compositeConfig) return '';
    if (compositeConfig.baseImageData) return compositeConfig.baseImageData;
    const imgId = compositeConfig.baseImageId || '';
    if (imgId.startsWith('preset-img-')) {
      const p = DEFAULT_PRESET_IMAGES.find((x) => x.id === imgId);
      if (p) return p.data;
    }
    if (customDataSlots[imgId]) return customDataSlots[imgId];
    const found = customMediaList.find((m) => m.id === imgId);
    return found ? found.data : '';
  }, [compositeConfig, customDataSlots, customMediaList]);

  // Composite Overlay HTML Animation Data
  const compositeOverlayHtmlData = useMemo(() => {
    if (!compositeConfig) return '';
    if (compositeConfig.overlayHtmlData) return compositeConfig.overlayHtmlData;
    const htmlId = compositeConfig.overlayHtmlId || 'html-gold-cross';
    if (customDataSlots[htmlId]) return customDataSlots[htmlId];
    const foundCustom = customMediaList.find((m) => m.id === htmlId);
    if (foundCustom) return foundCustom.data;
    const foundDefault = DEFAULT_BUILTIN_HTML_BACKGROUNDS.find((m) => m.id === htmlId);
    return foundDefault ? foundDefault.data : '';
  }, [compositeConfig, customDataSlots, customMediaList]);

  // Process HTML Animation for Pure Transparency Override
  const processedCompositeHtml = useMemo(() => {
    if (!compositeOverlayHtmlData) return '';
    const forceTransparent = compositeConfig?.chromaKey?.transparentAnimationBg !== false;
    if (!forceTransparent) return compositeOverlayHtmlData;

    const transparentStyle = `
      <style id="gworship-transparent-override">
        html, body {
          background: transparent !important;
          background-color: transparent !important;
        }
        .ambient-glow, .bg-glow {
          opacity: 0.25 !important;
        }
      </style>
    `;

    if (compositeOverlayHtmlData.includes('</head>')) {
      return compositeOverlayHtmlData.replace('</head>', `${transparentStyle}</head>`);
    }
    return transparentStyle + compositeOverlayHtmlData;
  }, [compositeOverlayHtmlData, compositeConfig?.chromaKey?.transparentAnimationBg]);

  // Determine Background Style
  const bgStyle = useMemo(() => {
    const sel = state.bgSelector || 'anim-cross';
    if (compositeConfig) {
      return { backgroundColor: '#000000' };
    }
    if (sel.startsWith('preset-img-')) {
      const p = DEFAULT_PRESET_IMAGES.find((x) => x.id === sel);
      if (p) {
        return {
          backgroundImage: `url(${p.data})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#000000',
        };
      }
    }
    if (sel.startsWith('img-')) {
      const imgData = activeMediaData;
      if (imgData) {
        return {
          backgroundImage: `url(${imgData})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#000000',
        };
      }
      return { backgroundColor: '#020617' };
    }
    if (sel.startsWith('grad-')) {
      const grad = gradientSlots[sel] || { c1: '#0f2027', c2: '#203a43' };
      return {
        backgroundImage: `linear-gradient(135deg, ${grad.c1}, ${grad.c2})`,
      };
    }
    if (sel === 'anim-stars') {
      return { backgroundColor: '#070b19' };
    }
    return { backgroundColor: '#000000' };
  }, [state.bgSelector, activeMediaData, gradientSlots, compositeConfig]);

  // Background Effects & Color Grading (Hue, Brightness, Contrast, Saturation, Blur, Speed)
  const bgFx = useMemo(() => ({ ...DEFAULT_BG_FX, ...(state.bgFx || {}) }), [state.bgFx]);

  const filterStyle = useMemo(() => {
    const parts: string[] = [];
    if (bgFx.hue) parts.push(`hue-rotate(${bgFx.hue}deg)`);
    if (bgFx.brightness !== 100) parts.push(`brightness(${bgFx.brightness}%)`);
    if (bgFx.contrast !== 100) parts.push(`contrast(${bgFx.contrast}%)`);
    if (bgFx.saturation !== 100) parts.push(`saturate(${bgFx.saturation}%)`);
    if (bgFx.blur > 0) parts.push(`blur(${bgFx.blur}px)`);
    if (bgFx.sepia > 0) parts.push(`sepia(${bgFx.sepia}%)`);
    return parts.length > 0 ? parts.join(' ') : 'none';
  }, [bgFx.hue, bgFx.brightness, bgFx.contrast, bgFx.saturation, bgFx.blur, bgFx.sepia]);

  const speed = bgFx.speed || 1.0;

  // Track page visibility to pause background animations when app is minimized or phone screen is off
  const [isPageHidden, setIsPageHidden] = React.useState<boolean>(() =>
    typeof document !== 'undefined' ? document.hidden : false
  );

  useEffect(() => {
    const handleVisibility = () => {
      setIsPageHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const shouldPauseMedia = pauseBackgroundAnimation || isPageHidden || state.isBlack;

  // Video Ref for dynamic playbackRate & power-saving pause
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (videoRef.current) {
      try {
        videoRef.current.playbackRate = Math.max(0.2, Math.min(3.0, speed));
        if (shouldPauseMedia) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => {});
        }
      } catch {}
    }
  }, [speed, state.bgSelector, activeMediaData, shouldPauseMedia]);

  // Iframe Ref for HTML animations
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage({ type: 'SET_BG_SPEED', speed }, '*');
        iframeRef.current.contentWindow.postMessage({ type: 'SET_PAUSED', paused: shouldPauseMedia }, '*');
      } catch {}
    }
  }, [speed, state.bgSelector, shouldPauseMedia]);

  const crossDuration = `${(3.5 / speed).toFixed(2)}s`;

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-black text-white ${
        isDisplayOnly ? 'cursor-none' : ''
      }`}
    >
      {/* 1. BACKGROUND LAYER */}
      <div
        className="absolute inset-0 transition-all duration-300 pointer-events-none"
        style={{
          ...bgStyle,
          filter: filterStyle,
          transform: bgFx.blur > 0 ? 'scale(1.06)' : undefined,
          transformOrigin: 'center center',
        }}
      >
        {/* Video Loop Background */}
        {state.bgSelector.startsWith('vid-') && activeMediaData && !state.isBlack && !pauseBackgroundAnimation && !isPageHidden && (
          <video
            ref={videoRef}
            key={state.bgSelector}
            src={activeMediaData}
            autoPlay
            loop
            muted
            playsInline
            onPlay={(e) => {
              try {
                e.currentTarget.playbackRate = Math.max(0.2, Math.min(3.0, speed));
              } catch {}
            }}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* HTML Web Animation Background (e.g. Golden 3D Cross) */}
        {!compositeConfig && state.bgSelector.startsWith('html-') && activeMediaData && !state.isBlack && !pauseBackgroundAnimation && !isPageHidden && (
          <iframe
            ref={iframeRef}
            key={state.bgSelector}
            srcDoc={activeMediaData}
            className="absolute inset-0 w-full h-full border-none pointer-events-none"
            sandbox="allow-scripts allow-same-origin"
            title="HTML Animation Background"
          />
        )}

        {/* COMPOSITE BACKGROUND LAYER: STILL IMAGE + ANIMATED HTML OVERLAY + CHROMA KEY */}
        {compositeConfig && (
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            {/* 1. Base Still Image */}
            {compositeBaseImageData && (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300 pointer-events-none"
                style={{
                  backgroundImage: `url(${compositeBaseImageData})`,
                  opacity: (compositeConfig.baseOpacity ?? 100) / 100,
                  backgroundColor: '#000000',
                }}
              />
            )}

            {/* 2. Animated HTML Overlay with Transparency, Blend Mode & Chroma Key */}
            {processedCompositeHtml && !state.isBlack && !pauseBackgroundAnimation && !isPageHidden && (
              <div
                className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-200"
                style={{
                  opacity: (compositeConfig.overlayOpacity ?? 85) / 100,
                  mixBlendMode: compositeConfig.blendMode || 'screen',
                }}
              >
                <iframe
                  ref={iframeRef}
                  key={`comp-${compositeConfig.overlayHtmlId}-${compositeConfig.blendMode}`}
                  srcDoc={processedCompositeHtml}
                  className="absolute inset-0 w-full h-full border-none pointer-events-none"
                  sandbox="allow-scripts allow-same-origin"
                  title="Composite HTML Animation Overlay"
                />
              </div>
            )}
          </div>
        )}

        {/* Low-power preview fallback when operator has menu open in eco mode or screen is hidden */}
        {(state.bgSelector.startsWith('html-') || state.bgSelector.startsWith('vid-') || !!compositeConfig) &&
          (pauseBackgroundAnimation || isPageHidden) &&
          !state.isBlack && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center pointer-events-none opacity-80" />
          )}

        {/* Animated Cross */}
        {state.bgSelector === 'anim-cross' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-14 h-48 sm:w-16 sm:h-64 md:w-24 md:h-80 opacity-90">
              <div
                className="absolute inset-x-0 inset-y-0 mx-auto w-8 sm:w-12 md:w-14 rounded-lg bg-white/10 shadow-[0_0_80px_rgba(255,255,255,0.4)] backdrop-blur-xs animate-pulse"
                style={{ animationDuration: crossDuration }}
              />
              <div
                className="absolute top-[26%] -left-8 -right-8 sm:-left-12 sm:-right-12 md:-left-16 md:-right-16 h-8 sm:h-12 md:h-14 rounded-lg bg-white/10 shadow-[0_0_80px_rgba(255,255,255,0.4)] backdrop-blur-xs animate-pulse"
                style={{ animationDuration: crossDuration }}
              />
            </div>
          </div>
        )}

        {/* Animated Stars */}
        {state.bgSelector === 'anim-stars' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((star) => {
              const baseDur = parseFloat(star.duration) || 3.0;
              const starDur = `${(baseDur / speed).toFixed(2)}s`;
              return (
                <span
                  key={star.id}
                  className="absolute rounded-full bg-white animate-pulse"
                  style={{
                    left: star.left,
                    top: star.top,
                    width: star.size,
                    height: star.size,
                    animationDuration: starDur,
                    boxShadow: '0 0 5px rgba(255,255,255,0.8)',
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* 2. TEXT LAYER (LYRICS / BIBLE) */}
      <div
        className={`absolute inset-0 flex flex-col ${
          state.displayMode === 'lowerThird'
            ? 'justify-end pb-12 sm:pb-16 px-4 sm:px-12 md:px-24'
            : 'justify-center items-center px-4 sm:px-8 md:px-16'
        } text-center font-extrabold tracking-wide transition-opacity duration-200 pointer-events-none z-10 ${
          state.isCleared ? 'opacity-0' : 'opacity-100'
        } ${state.ticker?.visible && state.displayMode !== 'lowerThird' ? 'pb-16' : ''}`}
        style={{
          textShadow:
            '0 2px 4px rgba(0,0,0,0.9), 0 4px 14px rgba(0,0,0,0.95), 0 0 25px rgba(0,0,0,0.9)',
        }}
      >
        <div
          className={`w-full max-w-6xl leading-snug flex flex-col justify-center items-center ${
            state.displayMode === 'lowerThird'
              ? 'bg-black/80 backdrop-blur-md py-4 px-6 rounded-2xl border border-white/20 shadow-2xl'
              : ''
          }`}
          style={{
            fontSize: `${
              state.displayMode === 'lowerThird'
                ? Math.max(state.fontSize * 0.75, 2.2)
                : state.fontSize
            }vw`,
          }}
        >
          {state.isBible ? (
            <div className="flex flex-col items-center justify-center w-full">
              <div
                className="leading-snug"
                dangerouslySetInnerHTML={{ __html: state.lyricsHtml || '...' }}
              />
              {state.reference && (
                <div className="text-right w-full mt-3 sm:mt-5 text-[0.45em] text-yellow-400 font-black tracking-wider uppercase drop-shadow-md">
                  {state.reference}
                </div>
              )}
            </div>
          ) : (
            <div
              className="leading-snug text-center w-full"
              dangerouslySetInnerHTML={{
                __html: state.lyricsHtml
                  ? formatLyricsWithTranslations(state.lyricsHtml, state.translationPercent || 40)
                  : '<span class="text-slate-400 font-semibold text-[0.5em]">Mode Standby</span>',
              }}
            />
          )}
        </div>
      </div>

      {/* 3. RUNNING TICKER */}
      <div
        className={`absolute bottom-0 left-0 w-full h-12 sm:h-14 bg-black/90 backdrop-blur-md z-30 flex items-center overflow-hidden border-t border-white/20 transition-all duration-300 ${
          state.ticker?.visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="whitespace-nowrap font-black text-yellow-400 uppercase tracking-widest text-lg sm:text-2xl drop-shadow-[0_2px_4px_#000] animate-[marquee_22s_linear_infinite]">
          {state.ticker?.text || 'Pengumuman: Ibadah akan segera dimulai...'}
        </div>
      </div>

      {/* 4. WORSHIP TIMER OVERLAY */}
      <WorshipTimerOverlay timer={state.timer} />

      {/* 5. BLACK SCREEN LAYER */}
      <div
        className={`absolute inset-0 bg-black z-40 transition-opacity duration-200 pointer-events-none ${
          state.isBlack ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 6. OVERLAYS */}
      {state.overlays?.logo && overlays?.logo && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <iframe
            src={overlays.logo}
            className="w-full h-full border-none bg-transparent"
            title="Logo Overlay"
          />
        </div>
      )}

      {state.overlays?.intro && overlays?.intro && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <iframe
            src={overlays.intro}
            className="w-full h-full border-none bg-transparent"
            title="Intro Overlay"
          />
        </div>
      )}

      {state.overlays?.outro && overlays?.outro && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <iframe
            src={overlays.outro}
            className="w-full h-full border-none bg-transparent"
            title="Outro Overlay"
          />
        </div>
      )}
    </div>
  );
};
