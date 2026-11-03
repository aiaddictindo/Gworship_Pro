export interface PresetStillImage {
  id: string;
  name: string;
  description: string;
  data: string;
  category: 'CHURCH' | 'CHRISTMAS' | 'NATURE' | 'WORSHIP' | 'CELEBRATION';
}

// 1. ALTAR KUDUS & MIMBAR GEREJA (SANCTUARY ALTAR)
const SVG_ALTAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <linearGradient id="altarBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%23090e1a"/>
      <stop offset="45%" stop-color="%23171124"/>
      <stop offset="80%" stop-color="%23221926"/>
      <stop offset="100%" stop-color="%23120d17"/>
    </linearGradient>
    <radialGradient id="altarGlow" cx="50%" cy="38%" r="60%">
      <stop offset="0%" stop-color="%23fbbf24" stop-opacity="0.45"/>
      <stop offset="35%" stop-color="%23d97706" stop-opacity="0.2"/>
      <stop offset="70%" stop-color="%2378350f" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="%23000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="crossGlow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%23fffbeb"/>
      <stop offset="30%" stop-color="%23fef08a"/>
      <stop offset="100%" stop-color="%23f59e0b"/>
    </linearGradient>
    <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%23fef08a" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="%23f59e0b" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(%23altarBg)"/>
  <rect width="1920" height="1080" fill="url(%23altarGlow)"/>
  <polygon points="960,0 720,1080 1200,1080" fill="url(%23beamGrad)" opacity="0.7"/>
  <polygon points="960,0 520,1080 840,1080" fill="url(%23beamGrad)" opacity="0.35"/>
  <polygon points="960,0 1080,1080 1400,1080" fill="url(%23beamGrad)" opacity="0.35"/>
  <path d="M0,0 L0,1080 L320,1080 L320,380 Q560,140 960,140 Q1360,140 1600,380 L1600,1080 L1920,1080 L1920,0 Z" fill="%23050811" opacity="0.75"/>
  <path d="M0,0 L0,1080 L180,1080 L180,440 Q570,220 960,220 Q1350,220 1740,440 L1740,1080 L1920,1080 L1920,0 Z" fill="%2303040a" opacity="0.85"/>
  <ellipse cx="960" cy="400" rx="320" ry="320" fill="%23fef08a" opacity="0.12"/>
  <ellipse cx="960" cy="400" rx="160" ry="160" fill="%23fde047" opacity="0.28"/>
  <rect x="942" y="220" width="36" height="380" rx="8" fill="url(%23crossGlow)"/>
  <rect x="840" y="320" width="240" height="34" rx="8" fill="url(%23crossGlow)"/>
  <path d="M80,1080 L360,820 L1560,820 L1840,1080 Z" fill="%231a141d" opacity="0.95"/>
  <path d="M360,820 L1560,820 L1530,795 L390,795 Z" fill="%233e1c08" opacity="0.85"/>
  <path d="M680,840 L1240,840 L1200,990 L720,990 Z" fill="%230d0912" opacity="0.9"/>
  <rect x="520" y="775" width="16" height="45" rx="4" fill="%23fef3c7"/>
  <ellipse cx="528" cy="768" rx="6" ry="11" fill="%23f59e0b"/>
  <rect x="1384" y="775" width="16" height="45" rx="4" fill="%23fef3c7"/>
  <ellipse cx="1392" cy="768" rx="6" ry="11" fill="%23f59e0b"/>
