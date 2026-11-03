import React from 'react';
import { DEFAULT_PRESET_IMAGES } from '../db/presetImages';

interface AnimatedBgThumbnailProps {
  id: string;
  className?: string;
  name?: string;
}

/**
 * Static still-image (gambar diam) thumbnail representation for animated backgrounds.
 * High-fidelity, zero-CPU, SVG-based rendering that matches the visual look
 * of the animation so operators can recognize content at a single glance.
 */
export const AnimatedBgThumbnail: React.FC<AnimatedBgThumbnailProps> = ({
  id,
  className = 'w-full h-full',
  name = '',
}) => {
  // Preset Still Images (Altar, Cross, Bethlehem Stable, Cathedral, etc.)
  if (id.startsWith('preset-img-')) {
    const preset = DEFAULT_PRESET_IMAGES.find((p) => p.id === id);
    if (preset) {
      return (
        <img
          src={preset.data}
          alt={name || preset.name}
          className={`${className} object-cover`}
        />
      );
    }
  }

  // Composite Background (Base Image + HTML Animation Overlay)
  if (id.startsWith('comp-')) {
    return (
      <div className={`${className} relative overflow-hidden bg-slate-950 flex flex-col items-center justify-center p-2 text-center select-none`}>
        <div className="absolute inset-0 bg-radial from-amber-600/25 via-indigo-950/60 to-black" />
        <div className="relative z-10 flex items-center gap-1.5 mb-1">
          <div className="w-5 h-5 rounded bg-slate-800 border border-amber-500/40 flex items-center justify-center text-[10px] shadow">
            🖼️
          </div>
          <span className="text-amber-400 font-black text-xs">+</span>
          <div className="w-5 h-5 rounded bg-indigo-950 border border-cyan-500/50 flex items-center justify-center text-[10px] shadow">
            ✨
          </div>
        </div>
        <span className="relative z-10 text-[9px] font-black text-amber-300 truncate max-w-full px-1">
          {name || 'Komposisi 2 Latar'}
        </span>
        <span className="relative z-10 text-[8px] text-cyan-300 font-mono tracking-wider uppercase">
          Gambar + Animasi
        </span>
      </div>
    );
  }

  // 1. SALIB EMAS 3D
  if (id === 'html-gold-cross') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="crossBg" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#2c2005" />
            <stop offset="50%" stopColor="#0d0a02" />
            <stop offset="100%" stopColor="#020202" />
          </radialGradient>
          <linearGradient id="crossGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9C4" />
            <stop offset="35%" stopColor="#FBC02D" />
            <stop offset="70%" stopColor="#F57F17" />
            <stop offset="100%" stopColor="#BF360C" />
          </linearGradient>
          <radialGradient id="crossCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE082" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FF8F00" stopOpacity="0" />
          </radialGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background */}
        <rect width="160" height="100" fill="url(#crossBg)" />

        {/* Center halo aura */}
        <ellipse cx="80" cy="50" rx="45" ry="35" fill="url(#crossCenterGlow)" />

        {/* Floating golden dust particles */}
        <circle cx="35" cy="25" r="1" fill="#FFE082" opacity="0.6" />
        <circle cx="48" cy="72" r="1.2" fill="#FFD54F" opacity="0.7" />
        <circle cx="120" cy="30" r="1" fill="#FFE082" opacity="0.5" />
        <circle cx="130" cy="68" r="1.4" fill="#FFCA28" opacity="0.8" />
        <circle cx="65" cy="18" r="0.8" fill="#FFF8E1" opacity="0.9" />
        <circle cx="95" cy="82" r="1" fill="#FFE082" opacity="0.6" />

        {/* Golden 3D Cross */}
        <g filter="url(#goldGlow)">
          {/* Vertical beam */}
          <rect x="74" y="20" width="12" height="60" rx="2" fill="url(#crossGold)" />
          {/* Horizontal beam */}
          <rect x="58" y="34" width="44" height="12" rx="2" fill="url(#crossGold)" />
          {/* Bevel highlights */}
          <line x1="75" y1="21" x2="75" y2="79" stroke="#FFFDE7" strokeWidth="1" opacity="0.8" />
          <line x1="59" y1="35" x2="101" y2="35" stroke="#FFFDE7" strokeWidth="1" opacity="0.8" />
        </g>
      </svg>
    );
  }

  // 2. SINAR KEMULIAAN (HEAVENLY RAYS)
  if (id === 'html-heavenly-rays') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#080c18" />
            <stop offset="100%" stopColor="#010307" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="0%" r="70%">
            <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#FFD54F" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#FF8F00" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="160" height="100" fill="url(#skyDark)" />

        {/* Volumetric Sunbeams */}
        <g opacity="0.55">
          <polygon points="80,0 20,100 38,100" fill="#FFE082" opacity="0.3" />
          <polygon points="80,0 48,100 68,100" fill="#FFF59D" opacity="0.45" />
          <polygon points="80,0 75,100 95,100" fill="#FFFDE7" opacity="0.6" />
          <polygon points="80,0 105,100 122,100" fill="#FFE082" opacity="0.4" />
          <polygon points="80,0 130,100 148,100" fill="#FFCA28" opacity="0.3" />
          <polygon points="80,0 5,85 18,100" fill="#FFB300" opacity="0.25" />
          <polygon points="80,0 150,90 160,80" fill="#FFB300" opacity="0.25" />
        </g>

        {/* Source Light Glow */}
        <ellipse cx="80" cy="0" rx="60" ry="40" fill="url(#sunGlow)" />

        {/* Floating illuminated dust motes */}
        <circle cx="78" cy="35" r="1.5" fill="#FFFDE7" opacity="0.9" />
        <circle cx="62" cy="55" r="1.2" fill="#FFF9C4" opacity="0.75" />
        <circle cx="92" cy="48" r="1.4" fill="#FFF9C4" opacity="0.8" />
        <circle cx="45" cy="75" r="1" fill="#FFE082" opacity="0.6" />
        <circle cx="110" cy="65" r="1.1" fill="#FFE082" opacity="0.65" />
        <circle cx="85" cy="82" r="1.3" fill="#FFF59D" opacity="0.7" />
      </svg>
    );
  }

  // 3. GELOMBANG SUTRA AURORA (AURORA WAVES)
  if (id === 'html-aurora-waves') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="auroraBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#03081a" />
            <stop offset="50%" stopColor="#050e24" />
            <stop offset="100%" stopColor="#010309" />
          </linearGradient>
          <linearGradient id="waveCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.55" />
            <stop offset="80%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wavePurple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="waveEmerald" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="45%" stopColor="#34d399" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="160" height="100" fill="url(#auroraBg)" />

        {/* Ambient starry backdrop */}
        <circle cx="20" cy="15" r="0.6" fill="#fff" opacity="0.7" />
        <circle cx="140" cy="20" r="0.6" fill="#fff" opacity="0.7" />
        <circle cx="85" cy="12" r="0.8" fill="#fff" opacity="0.8" />

        {/* Flowing Aurora Waves */}
        <path
          d="M0,65 Q40,35 80,60 T160,50 L160,100 L0,100 Z"
          fill="url(#wavePurple)"
        />
        <path
          d="M0,58 Q45,75 90,45 T160,62 L160,100 L0,100 Z"
          fill="url(#waveCyan)"
        />
        <path
          d="M0,72 Q35,50 85,68 T160,55 L160,100 L0,100 Z"
          fill="url(#waveEmerald)"
        />

        {/* Crest glow line */}
        <path
          d="M0,58 Q45,75 90,45 T160,62"
          fill="none"
          stroke="#a5f3fc"
          strokeWidth="1.2"
          opacity="0.65"
        />
      </svg>
    );
  }

  // 4. NYALA API ROH KUDUS (PENTECOST FIRE)
  if (id === 'html-holy-spirit-fire') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hearthGlow" cx="50%" cy="100%" r="75%">
            <stop offset="0%" stopColor="#ff5722" stopOpacity="0.7" />
            <stop offset="35%" stopColor="#e64a19" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#bf360c" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#050100" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Deep dark charcoal background */}
        <rect width="160" height="100" fill="#070201" />

        {/* Warm bottom hearth flame glow */}
        <rect width="160" height="100" fill="url(#hearthGlow)" />

        {/* Flame Tongue Base */}
        <path
          d="M50,100 Q65,60 75,75 Q85,45 95,80 Q105,65 115,100 Z"
          fill="#ff7043"
          opacity="0.45"
        />
        <path
          d="M65,100 Q75,70 82,78 Q90,55 98,82 Q105,72 110,100 Z"
          fill="#ffb74d"
          opacity="0.6"
        />

        {/* Ascending Fire Sparks & Embers */}
        <circle cx="80" cy="42" r="1.8" fill="#FFF59D" opacity="0.9" />
        <circle cx="72" cy="58" r="1.5" fill="#FFD54F" opacity="0.85" />
        <circle cx="92" cy="50" r="1.6" fill="#FFCA28" opacity="0.85" />
        <circle cx="64" cy="35" r="1.2" fill="#FFA726" opacity="0.8" />
        <circle cx="102" cy="38" r="1.3" fill="#FF7043" opacity="0.75" />
        <circle cx="86" cy="22" r="1.1" fill="#FFE082" opacity="0.85" />
        <circle cx="55" cy="52" r="1.0" fill="#FF5722" opacity="0.7" />
        <circle cx="112" cy="56" r="1.1" fill="#FF8A65" opacity="0.7" />
        <circle cx="78" cy="12" r="0.9" fill="#FFF9C4" opacity="0.9" />
        <circle cx="95" cy="18" r="0.8" fill="#FFD54F" opacity="0.75" />
      </svg>
    );
  }

  // 5. LILIN DOA & BOKEH KUDUS (CANDLELIGHT SANCTUARY)
  if (id === 'html-sacred-bokeh') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="candleGlow" cx="50%" cy="95%" r="60%">
            <stop offset="0%" stopColor="#ffb300" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#ff8f00" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bokehGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe082" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#ffb300" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff8f00" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="160" height="100" fill="#080502" />
        <rect width="160" height="100" fill="url(#candleGlow)" />

        {/* Soft floating golden bokeh spheres */}
        <circle cx="45" cy="40" r="14" fill="url(#bokehGlow)" />
        <circle cx="115" cy="35" r="16" fill="url(#bokehGlow)" />
        <circle cx="80" cy="50" r="18" fill="url(#bokehGlow)" />
        <circle cx="28" cy="70" r="10" fill="url(#bokehGlow)" />
        <circle cx="135" cy="65" r="12" fill="url(#bokehGlow)" />
        <circle cx="65" cy="20" r="8" fill="url(#bokehGlow)" />
        <circle cx="98" cy="18" r="9" fill="url(#bokehGlow)" />

        {/* Tiny Candle Wick Light at Bottom Center */}
        <ellipse cx="80" cy="94" rx="4" ry="6" fill="#fff" opacity="0.9" />
        <ellipse cx="80" cy="94" rx="8" ry="10" fill="#ffd54f" opacity="0.5" />
      </svg>
    );
  }

  // 6. SEMESTA BINTANG & NEBULA (COSMIC GLORY)
  if (id === 'html-cosmic-worship') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="nebulaPurple" cx="35%" cy="45%" r="45%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#4338ca" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nebulaCyan" cx="70%" cy="55%" r="40%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="65%" stopColor="#1e3a8a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="160" height="100" fill="#020308" />
        <rect width="160" height="100" fill="url(#nebulaPurple)" />
        <rect width="160" height="100" fill="url(#nebulaCyan)" />

        {/* Starfield */}
        <circle cx="25" cy="20" r="0.7" fill="#fff" opacity="0.8" />
        <circle cx="48" cy="15" r="1.1" fill="#fed7aa" opacity="0.9" />
        <circle cx="75" cy="30" r="0.6" fill="#fff" opacity="0.7" />
        <circle cx="110" cy="18" r="0.9" fill="#bae6fd" opacity="0.85" />
        <circle cx="138" cy="28" r="0.7" fill="#fff" opacity="0.7" />
        <circle cx="30" cy="65" r="0.8" fill="#fff" opacity="0.7" />
        <circle cx="65" cy="80" r="0.7" fill="#fff" opacity="0.8" />
        <circle cx="120" cy="72" r="1.0" fill="#fed7aa" opacity="0.85" />
        <circle cx="145" cy="80" r="0.6" fill="#fff" opacity="0.6" />

        {/* Bright Glowing Cross-Star */}
        <g transform="translate(85, 45)">
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#fff" strokeWidth="0.8" opacity="0.9" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#fff" strokeWidth="0.8" opacity="0.9" />
          <circle cx="0" cy="0" r="1.5" fill="#fff" />
        </g>
      </svg>
    );
  }

  // 7. POHON NATAL & SALJU 3D (CHRISTMAS TREE)
  if (id === 'html-christmas-tree') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="xmasBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0b112c" />
            <stop offset="100%" stopColor="#020409" />
          </linearGradient>
          <radialGradient id="treeGlow" cx="50%" cy="55%" r="45%">
            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#2ecc71" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="160" height="100" fill="url(#xmasBg)" />
        <ellipse cx="80" cy="55" rx="35" ry="30" fill="url(#treeGlow)" />

        {/* Tree Spiral Cone Particles Silhouette */}
        <polygon points="80,22 55,82 105,82" fill="#ffd700" opacity="0.25" />
        <path
          d="M80,25 Q95,45 68,55 Q98,68 62,80 L98,80"
          fill="none"
          stroke="#ffd700"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Top Star */}
        <polygon
          points="80,15 82,20 87,20 83,23 85,28 80,25 75,28 77,23 73,20 78,20"
          fill="#FFF9C4"
        />

        {/* Falling Snowflakes */}
        <circle cx="25" cy="30" r="1" fill="#fff" opacity="0.8" />
        <circle cx="45" cy="65" r="1.3" fill="#fff" opacity="0.85" />
        <circle cx="70" cy="15" r="1" fill="#fff" opacity="0.7" />
        <circle cx="115" cy="40" r="1.4" fill="#fff" opacity="0.9" />
        <circle cx="135" cy="70" r="1.2" fill="#fff" opacity="0.75" />
        <circle cx="140" cy="20" r="0.8" fill="#fff" opacity="0.6" />
        <circle cx="95" cy="85" r="1.1" fill="#fff" opacity="0.7" />
      </svg>
    );
  }

  // 8. BINTANG BETLEHEM & MALAM KUDUS (STAR OF BETHLEHEM)
  if (id === 'html-bethlehem-star') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bethSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#020412" />
            <stop offset="60%" stopColor="#070c2a" />
            <stop offset="90%" stopColor="#0d143c" />
            <stop offset="100%" stopColor="#080816" />
          </linearGradient>
          <linearGradient id="bethBeam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#facc15" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="bethHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#fef08a" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#eab308" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="160" height="100" fill="url(#bethSky)" />

        <circle cx="20" cy="22" r="0.7" fill="#fff" opacity="0.8" />
        <circle cx="45" cy="15" r="0.8" fill="#fef08a" opacity="0.9" />
        <circle cx="120" cy="18" r="0.9" fill="#bae6fd" opacity="0.8" />
        <circle cx="142" cy="30" r="0.6" fill="#fff" opacity="0.7" />
        <circle cx="35" cy="60" r="0.7" fill="#fff" opacity="0.75" />
        <circle cx="130" cy="55" r="0.8" fill="#fff" opacity="0.75" />

        <path d="M0,100 L0,86 Q40,82 70,88 T160,85 L160,100 Z" fill="#04060f" />
        <path d="M0,100 L0,92 Q50,90 90,94 T160,91 L160,100 Z" fill="#010206" />

        <polygon points="80,26 50,95 110,95" fill="url(#bethBeam)" />
        <circle cx="80" cy="26" r="22" fill="url(#bethHalo)" />

        <g transform="translate(80, 26)">
          <polygon points="0,-16 1.8,0 0,32 -1.8,0" fill="#fff" />
          <polygon points="-18,0 0,1.8 18,0 0,-1.8" fill="#fff" />
          <polygon points="-7,-7 0,0 7,7 0,0" stroke="#fef08a" strokeWidth="1" />
          <polygon points="-7,7 0,0 7,-7 0,0" stroke="#fef08a" strokeWidth="1" />
          <circle cx="0" cy="0" r="2.2" fill="#fff" />
        </g>
      </svg>
    );
  }

  // 9. LILIN MALAM KUDUS & SALJU (CANDLELIGHT VIGIL)
  if (id === 'html-christmas-candle') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="candleNightBg" cx="50%" cy="85%" r="75%">
            <stop offset="0%" stopColor="#241005" />
            <stop offset="45%" stopColor="#100502" />
            <stop offset="100%" stopColor="#040101" />
          </radialGradient>
          <radialGradient id="flameHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffeed5" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#b45309" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="160" height="100" fill="url(#candleNightBg)" />

        <circle cx="45" cy="45" r="14" fill="#f59e0b" opacity="0.16" />
        <circle cx="115" cy="38" r="16" fill="#f59e0b" opacity="0.14" />
        <circle cx="80" cy="30" r="12" fill="#f59e0b" opacity="0.12" />
        <circle cx="30" cy="70" r="9" fill="#ef4444" opacity="0.12" />
        <circle cx="132" cy="68" r="10" fill="#f59e0b" opacity="0.15" />

        <circle cx="25" cy="20" r="1" fill="#fff" opacity="0.8" />
        <circle cx="55" cy="60" r="1.3" fill="#fff" opacity="0.85" />
        <circle cx="75" cy="15" r="1" fill="#fff" opacity="0.75" />
        <circle cx="105" cy="55" r="1.2" fill="#fff" opacity="0.8" />
        <circle cx="138" cy="25" r="1.1" fill="#fff" opacity="0.7" />
        <circle cx="145" cy="75" r="1.3" fill="#fff" opacity="0.75" />

        <circle cx="80" cy="80" r="28" fill="url(#flameHalo)" />

        <path
          d="M74,86 C74,77 79,70 80,68 C81,70 86,77 86,86 C86,91 74,91 74,86 Z"
          fill="#f59e0b"
        />
        <path
          d="M76,86 C76,80 79.5,74 80,72 C80.5,74 84,80 84,86 C84,89 76,89 76,86 Z"
          fill="#fef08a"
        />
        <circle cx="80" cy="84" r="1.8" fill="#fff" />

        <line x1="80" y1="87" x2="80" y2="92" stroke="#44403c" strokeWidth="1.2" />
        <rect x="70" y="92" width="20" height="25" rx="2" fill="#1c1917" stroke="#44403c" strokeWidth="0.8" />
      </svg>
    );
  }

  // 10. HIASAN EMAS & PARTIKEL LONCENG NATAL (GOLDEN NOEL)
  if (id === 'html-golden-noel') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="noelBg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#0a2618" />
            <stop offset="50%" stopColor="#05150d" />
            <stop offset="85%" stopColor="#120408" />
            <stop offset="100%" stopColor="#020603" />
          </radialGradient>
          <radialGradient id="goldSphere1" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#eab308" />
            <stop offset="90%" stopColor="#854d0e" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>
        </defs>

        <rect width="160" height="100" fill="url(#noelBg)" />

        <line x1="38" y1="0" x2="38" y2="35" stroke="#fde047" strokeWidth="0.8" opacity="0.6" />
        <rect x="35" y="33" width="6" height="3" rx="1" fill="#fde047" />
        <circle cx="38" cy="46" r="10" fill="url(#goldSphere1)" />

        <line x1="110" y1="0" x2="110" y2="40" stroke="#fde047" strokeWidth="0.9" opacity="0.6" />
        <rect x="106" y="38" width="8" height="4" rx="1" fill="#fde047" />
        <circle cx="110" cy="55" r="14" fill="url(#goldSphere1)" />

        <line x1="75" y1="0" x2="75" y2="24" stroke="#fde047" strokeWidth="0.6" opacity="0.5" />
        <circle cx="75" cy="30" r="6" fill="url(#goldSphere1)" />

        <g stroke="#fef08a" strokeWidth="0.8" opacity="0.85">
          <line x1="60" y1="50" x2="68" y2="50" />
          <line x1="64" y1="46" x2="64" y2="54" />

          <line x1="135" y1="35" x2="141" y2="35" />
          <line x1="138" y1="32" x2="138" y2="38" />

          <line x1="22" y1="70" x2="28" y2="70" />
          <line x1="25" y1="67" x2="25" y2="73" />
        </g>

        <circle cx="52" cy="72" r="1.2" fill="#fef08a" opacity="0.85" />
        <circle cx="85" cy="65" r="1.4" fill="#fde047" opacity="0.9" />
        <circle cx="95" cy="82" r="1.1" fill="#fef08a" opacity="0.8" />
        <circle cx="128" cy="75" r="1.3" fill="#fde047" opacity="0.85" />
        <circle cx="18" cy="35" r="1" fill="#fef08a" opacity="0.75" />
        <circle cx="145" cy="60" r="1.2" fill="#fef08a" opacity="0.8" />
      </svg>
    );
  }

  // 11. KRISTAL SALJU 3D CSS (SPATIAL SNOWFALL)
  if (id === 'html-css3d-snow-crystals') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="css3dSnowBg" cx="50%" cy="25%" r="80%">
            <stop offset="0%" stopColor="#0b2347" />
            <stop offset="50%" stopColor="#040e21" />
            <stop offset="100%" stopColor="#01040a" />
          </radialGradient>
          <filter id="iceGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <rect width="160" height="100" fill="url(#css3dSnowBg)" />

        {/* Ambient Top Aurora Frost Glow */}
        <ellipse cx="80" cy="18" rx="55" ry="18" fill="#38bdf8" opacity="0.15" />

        {/* Distant Background Snowflakes (small, soft blur) */}
        <g stroke="#93c5fd" strokeWidth="0.8" fill="none" opacity="0.45">
          <circle cx="28" cy="25" r="3" />
          <line x1="28" y1="20" x2="28" y2="30" />
          <line x1="23" y1="25" x2="33" y2="25" />

          <circle cx="135" cy="32" r="3.5" />
          <line x1="135" y1="26" x2="135" y2="38" />
          <line x1="129" y1="32" x2="141" y2="32" />

          <circle cx="120" cy="78" r="2.5" />
          <circle cx="45" cy="80" r="2" />
        </g>

        {/* Foreground 3D Crystal Snowflake (Tilted in 3D perspective) */}
        <g transform="translate(80, 52) rotate(15) skewX(-12)" filter="url(#iceGlow)">
          {/* Main 6-arm crystal axes */}
          <line x1="0" y1="-26" x2="0" y2="26" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="-22.5" y1="-13" x2="22.5" y2="13" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="-22.5" y1="13" x2="22.5" y2="-13" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />

          {/* Ice Barb Feathers */}
          <path
            d="M-4,-18 L0,-14 L4,-18 M-4,18 L0,14 L4,18 M-14,-14 L-11,-10 L-7,-13 M14,14 L11,10 L7,13 M-14,14 L-11,10 L-7,13 M14,-14 L11,-10 L7,-13"
            stroke="#bae6fd"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Center Hexagonal Core */}
          <polygon
            points="0,-6 5.2,-3 5.2,3 0,6 -5.2,3 -5.2,-3"
            fill="#38bdf8"
            opacity="0.35"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <circle cx="0" cy="0" r="2" fill="#ffffff" />
        </g>

        {/* Midground 3D Snowflake (Left) */}
        <g transform="translate(36, 56) rotate(-28) skewY(10)" opacity="0.8">
          <line x1="0" y1="-14" x2="0" y2="14" stroke="#e0f2fe" strokeWidth="1.2" />
          <line x1="-12" y1="-7" x2="12" y2="7" stroke="#e0f2fe" strokeWidth="1.2" />
          <line x1="-12" y1="7" x2="12" y2="-7" stroke="#e0f2fe" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
        </g>

        {/* Midground 3D Snowflake (Right) */}
        <g transform="translate(126, 62) rotate(35) skewX(8)" opacity="0.85">
          <line x1="0" y1="-16" x2="0" y2="16" stroke="#e0f2fe" strokeWidth="1.3" />
          <line x1="-14" y1="-8" x2="14" y2="8" stroke="#e0f2fe" strokeWidth="1.3" />
          <line x1="-14" y1="8" x2="14" y2="-8" stroke="#e0f2fe" strokeWidth="1.3" />
          <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
        </g>

        {/* Floating Sparkle Dots */}
        <circle cx="68" cy="22" r="1.1" fill="#bae6fd" opacity="0.9" />
        <circle cx="98" cy="28" r="1.2" fill="#ffffff" opacity="0.9" />
        <circle cx="58" cy="85" r="1" fill="#bae6fd" opacity="0.8" />
        <circle cx="102" cy="82" r="1.2" fill="#ffffff" opacity="0.85" />
      </svg>
    );
  }

  // 12. LENTERA CAHAYA NATAL 3D CSS (3D NOEL LANTERNS)
  if (id === 'html-css3d-christmas-lanterns') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="lanternBg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#0d2417" />
            <stop offset="55%" stopColor="#06120b" />
            <stop offset="100%" stopColor="#020503" />
          </radialGradient>
          <radialGradient id="lanternCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#fef08a" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="160" height="100" fill="url(#lanternBg)" />

        {/* Ambient Warm Golden Halo Glow */}
        <circle cx="80" cy="50" r="35" fill="url(#lanternCore)" opacity="0.7" />

        {/* Hanging Golden Cords */}
        <line x1="80" y1="0" x2="80" y2="30" stroke="#fde047" strokeWidth="1" opacity="0.7" />
        <line x1="32" y1="0" x2="32" y2="38" stroke="#fde047" strokeWidth="0.8" opacity="0.5" />
        <line x1="128" y1="0" x2="128" y2="34" stroke="#fde047" strokeWidth="0.8" opacity="0.5" />

        {/* Center 3D Hexagonal Prism Lantern (Main) */}
        <g transform="translate(80, 52)">
          {/* Facet polygon planes */}
          <polygon points="-16,-20 0,-26 16,-20 16,14 0,20 -16,14" fill="#fef08a" fillOpacity="0.12" stroke="#fde047" strokeWidth="1.2" />
          <polygon points="-16,-20 0,-26 0,20 -16,14" fill="#fef08a" fillOpacity="0.18" stroke="#fde047" strokeWidth="1" />
          <polygon points="0,-26 16,-20 16,14 0,20" fill="#fef08a" fillOpacity="0.25" stroke="#fde047" strokeWidth="1" />

          {/* Internal Glowing Candle Flame Core */}
          <ellipse cx="0" cy="-2" rx="7" ry="10" fill="url(#lanternCore)" />
          <circle cx="0" cy="-2" r="3" fill="#ffffff" />
        </g>

        {/* Left Smaller 3D Lantern */}
        <g transform="translate(32, 54) scale(0.65)" opacity="0.85">
          <polygon points="-16,-20 0,-26 16,-20 16,14 0,20 -16,14" fill="#fef08a" fillOpacity="0.15" stroke="#fde047" strokeWidth="1.2" />
          <polygon points="0,-26 16,-20 16,14 0,20" fill="#fef08a" fillOpacity="0.28" stroke="#fde047" strokeWidth="1" />
          <circle cx="0" cy="-2" r="5" fill="#fef08a" opacity="0.9" />
          <circle cx="0" cy="-2" r="2" fill="#fff" />
        </g>

        {/* Right Smaller 3D Lantern */}
        <g transform="translate(128, 50) scale(0.7)" opacity="0.85">
          <polygon points="-16,-20 0,-26 16,-20 16,14 0,20 -16,14" fill="#fef08a" fillOpacity="0.15" stroke="#fde047" strokeWidth="1.2" />
          <polygon points="-16,-20 0,-26 0,20 -16,14" fill="#fef08a" fillOpacity="0.28" stroke="#fde047" strokeWidth="1" />
          <circle cx="0" cy="-2" r="5" fill="#fef08a" opacity="0.9" />
          <circle cx="0" cy="-2" r="2" fill="#fff" />
        </g>

        {/* Ambient Stardust Sparkles */}
        <circle cx="58" cy="28" r="1.2" fill="#fef08a" opacity="0.9" />
        <circle cx="106" cy="22" r="1.1" fill="#fef08a" opacity="0.85" />
        <circle cx="52" cy="78" r="1.3" fill="#fde047" opacity="0.85" />
        <circle cx="108" cy="76" r="1.2" fill="#fef08a" opacity="0.9" />
        <circle cx="20" cy="70" r="1" fill="#fef08a" opacity="0.75" />
        <circle cx="145" cy="65" r="1.1" fill="#fde047" opacity="0.8" />
      </svg>
    );
  }

  // 14. BONEKA SALJU 3D CSS (FESTIVE WINTER SNOWMAN)
  if (id === 'html-css3d-snowman') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="css3dSnowmanBg" cx="50%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#0f2648" />
            <stop offset="55%" stopColor="#071427" />
            <stop offset="100%" stopColor="#020710" />
          </radialGradient>
          <radialGradient id="snowballGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#e2e8f0" />
            <stop offset="85%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>
          <linearGradient id="hatGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3f3f46" />
            <stop offset="50%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
        </defs>

        <rect width="160" height="100" fill="url(#css3dSnowmanBg)" />

        {/* Ambient Top Glow */}
        <ellipse cx="80" cy="20" rx="60" ry="16" fill="#38bdf8" opacity="0.12" />

        {/* Snowy Ground Base */}
        <ellipse cx="80" cy="98" rx="75" ry="18" fill="#64748b" opacity="0.5" />
        <ellipse cx="80" cy="95" rx="65" ry="12" fill="#cbd5e1" opacity="0.75" />

        {/* Snowman Body */}
        {/* Bottom Ball */}
        <ellipse cx="80" cy="76" rx="22" ry="19" fill="url(#snowballGrad)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))" />

        {/* Twig Arms */}
        {/* Left Arm with Lantern */}
        <line x1="68" y1="52" x2="48" y2="44" stroke="#5c3a21" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="53" y1="46" x2="50" y2="40" stroke="#5c3a21" strokeWidth="1.5" strokeLinecap="round" />
        {/* Hanging Lantern */}
        <line x1="48" y1="44" x2="48" y2="52" stroke="#78350f" strokeWidth="1.2" />
        <rect x="43" y="52" width="10" height="13" rx="1.5" fill="#fef08a" fillOpacity="0.3" stroke="#d97706" strokeWidth="1" />
        <circle cx="48" cy="58" r="3" fill="#f59e0b" />
        <circle cx="48" cy="58" r="1.5" fill="#fff" />
        {/* Warm lantern aura */}
        <circle cx="48" cy="58" r="8" fill="#fde047" opacity="0.25" />

        {/* Right Arm Waving */}
        <line x1="92" y1="52" x2="110" y2="42" stroke="#5c3a21" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="106" y1="44" x2="112" y2="38" stroke="#5c3a21" strokeWidth="1.5" strokeLinecap="round" />

        {/* Middle Ball */}
        <ellipse cx="80" cy="54" rx="16" ry="14" fill="url(#snowballGrad)" />
        {/* Coal Buttons */}
        <circle cx="80" cy="48" r="1.5" fill="#09090b" />
        <circle cx="80" cy="53" r="1.5" fill="#09090b" />
        <circle cx="80" cy="58" r="1.5" fill="#09090b" />

        {/* Scarf Ring & Tail */}
        <ellipse cx="80" cy="41" rx="14" ry="4.5" fill="#b91c1c" />
        <rect x="73" y="42" width="5" height="15" rx="1.5" fill="#b91c1c" />
        <rect x="73" y="45" width="5" height="3" fill="#15803d" />
        <rect x="73" y="51" width="5" height="3" fill="#15803d" />

        {/* Head Ball */}
        <ellipse cx="80" cy="32" rx="12" ry="11" fill="url(#snowballGrad)" />

        {/* Face */}
        {/* Eyes */}
        <circle cx="76" cy="29" r="1.4" fill="#09090b" />
        <circle cx="84" cy="29" r="1.4" fill="#09090b" />
        {/* Rosy Cheeks */}
        <circle cx="74" cy="33" r="1.8" fill="#f43f5e" opacity="0.45" />
        <circle cx="86" cy="33" r="1.8" fill="#f43f5e" opacity="0.45" />
        {/* Carrot Nose 3D */}
        <polygon points="79,32 79,34 90,34" fill="#ea580c" />
        {/* Coal Smile */}
        <circle cx="76" cy="36" r="0.8" fill="#09090b" />
        <circle cx="78" cy="37.5" r="0.8" fill="#09090b" />
        <circle cx="80" cy="38" r="0.8" fill="#09090b" />
        <circle cx="82" cy="37.5" r="0.8" fill="#09090b" />
        <circle cx="84" cy="36" r="0.8" fill="#09090b" />

        {/* Top Hat */}
        <ellipse cx="80" cy="23" rx="15" ry="3.5" fill="#18181b" />
        <path d="M72,23 L73,12 L87,12 L88,23 Z" fill="url(#hatGrad)" />
        <ellipse cx="80" cy="12" rx="7" ry="1.8" fill="#27272a" />
        <rect x="72.5" y="19" width="15" height="2.5" fill="#dc2626" />
        <circle cx="84" cy="20" r="1" fill="#ef4444" />
        <circle cx="86" cy="19.5" r="0.9" fill="#15803d" />

        {/* Falling 3D Snowflakes */}
        <circle cx="20" cy="20" r="1.4" fill="#fff" opacity="0.8" />
        <circle cx="34" cy="65" r="1.2" fill="#bae6fd" opacity="0.85" />
        <circle cx="130" cy="25" r="1.5" fill="#fff" opacity="0.75" />
        <circle cx="145" cy="55" r="1.2" fill="#bae6fd" opacity="0.9" />
        <circle cx="125" cy="78" r="1.8" fill="#fff" opacity="0.7" />
        <circle cx="60" cy="15" r="1" fill="#fff" opacity="0.85" />
        <circle cx="102" cy="18" r="1.3" fill="#fff" opacity="0.8" />
        <circle cx="18" cy="80" r="1.6" fill="#bae6fd" opacity="0.7" />
      </svg>
    );
  }

  // 15. SANTA CLAUS & KERETA RUSA 3D CSS (SANTA FLIGHT)
  if (id === 'html-css3d-santa-sleigh') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="css3dSantaBg" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#122748" />
            <stop offset="50%" stopColor="#071324" />
            <stop offset="100%" stopColor="#02050e" />
          </radialGradient>
          <radialGradient id="moonGlow" cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fef08a" />
            <stop offset="75%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>
        </defs>

        <rect width="160" height="100" fill="url(#css3dSantaBg)" />

        {/* Glowing Full Moon */}
        <circle cx="125" cy="30" r="18" fill="url(#moonGlow)" filter="drop-shadow(0 0 10px rgba(254,240,138,0.5))" />
        <circle cx="125" cy="30" r="26" fill="#fde047" opacity="0.15" />

        {/* Distant Pine Tree Silhouettes at Bottom */}
        <path d="M0,100 L0,90 L12,82 L24,91 L36,80 L52,90 L68,79 L84,89 L100,81 L118,90 L135,82 L150,91 L160,84 L160,100 Z" fill="#030816" opacity="0.9" />

        {/* Golden Stardust Sparkle Trail */}
        <g opacity="0.75">
          <circle cx="15" cy="56" r="1" fill="#fef08a" />
          <circle cx="24" cy="52" r="1.4" fill="#fde047" />
          <circle cx="35" cy="55" r="1.1" fill="#fef08a" />
          <circle cx="48" cy="49" r="1.5" fill="#fde047" />
          <circle cx="62" cy="46" r="1.2" fill="#fef08a" />
        </g>

        {/* Santa & Sleigh Assembly */}
        {/* Crimson Sleigh Carriage */}
        <path d="M52,48 Q50,62 60,65 L88,65 Q96,65 98,54 L98,48 Q94,54 88,54 L58,54 Z" fill="#b91c1c" stroke="#facc15" strokeWidth="1.2" />
        {/* Curled Golden Runner */}
        <path d="M46,68 L94,68 Q100,68 102,62 Q103,58 99,57" fill="none" stroke="#facc15" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="56" y1="65" x2="56" y2="68" stroke="#ca8a04" strokeWidth="1.2" />
        <line x1="86" y1="65" x2="86" y2="68" stroke="#ca8a04" strokeWidth="1.2" />

        {/* Gift Sack in Sleigh */}
        <circle cx="58" cy="46" r="7" fill="#15803d" />
        <rect x="58" y="38" width="5" height="5" fill="#eab308" transform="rotate(15, 60, 40)" />
        <rect x="54" y="40" width="4" height="4" fill="#dc2626" transform="rotate(-10, 56, 42)" />

        {/* Santa Claus */}
        {/* Red Coat */}
        <path d="M68,44 L78,44 L80,54 L66,54 Z" fill="#dc2626" />
        {/* Black Belt */}
        <line x1="67" y1="50" x2="79" y2="50" stroke="#18181b" strokeWidth="2.5" />
        <rect x="71.5" y="48.5" width="3" height="3" fill="#facc15" />
        {/* Waving Arm with Mitten */}
        <line x1="68" y1="45" x2="61" y2="38" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="37" r="2.2" fill="#15803d" />
        {/* Santa Head */}
        <circle cx="73" cy="38" r="4.5" fill="#fed7aa" />
        {/* Beard */}
        <path d="M69,39 Q73,47 77,39 Q75,44 71,44 Z" fill="#ffffff" />
        {/* Santa Hat with Pom */}
        <path d="M69,36 Q73,30 79,35 Z" fill="#dc2626" />
        <ellipse cx="73" cy="36" rx="5" ry="1.5" fill="#f8fafc" />
        <circle cx="80" cy="36" r="1.6" fill="#ffffff" />

        {/* Golden Reins */}
        <path d="M78,46 Q95,49 110,44" fill="none" stroke="#facc15" strokeWidth="0.9" strokeDasharray="2,2" />

        {/* Galloping Reindeer */}
        {/* Reindeer Body */}
        <ellipse cx="118" cy="44" rx="9" ry="5.5" fill="#854d0e" />
        {/* Reindeer Head */}
        <circle cx="126" cy="39" r="3.5" fill="#a16207" />
        {/* Golden Antlers */}
        <path d="M126,36 L128,30 M128,32 L131,31" stroke="#facc15" strokeWidth="1.2" strokeLinecap="round" />
        {/* Rudolph's Glowing Red Nose */}
        <circle cx="129.5" cy="40" r="1.8" fill="#ef4444" filter="drop-shadow(0 0 3px #f87171)" />
        <circle cx="129.5" cy="40" r="4" fill="#f87171" opacity="0.3" />
        {/* Reindeer Galloping Legs */}
        <line x1="113" y1="48" x2="108" y2="56" stroke="#854d0e" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="122" y1="48" x2="128" y2="55" stroke="#854d0e" strokeWidth="1.4" strokeLinecap="round" />

        {/* Star Sparkles */}
        <circle cx="28" cy="22" r="1.1" fill="#fff" opacity="0.9" />
        <circle cx="48" cy="18" r="1" fill="#bae6fd" opacity="0.8" />
        <circle cx="85" cy="15" r="1.2" fill="#fff" opacity="0.85" />
        <circle cx="102" cy="22" r="1" fill="#fde047" opacity="0.9" />
        <circle cx="150" cy="50" r="1" fill="#fff" opacity="0.75" />
      </svg>
    );
  }

  // 16. POHON NATAL KRISTAL & KADO 3D CSS
  if (id === 'html-css3d-christmas-tree') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="css3dTreeBg" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#0b241e" />
            <stop offset="55%" stopColor="#051410" />
            <stop offset="100%" stopColor="#010504" />
          </radialGradient>
        </defs>

        <rect width="160" height="100" fill="url(#css3dTreeBg)" />

        {/* Ambient Top Glow */}
        <circle cx="80" cy="22" r="28" fill="#facc15" opacity="0.12" />

        {/* 4-Tier 3D Geometric Tree */}
        {/* Tier 4 (Bottom) */}
        <polygon points="80,48 50,75 110,75" fill="#0f3d22" stroke="#15803d" strokeWidth="0.8" />
        <polygon points="80,48 80,75 110,75" fill="#14532d" />
        {/* Tier 3 */}
        <polygon points="80,38 56,60 104,60" fill="#14532d" stroke="#166534" strokeWidth="0.8" />
        <polygon points="80,38 80,60 104,60" fill="#166534" />
        {/* Tier 2 */}
        <polygon points="80,28 62,47 98,47" fill="#166534" stroke="#15803d" strokeWidth="0.8" />
        <polygon points="80,28 80,47 98,47" fill="#15803d" />
        {/* Tier 1 (Top) */}
        <polygon points="80,20 68,34 92,34" fill="#15803d" stroke="#22c55e" strokeWidth="0.8" />
        <polygon points="80,20 80,34 92,34" fill="#22c55e" />

        {/* Golden Star at Apex */}
        <g transform="translate(80, 18) scale(0.75)">
          <polygon
            points="0,-10 3,-3 10,-3 4,2 6,9 0,5 -6,9 -4,2 -10,-3 -3,-3"
            fill="#facc15"
            stroke="#fef08a"
            strokeWidth="0.8"
            filter="drop-shadow(0 0 6px #facc15)"
          />
          <circle cx="0" cy="0" r="2" fill="#fff" />
        </g>

        {/* Fairy Lights on Tree */}
        <circle cx="72" cy="33" r="1.5" fill="#ef4444" filter="drop-shadow(0 0 3px #ef4444)" />
        <circle cx="88" cy="33" r="1.5" fill="#facc15" filter="drop-shadow(0 0 3px #facc15)" />
        <circle cx="64" cy="46" r="1.6" fill="#38bdf8" filter="drop-shadow(0 0 3px #38bdf8)" />
        <circle cx="80" cy="46" r="1.6" fill="#ef4444" filter="drop-shadow(0 0 3px #ef4444)" />
        <circle cx="96" cy="46" r="1.6" fill="#4ade80" filter="drop-shadow(0 0 3px #4ade80)" />
        <circle cx="58" cy="59" r="1.8" fill="#facc15" filter="drop-shadow(0 0 3px #facc15)" />
        <circle cx="75" cy="59" r="1.8" fill="#f472b6" filter="drop-shadow(0 0 3px #f472b6)" />
        <circle cx="92" cy="59" r="1.8" fill="#38bdf8" filter="drop-shadow(0 0 3px #38bdf8)" />
        <circle cx="52" cy="74" r="2" fill="#ef4444" filter="drop-shadow(0 0 3px #ef4444)" />
        <circle cx="68" cy="74" r="2" fill="#4ade80" filter="drop-shadow(0 0 3px #4ade80)" />
        <circle cx="86" cy="74" r="2" fill="#facc15" filter="drop-shadow(0 0 3px #facc15)" />
        <circle cx="106" cy="74" r="2" fill="#38bdf8" filter="drop-shadow(0 0 3px #38bdf8)" />

        {/* 3D Wrapped Gift Boxes at Base */}
        {/* Red Box with Gold Ribbon */}
        <rect x="52" y="78" width="14" height="13" rx="1" fill="#dc2626" stroke="#b91c1c" strokeWidth="0.8" />
        <line x1="59" y1="78" x2="59" y2="91" stroke="#facc15" strokeWidth="2" />
        <line x1="52" y1="84.5" x2="66" y2="84.5" stroke="#facc15" strokeWidth="2" />

        {/* Gold Box with Red Ribbon */}
        <rect x="94" y="77" width="14" height="14" rx="1" fill="#eab308" stroke="#ca8a04" strokeWidth="0.8" />
        <line x1="101" y1="77" x2="101" y2="91" stroke="#dc2626" strokeWidth="2" />
        <line x1="94" y1="84" x2="108" y2="84" stroke="#dc2626" strokeWidth="2" />

        {/* Blue Box with Silver Ribbon in Front */}
        <rect x="73" y="80" width="16" height="15" rx="1" fill="#2563eb" stroke="#1d4ed8" strokeWidth="0.8" />
        <line x1="81" y1="80" x2="81" y2="95" stroke="#ffffff" strokeWidth="2.2" />
        <line x1="73" y1="87.5" x2="89" y2="87.5" stroke="#ffffff" strokeWidth="2.2" />

        {/* Falling Snow Particles */}
        <circle cx="25" cy="25" r="1.2" fill="#fff" opacity="0.8" />
        <circle cx="36" cy="70" r="1" fill="#bae6fd" opacity="0.85" />
        <circle cx="132" cy="30" r="1.3" fill="#fff" opacity="0.8" />
        <circle cx="140" cy="75" r="1.1" fill="#bae6fd" opacity="0.85" />
        <circle cx="18" cy="88" r="1.4" fill="#fff" opacity="0.75" />
        <circle cx="145" cy="50" r="1" fill="#fff" opacity="0.8" />
      </svg>
    );
  }

  // 17. HAPPY BIRTHDAY JESUS (KELAHIRAN YESUS & PALUNGAN BETLEHEM)
  if (id === 'html-jesus-birthday') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hbJesusBg" cx="50%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#0d1b3e" />
            <stop offset="50%" stopColor="#060c20" />
            <stop offset="100%" stopColor="#02040b" />
          </radialGradient>
          <linearGradient id="hbJesusRay" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="160" height="100" fill="url(#hbJesusBg)" />

        {/* Volumetric Rays */}
        <polygon points="80,10 50,100 110,100" fill="url(#hbJesusRay)" />

        {/* Bethlehem Star at Top */}
        <g transform="translate(80, 20)">
          <polygon points="0,-18 2.5,-4 18,0 2.5,4 0,18 -2.5,4 -18,0 -2.5,-4" fill="#ffffff" filter="drop-shadow(0 0 6px #fef08a)" />
          <polygon points="0,-10 2,-2.5 10,0 2,2.5 0,10 -2,2.5 -10,0 -2,-2.5" fill="#fef08a" />
          <circle cx="0" cy="0" r="3" fill="#ffffff" />
        </g>

        {/* Holy Manger at Bottom */}
        <g transform="translate(80, 75)">
          <circle cx="0" cy="-6" r="18" fill="#fef08a" opacity="0.35" filter="drop-shadow(0 0 8px #f59e0b)" />
          {/* Wooden legs */}
          <line x1="-18" y1="2" x2="-30" y2="18" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
          <line x1="-30" y1="2" x2="-18" y2="18" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
          <line x1="18" y1="2" x2="30" y2="18" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="2" x2="18" y2="18" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
          {/* Cradle box */}
          <polygon points="-28,2 28,2 22,12 -22,12" fill="#78350f" stroke="#270f03" strokeWidth="1" />
          {/* Golden straw */}
          <path d="M-26,0 Q0,-8 26,0 Q14,6 0,4 Q-14,6 -26,0 Z" fill="#fde047" />
          {/* Christ Child Halo */}
          <circle cx="0" cy="-5" r="6" fill="#ffffff" filter="drop-shadow(0 0 4px #fef08a)" />
        </g>

        {/* Golden Stardust */}
        <circle cx="28" cy="22" r="0.9" fill="#fef08a" opacity="0.85" />
        <circle cx="135" cy="26" r="1.1" fill="#fff" opacity="0.9" />
        <circle cx="20" cy="65" r="1" fill="#fde047" opacity="0.75" />
        <circle cx="140" cy="70" r="0.8" fill="#fef08a" opacity="0.85" />
      </svg>
    );
  }

  // 18. PESTA ULANG TAHUN SUKACITA (FESTIVE BALLOONS & CONFETTI 3D)
  if (id === 'html-birthday-celebration') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hbPartyBg" cx="50%" cy="30%" r="85%">
            <stop offset="0%" stopColor="#1e0b35" />
            <stop offset="55%" stopColor="#0e0419" />
            <stop offset="100%" stopColor="#030107" />
          </radialGradient>
        </defs>

        <rect width="160" height="100" fill="url(#hbPartyBg)" />

        {/* Top ambient lights */}
        <circle cx="35" cy="15" r="28" fill="#f59e0b" opacity="0.18" />
        <circle cx="125" cy="15" r="28" fill="#ec4899" opacity="0.18" />

        {/* Floating 3D Balloons */}
        {/* Balloon 1: Gold (Left) */}
        <g transform="translate(24, 38)">
          <ellipse cx="0" cy="0" rx="10" ry="13" fill="#f59e0b" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.5))" />
          <ellipse cx="-3" cy="-4" rx="3.5" ry="5.5" fill="#fef08a" opacity="0.65" />
          <path d="M0,13 L0,26" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
        </g>
        {/* Balloon 2: Rose Pink (Left-Mid) */}
        <g transform="translate(48, 52)">
          <ellipse cx="0" cy="0" rx="11" ry="14" fill="#f43f5e" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.5))" />
          <ellipse cx="-3" cy="-4" rx="3.5" ry="5.5" fill="#fda4af" opacity="0.6" />
          <path d="M0,14 L0,28" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        </g>
        {/* Balloon 3: Gold Center */}
        <g transform="translate(80, 42)">
          <ellipse cx="0" cy="0" rx="12" ry="15" fill="#f59e0b" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))" />
          <ellipse cx="-3.5" cy="-4.5" rx="4" ry="6" fill="#fef08a" opacity="0.7" />
          <path d="M0,15 L0,30" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
        </g>
        {/* Balloon 4: Royal Blue (Right-Mid) */}
        <g transform="translate(112, 54)">
          <ellipse cx="0" cy="0" rx="10.5" ry="13.5" fill="#0284c7" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.5))" />
          <ellipse cx="-2.5" cy="-3.5" rx="3.2" ry="5" fill="#bae6fd" opacity="0.65" />
          <path d="M0,13.5 L0,26" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        </g>
        {/* Balloon 5: Magenta (Right) */}
        <g transform="translate(136, 35)">
          <ellipse cx="0" cy="0" rx="10" ry="13" fill="#db2777" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.5))" />
          <ellipse cx="-3" cy="-4" rx="3.5" ry="5.5" fill="#fbcfe8" opacity="0.65" />
          <path d="M0,13 L0,26" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
        </g>

        {/* Falling 3D Confetti */}
        <rect x="15" y="15" width="3" height="2" fill="#f59e0b" transform="rotate(25 15 15)" />
        <rect x="55" y="18" width="3.5" height="2" fill="#38bdf8" transform="rotate(-35 55 18)" />
        <rect x="75" y="10" width="3" height="3" fill="#f43f5e" transform="rotate(45 75 10)" />
        <rect x="105" y="16" width="3" height="2" fill="#4ade80" transform="rotate(15 105 16)" />
        <rect x="145" y="14" width="3.5" height="2" fill="#facc15" transform="rotate(-20 145 14)" />
        <rect x="35" y="75" width="3" height="2" fill="#a855f7" transform="rotate(30 35 75)" />
        <rect x="85" y="70" width="3" height="2" fill="#f43f5e" transform="rotate(-40 85 70)" />
        <rect x="125" y="80" width="3.5" height="2" fill="#facc15" transform="rotate(20 125 80)" />
      </svg>
    );
  }

  // 19. LILIN ULANG TAHUN EMAS & DOA SYUKUR (GOLDEN BIRTHDAY CANDLES)
  if (id === 'html-birthday-candles') {
    return (
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hbCandleBg" cx="50%" cy="65%" r="75%">
            <stop offset="0%" stopColor="#2b1404" />
            <stop offset="55%" stopColor="#140801" />
            <stop offset="100%" stopColor="#030100" />
          </radialGradient>
          <linearGradient id="candleWax" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ca8a04" />
            <stop offset="40%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#fef9c3" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        <rect width="160" height="100" fill="url(#hbCandleBg)" />

        {/* Ambient Flame Glow */}
        <circle cx="80" cy="45" r="45" fill="#f59e0b" opacity="0.3" />

        {/* 3 Golden Candles */}
        {/* Left Candle */}
        <g transform="translate(56, 48)">
          <path d="M0,-14 Q3.5,-7 3.5,-3.5 Q3.5,2 0,2 Q-3.5,2 -3.5,-3.5 Q-3.5,-7 0,-14 Z" fill="#f59e0b" filter="drop-shadow(0 0 5px #fef08a)" />
          <path d="M0,-9 Q1.8,-4.5 1.8,-2 Q1.8,1 0,1 Q-1.8,1 -1.8,-2 Q-1.8,-4.5 0,-9 Z" fill="#ffffff" />
          <line x1="0" y1="2" x2="0" y2="4.5" stroke="#1c1917" strokeWidth="1" />
          <rect x="-6" y="5" width="12" height="36" rx="2" fill="url(#candleWax)" />
        </g>

        {/* Center Candle (Tallest) */}
        <g transform="translate(80, 36)">
          <path d="M0,-16 Q4.5,-8 4.5,-4 Q4.5,3 0,3 Q-4.5,3 -4.5,-4 Q-4.5,-8 0,-16 Z" fill="#f59e0b" filter="drop-shadow(0 0 6px #fef08a)" />
          <path d="M0,-11 Q2.2,-5.5 2.2,-2 Q2.2,1.5 0,1.5 Q-2.2,1.5 -2.2,-2 Q-2.2,-5.5 0,-11 Z" fill="#ffffff" />
          <line x1="0" y1="3" x2="0" y2="5.5" stroke="#1c1917" strokeWidth="1.2" />
          <rect x="-7" y="6" width="14" height="48" rx="2" fill="url(#candleWax)" />
        </g>

        {/* Right Candle */}
        <g transform="translate(104, 44)">
          <path d="M0,-14 Q3.5,-7 3.5,-3.5 Q3.5,2 0,2 Q-3.5,2 -3.5,-3.5 Q-3.5,-7 0,-14 Z" fill="#f59e0b" filter="drop-shadow(0 0 5px #fef08a)" />
          <path d="M0,-9 Q1.8,-4.5 1.8,-2 Q1.8,1 0,1 Q-1.8,1 -1.8,-2 Q-1.8,-4.5 0,-9 Z" fill="#ffffff" />
          <line x1="0" y1="2" x2="0" y2="4.5" stroke="#1c1917" strokeWidth="1" />
          <rect x="-6" y="5" width="12" height="40" rx="2" fill="url(#candleWax)" />
        </g>

        {/* Rising Golden Bokeh Orbs */}
        <circle cx="45" cy="72" r="3" fill="#fef08a" opacity="0.35" />
        <circle cx="68" cy="25" r="3.5" fill="#f59e0b" opacity="0.3" />
        <circle cx="95" cy="22" r="3.2" fill="#fef08a" opacity="0.4" />
        <circle cx="118" cy="70" r="4" fill="#f59e0b" opacity="0.3" />
        <circle cx="80" cy="12" r="2" fill="#fff" opacity="0.85" />
      </svg>
    );
  }

  // 13. ANIMATED CROSS (PRESET anim-cross)
  if (id === 'anim-cross') {
    return (
      <div className={`${className} bg-slate-950 flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-radial from-indigo-900/30 via-slate-950 to-black" />
        <div className="relative w-7 h-14 bg-white/20 rounded shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center justify-center">
          <div className="absolute w-12 h-3.5 bg-white/30 rounded" />
        </div>
      </div>
    );
  }

  // 9. ANIMATED STARS (PRESET anim-stars)
  if (id === 'anim-stars') {
    return (
      <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" className={className}>
        <rect width="160" height="100" fill="#070b19" />
        <circle cx="30" cy="25" r="1" fill="#fff" opacity="0.8" />
        <circle cx="65" cy="18" r="1.2" fill="#fed7aa" opacity="0.9" />
        <circle cx="120" cy="35" r="1" fill="#fff" opacity="0.75" />
        <circle cx="45" cy="75" r="1.1" fill="#fff" opacity="0.85" />
        <circle cx="95" cy="60" r="0.9" fill="#fed7aa" opacity="0.8" />
        <circle cx="140" cy="80" r="1.2" fill="#fff" opacity="0.9" />
      </svg>
    );
  }

  // 10. GENERIC / USER CUSTOM HTML
  return (
    <div className={`${className} bg-gradient-to-br from-indigo-950 via-slate-900 to-black flex flex-col items-center justify-center p-2 text-center`}>
      <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-mono font-bold text-xs shadow mb-1">
        HTML
      </div>
      <span className="text-[10px] font-bold text-slate-300 truncate max-w-full">
        {name || 'Animasi HTML'}
      </span>
    </div>
  );
};