</svg>`;

// 2. SALIB SILUET SENJA (SUNSET CROSS SILHOUETTE)
const SVG_CROSS_DUSK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <linearGradient id="duskSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%231e112d"/>
      <stop offset="25%" stop-color="%233b154c"/>
      <stop offset="50%" stop-color="%236b21a8"/>
      <stop offset="70%" stop-color="%23c2410c"/>
      <stop offset="85%" stop-color="%23ea580c"/>
      <stop offset="95%" stop-color="%23f59e0b"/>
      <stop offset="100%" stop-color="%23fef08a"/>
    </linearGradient>
    <radialGradient id="sunGlow" cx="62%" cy="68%" r="45%">
      <stop offset="0%" stop-color="%23ffffff" stop-opacity="0.95"/>
      <stop offset="15%" stop-color="%23fef08a" stop-opacity="0.8"/>
      <stop offset="45%" stop-color="%23f97316" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="%23c2410c" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(%23duskSky)"/>
  <rect width="1920" height="1080" fill="url(%23sunGlow)"/>
  <path d="M0,740 Q380,680 720,730 T1440,710 T1920,740 L1920,1080 L0,1080 Z" fill="%232e1065" opacity="0.7"/>
  <path d="M0,820 Q480,760 960,810 T1920,800 L1920,1080 L0,1080 Z" fill="%231a0b2e" opacity="0.88"/>
  <path d="M0,910 Q320,860 760,920 T1560,890 T1920,930 L1920,1080 L0,1080 Z" fill="%230c0517"/>
  <!-- Mountain Hill with Calvary Crosses -->
  <path d="M420,1080 Q760,840 1180,840 Q1520,840 1860,1080 Z" fill="%23080310"/>
  <!-- Main Center Cross -->
  <rect x="1165" y="440" width="28" height="420" rx="5" fill="%23080310"/>
  <rect x="1085" y="530" width="188" height="26" rx="5" fill="%23080310"/>
  <!-- Side Cross Left -->
  <rect x="1025" y="580" width="18" height="260" rx="3" fill="%23080310" opacity="0.85"/>
  <rect x="975" y="635" width="118" height="16" rx="3" fill="%23080310" opacity="0.85"/>
  <!-- Side Cross Right -->
  <rect x="1310" y="600" width="18" height="240" rx="3" fill="%23080310" opacity="0.85"/>
  <rect x="1260" y="650" width="118" height="16" rx="3" fill="%23080310" opacity="0.85"/>
</svg>`;

// 3. KANDANG BETLEHEM NATAL (BETHLEHEM NATIVITY STABLE)
const SVG_NATIVITY = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <radialGradient id="bethlehemNight" cx="50%" cy="20%" r="75%">
      <stop offset="0%" stop-color="%231e293b"/>
      <stop offset="35%" stop-color="%230f172a"/>
      <stop offset="70%" stop-color="%23020617"/>
      <stop offset="100%" stop-color="%23000208"/>
    </radialGradient>
    <radialGradient id="starOfBethlehem" cx="50%" cy="16%" r="35%">
      <stop offset="0%" stop-color="%23ffffff" stop-opacity="0.95"/>
      <stop offset="12%" stop-color="%23fef08a" stop-opacity="0.85"/>
      <stop offset="35%" stop-color="%23f59e0b" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="%23000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="stableLanternGlow" cx="50%" cy="75%" r="45%">
      <stop offset="0%" stop-color="%23fef3c7" stop-opacity="0.6"/>
      <stop offset="25%" stop-color="%23f59e0b" stop-opacity="0.3"/>
      <stop offset="65%" stop-color="%2378350f" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="%23000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(%23bethlehemNight)"/>
  <rect width="1920" height="1080" fill="url(%23starOfBethlehem)"/>
  <polygon points="960,172 966,50 960,172 1082,172 960,172 960,300 960,172 838,172" stroke="%23fffbeb" stroke-width="3" fill="none" opacity="0.9"/>
  <polygon points="960,172 1030,102 960,172 1030,242 960,172 890,242 960,172 890,102" stroke="%23fef08a" stroke-width="2" fill="none" opacity="0.75"/>
  <rect width="1920" height="1080" fill="url(%23stableLanternGlow)"/>
  <!-- Bethlehem Hill Ridges -->
  <path d="M0,720 Q480,680 960,740 T1920,700 L1920,1080 L0,1080 Z" fill="%2309101f" opacity="0.85"/>
  <path d="M0,820 Q400,770 820,830 T1640,810 T1920,840 L1920,1080 L0,1080 Z" fill="%23050912"/>
  <!-- Rustic Bethlehem Stable Silhouette -->
  <!-- Left Pillar -->
  <rect x="620" y="580" width="34" height="420" fill="%231a120c"/>
  <!-- Right Pillar -->
  <rect x="1266" y="580" width="34" height="420" fill="%231a120c"/>
  <!-- Stable Roof Truss -->
  <polygon points="960,420 560,620 590,660 960,480 1330,660 1360,620" fill="%2324180f"/>
  <polygon points="960,440 945,580 975,580" fill="%231a120c"/>
  <!-- Warm Manger Center Table with Straw -->
  <polygon points="860,840 1060,840 1090,920 830,920" fill="%232d1f14"/>
  <path d="M830,835 Q960,815 1090,835 Q1060,865 960,860 Q860,865 830,835 Z" fill="%23fbbf24" opacity="0.85"/>
  <!-- Ground Straw Surface -->
  <path d="M480,1080 L560,940 L1360,940 L1440,1080 Z" fill="%231a1309"/>
</svg>`;

// 4. KATEDRAL & KACA PATRI (CATHEDRAL STAINED GLASS)
const SVG_CATHEDRAL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <radialGradient id="cathNight" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="%231e1b4b"/>
      <stop offset="45%" stop-color="%230f0e26"/>
      <stop offset="80%" stop-color="%23050410"/>
      <stop offset="100%" stop-color="%23000"/>
    </radialGradient>
    <radialGradient id="roseGlow" cx="50%" cy="32%" r="40%">
      <stop offset="0%" stop-color="%2338bdf8" stop-opacity="0.35"/>
      <stop offset="40%" stop-color="%23818cf8" stop-opacity="0.2"/>
      <stop offset="70%" stop-color="%23c084fc" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="%23000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(%23cathNight)"/>
  <rect width="1920" height="1080" fill="url(%23roseGlow)"/>
  <!-- Gothic Cathedral Columns -->
  <path d="M0,0 L0,1080 L260,1080 L260,340 Q580,80 960,80 Q1340,80 1660,340 L1660,1080 L1920,1080 L1920,0 Z" fill="%2304030a" opacity="0.8"/>
  <path d="M0,0 L0,1080 L140,1080 L140,420 Q560,160 960,160 Q1360,160 1780,420 L1780,1080 L1920,1080 L1920,0 Z" fill="%23020206"/>
  <!-- Central Rose Stained Glass Window -->
  <circle cx="960" cy="340" r="190" fill="%230284c7" opacity="0.35" stroke="%2338bdf8" stroke-width="4"/>
  <circle cx="960" cy="340" r="140" fill="%239333ea" opacity="0.4" stroke="%23c084fc" stroke-width="3"/>
  <circle cx="960" cy="340" r="85" fill="%23e11d48" opacity="0.45" stroke="%23fb7185" stroke-width="3"/>
  <circle cx="960" cy="340" r="38" fill="%23fbbf24" opacity="0.8" stroke="%23fef08a" stroke-width="3"/>
  <!-- Geometric Stained Glass Petals -->
  <circle cx="960" cy="200" r="32" fill="%2338bdf8" opacity="0.5"/>
  <circle cx="960" cy="480" r="32" fill="%2338bdf8" opacity="0.5"/>
  <circle cx="820" cy="340" r="32" fill="%2338bdf8" opacity="0.5"/>
  <circle cx="1100" cy="340" r="32" fill="%2338bdf8" opacity="0.5"/>
  <!-- Cathedral Floor Reflection -->
  <path d="M60,1080 L440,780 L1480,780 L1860,1080 Z" fill="%230c0a17" opacity="0.95"/>
</svg>`;

// 5. MALAM KUDUS BERTABUR BINTANG (STARLIT HOLY NIGHT)
const SVG_STARRY_NIGHT = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <linearGradient id="nightGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%23020617"/>
      <stop offset="35%" stop-color="%230b1329"/>
      <stop offset="65%" stop-color="%231e1b4b"/>
      <stop offset="100%" stop-color="%230f172a"/>
    </linearGradient>
    <radialGradient id="moonGlow" cx="78%" cy="25%" r="35%">
      <stop offset="0%" stop-color="%23ffffff" stop-opacity="0.95"/>
      <stop offset="25%" stop-color="%23fef08a" stop-opacity="0.7"/>
      <stop offset="60%" stop-color="%2338bdf8" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="%23000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(%23nightGradient)"/>
  <circle cx="1480" cy="260" r="75" fill="%23fffbeb"/>
  <rect width="1920" height="1080" fill="url(%23moonGlow)"/>
  <!-- Mountain Ridges -->
  <path d="M0,660 Q420,580 860,650 T1920,620 L1920,1080 L0,1080 Z" fill="%23091024" opacity="0.75"/>
  <path d="M0,760 Q340,700 780,770 T1580,740 T1920,780 L1920,1080 L0,1080 Z" fill="%23040914"/>
  <!-- Pine Silhouettes -->
  <polygon points="120,780 150,680 180,780" fill="%2302050b"/>
  <polygon points="170,800 205,690 240,800" fill="%2302050b"/>
  <polygon points="230,810 270,670 310,810" fill="%2302050b"/>
  <polygon points="1640,800 1680,680 1720,800" fill="%2302050b"/>
  <polygon points="1700,790 1740,660 1780,790" fill="%2302050b"/>
</svg>`;

// 6. PUNCAK GUNUNG FAJAR (DAWN WORSHIP HORIZON)
const SVG_MOUNTAIN_DAWN = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <linearGradient id="dawnSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%230f172a"/>
      <stop offset="30%" stop-color="%231e1b4b"/>
      <stop offset="60%" stop-color="%23431407"/>
      <stop offset="80%" stop-color="%239a3412"/>
      <stop offset="92%" stop-color="%23f97316"/>
      <stop offset="100%" stop-color="%23fef08a"/>
    </linearGradient>
    <radialGradient id="dawnSun" cx="50%" cy="80%" r="50%">
      <stop offset="0%" stop-color="%23ffffff" stop-opacity="0.95"/>
      <stop offset="20%" stop-color="%23fef08a" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="%23f59e0b" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="%23000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(%23dawnSky)"/>
  <rect width="1920" height="1080" fill="url(%23dawnSun)"/>
  <!-- Mountain Layers -->
  <polygon points="0,820 380,620 780,820" fill="%232e1065" opacity="0.6"/>
  <polygon points="580,840 960,560 1380,840" fill="%233b0764" opacity="0.75"/>
  <polygon points="1180,850 1560,590 1920,850" fill="%232e1065" opacity="0.6"/>
  <path d="M0,860 Q480,810 960,860 T1920,850 L1920,1080 L0,1080 Z" fill="%231a0b2e"/>
  <path d="M0,940 Q520,900 1040,940 T1920,930 L1920,1080 L0,1080 Z" fill="%230a0312"/>
</svg>`;


// 7. PANGGUNG PERAYAAN ULANG TAHUN (BIRTHDAY CELEBRATION STAGE)
const SVG_BIRTHDAY_STAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <linearGradient id="bdayStageBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%23130924"/>
      <stop offset="35%" stop-color="%2324103f"/>
      <stop offset="70%" stop-color="%2338144f"/>
      <stop offset="100%" stop-color="%2312061f"/>
    </linearGradient>
    <radialGradient id="stageSpotlight" cx="50%" cy="30%" r="55%">
      <stop offset="0%" stop-color="%23fef08a" stop-opacity="0.55"/>
      <stop offset="25%" stop-color="%23fbbf24" stop-opacity="0.3"/>
      <stop offset="60%" stop-color="%23c026d3" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="%23000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldRibbon" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="%23fffbeb"/>
      <stop offset="30%" stop-color="%23fde047"/>
      <stop offset="70%" stop-color="%23d97706"/>
      <stop offset="100%" stop-color="%23b45309"/>
    </linearGradient>
    <linearGradient id="stageFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%234c1d95"/>
      <stop offset="40%" stop-color="%231e1136"/>
      <stop offset="100%" stop-color="%230b0514"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(%23bdayStageBg)"/>
  <rect width="1920" height="1080" fill="url(%23stageSpotlight)"/>
  <g opacity="0.6">
    <line x1="200" y1="0" x2="200" y2="760" stroke="%23fde047" stroke-width="1.5" stroke-dasharray="3,14" opacity="0.8"/>
    <line x1="360" y1="0" x2="360" y2="760" stroke="%23fde047" stroke-width="1.5" stroke-dasharray="4,16" opacity="0.7"/>
    <line x1="520" y1="0" x2="520" y2="760" stroke="%23fef08a" stroke-width="2" stroke-dasharray="4,18" opacity="0.85"/>
    <line x1="680" y1="0" x2="680" y2="760" stroke="%23fde047" stroke-width="1.5" stroke-dasharray="3,12" opacity="0.75"/>
    <line x1="1240" y1="0" x2="1240" y2="760" stroke="%23fde047" stroke-width="1.5" stroke-dasharray="3,12" opacity="0.75"/>
    <line x1="1400" y1="0" x2="1400" y2="760" stroke="%23fef08a" stroke-width="2" stroke-dasharray="4,18" opacity="0.85"/>
    <line x1="1560" y1="0" x2="1560" y2="760" stroke="%23fde047" stroke-width="1.5" stroke-dasharray="4,16" opacity="0.7"/>
    <line x1="1720" y1="0" x2="1720" y2="760" stroke="%23fde047" stroke-width="1.5" stroke-dasharray="3,14" opacity="0.8"/>
  </g>
  <path d="M0,0 Q960,180 1920,0 L1920,60 Q960,240 0,60 Z" fill="%230b0614" opacity="0.95"/>
  <path d="M120,0 Q960,140 1800,0" stroke="url(%23goldRibbon)" stroke-width="4" fill="none" opacity="0.85"/>
  <polygon points="0,780 400,720 1520,720 1920,780 1920,1080 0,1080" fill="url(%23stageFloor)"/>
  <line x1="0" y1="780" x2="1920" y2="780" stroke="%23fbbf24" stroke-width="2.5" opacity="0.7"/>
  <polygon points="960,0 640,780 1280,780" fill="%23fbbf24" opacity="0.12"/>
  <polygon points="320,0 200,780 720,780" fill="%23c026d3" opacity="0.08"/>
  <polygon points="1600,0 1200,780 1720,780" fill="%23c026d3" opacity="0.08"/>
  <circle cx="960" cy="380" r="140" fill="%23fef08a" opacity="0.15"/>
  <circle cx="780" cy="440" r="70" fill="%23fbbf24" opacity="0.18"/>
  <circle cx="1140" cy="440" r="70" fill="%23fbbf24" opacity="0.18"/>
  <circle cx="500" cy="520" r="50" fill="%23e879f9" opacity="0.18"/>
  <circle cx="1420" cy="520" r="50" fill="%23e879f9" opacity="0.18"/>
</svg>`;

// 8. PALUNGAN KUDUS BETLEHEM (HOLY NATIVITY MANGER)
const SVG_JESUS_MANGER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <linearGradient id="holyNightSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%23060c1d"/>
      <stop offset="40%" stop-color="%230a1738"/>
      <stop offset="75%" stop-color="%231a1a3a"/>
      <stop offset="100%" stop-color="%230b0d18"/>
    </linearGradient>
    <radialGradient id="starBeam" cx="50%" cy="12%" r="65%">
      <stop offset="0%" stop-color="%23ffffff" stop-opacity="0.95"/>
      <stop offset="15%" stop-color="%23fef08a" stop-opacity="0.75"/>
      <stop offset="35%" stop-color="%23f59e0b" stop-opacity="0.35"/>
      <stop offset="70%" stop-color="%23b45309" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="%23000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="mangerGlow" cx="50%" cy="75%" r="35%">
      <stop offset="0%" stop-color="%23ffffff" stop-opacity="0.9"/>
      <stop offset="25%" stop-color="%23fef08a" stop-opacity="0.7"/>
      <stop offset="55%" stop-color="%23d97706" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="%23000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(%23holyNightSky)"/>
  <polygon points="960,110 740,1080 1180,1080" fill="%23fef08a" opacity="0.22"/>
  <polygon points="960,110 840,1080 1080,1080" fill="%23ffffff" opacity="0.28"/>
  <rect width="1920" height="1080" fill="url(%23starBeam)"/>
  <g transform="translate(960, 120)">
    <polygon points="0,-90 12,-20 90,0 12,20 0,90 -12,20 -90,0 -12,-20" fill="%23ffffff"/>
    <polygon points="0,-50 8,-12 50,0 8,12 0,50 -8,12 -50,0 -8,-12" fill="%23fef08a"/>
    <circle cx="0" cy="0" r="16" fill="%23ffffff"/>
  </g>
  <path d="M0,0 L0,1080 L380,1080 L380,520 L960,180 L1540,520 L1540,1080 L1920,1080 L1920,0 Z" fill="%2303060f" opacity="0.88"/>
  <polygon points="960,180 930,195 380,520 405,550" fill="%231a141f"/>
  <polygon points="960,180 990,195 1540,520 1515,550" fill="%231a141f"/>
  <circle cx="960" cy="780" r="300" fill="url(%23mangerGlow)"/>
  <g transform="translate(960, 800)">
    <line x1="-120" y1="40" x2="-60" y2="150" stroke="%23382110" stroke-width="22" stroke-linecap="round"/>
    <line x1="-60" y1="40" x2="-120" y2="150" stroke="%23382110" stroke-width="22" stroke-linecap="round"/>
    <line x1="120" y1="40" x2="60" y2="150" stroke="%23382110" stroke-width="22" stroke-linecap="round"/>
    <line x1="60" y1="40" x2="120" y2="150" stroke="%23382110" stroke-width="22" stroke-linecap="round"/>
    <path d="M-150,40 L150,40 L110,120 L-110,120 Z" fill="%235c3418" stroke="%232b170a" stroke-width="6"/>
    <path d="M-160,35 Q-80,10 0,30 Q80,10 160,35 Q130,70 100,50 Q40,65 0,45 Q-50,65 -110,50 Z" fill="%23facc15"/>
    <path d="M-140,40 Q-70,25 0,40 Q70,25 140,40 Q100,60 0,50 Q-100,60 -140,40 Z" fill="%23fef08a"/>
    <circle cx="0" cy="15" r="45" fill="%23ffffff" opacity="0.95"/>
    <circle cx="0" cy="15" r="70" fill="%23fde047" opacity="0.6"/>
  </g>
</svg>`;

export const DEFAULT_PRESET_IMAGES: PresetStillImage[] = [
  {
    id: 'preset-img-birthday',
    name: 'Panggung Perayaan Ulang Tahun (Celebration Stage)',
    description: 'Panggung sukacita gereja dengan tirai lampu peri, sorot lampu emas & suasana pesta',
    data: SVG_BIRTHDAY_STAGE,
    category: 'CELEBRATION',
  },
  {
    id: 'preset-img-jesus-manger',
    name: 'Palungan Kudus Betlehem (Jesus Nativity Manger)',
    description: 'Palungan bayi Yesus bercahaya surgawi dengan sinar Bintang Betlehem Malam Kudus',
    data: SVG_JESUS_MANGER,
    category: 'CHRISTMAS',
  },
  {
    id: 'preset-img-altar',
    name: 'Altar & Mimbar Gereja (Sanctuary Altar)',
    description: 'Pilar katedral agung dengan altar kayu dan sorotan sinar salib bercahaya',
    data: SVG_ALTAR,
    category: 'CHURCH',
  },
  {
    id: 'preset-img-cross-dusk',
    name: 'Salib Siluet Senja (Sunset Cross)',
    description: 'Langit senja jingga keemasan dengan siluet tiga salib di bukit Golgota',
    data: SVG_CROSS_DUSK,
    category: 'WORSHIP',
  },
  {
    id: 'preset-img-nativity',
    name: 'Kandang Betlehem Natal (Nativity Stable)',
    description: 'Kandang rustic Betlehem dengan palungan jerami dan Bintang Terang Malam Kudus',
    category: 'CHRISTMAS',
    data: SVG_NATIVITY,
  },
  {
    id: 'preset-img-cathedral',
    name: 'Katedral & Kaca Patri (Stained Glass)',
    description: 'Jendela mawar kaca patri warna-warni megah dengan pilar batu gotik',
    data: SVG_CATHEDRAL,
    category: 'CHURCH',
  },
  {
    id: 'preset-img-starry-sky',
    name: 'Malam Kudus Bertabur Bintang (Silent Night)',
    description: 'Langit malam biru samudra dengan bulan purnama dan barisan pinus tenang',
    data: SVG_STARRY_NIGHT,
    category: 'CHRISTMAS',
  },
  {
    id: 'preset-img-mountain-dawn',
    name: 'Puncak Gunung Fajar (Dawn Mountain Worship)',
    description: 'Cahaya fajar mentari pagi merekah di atas deretan pegunungan agung',
    data: SVG_MOUNTAIN_DAWN,
    category: 'NATURE',
  },
];
