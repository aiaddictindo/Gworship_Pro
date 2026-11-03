import { Song, BibleVerse, GradientSlot } from '../types';

export const INDO_BIBLE_BOOKS = [
  "Kejadian", "Keluaran", "Imamat", "Bilangan", "Ulangan", "Yosua", "Hakim-hakim", "Rut",
  "1 Samuel", "2 Samuel", "1 Raja-raja", "2 Raja-raja", "1 Tawarikh", "2 Tawarikh", "Ezra",
  "Nehemia", "Ester", "Ayub", "Mazmur", "Amsal", "Pengkhotbah", "Kidung Agung", "Yesaya",
  "Yeremia", "Ratapan", "Yehezkiel", "Daniel", "Hosea", "Yoel", "Amos", "Obaja", "Yunus",
  "Mikha", "Nahum", "Habakuk", "Zefanya", "Hagai", "Zakharia", "Maleakhi",
  "Matius", "Markus", "Lukas", "Yohanes", "Kisah Para Rasul", "Roma", "1 Korintus", "2 Korintus",
  "Galatia", "Efesus", "Filipi", "Kolose", "1 Tesalonika", "2 Tesalonika", "1 Timotius",
  "2 Timotius", "Titus", "Filemon", "Ibrani", "Yakobus", "1 Petrus", "2 Petrus",
  "1 Yohanes", "2 Yohanes", "3 Yohanes", "Yudas", "Wahyu"
];

export const PB_BOOKS = [
  "Matius", "Markus", "Lukas", "Yohanes", "Kisah Para Rasul", "Roma", "1 Korintus", "2 Korintus",
  "Galatia", "Efesus", "Filipi", "Kolose", "1 Tesalonika", "2 Tesalonika", "1 Timotius",
  "2 Timotius", "Titus", "Filemon", "Ibrani", "Yakobus", "1 Petrus", "2 Petrus",
  "1 Yohanes", "2 Yohanes", "3 Yohanes", "Yudas", "Wahyu"
];

export const DEFAULT_SONGS: Song[] = [
  {
    id: 1,
    title: "Bapa Engkau Sungguh Baik",
    lyrics: `[V1]
Bapa Engkau sungguh baik
Kasih-Mu melimpah di hidupku
Bapa 'ku bert'rima kasih
Berkat-Mu hari ini yang Kau sediakan bagiku

[C1]
Kunaikkan syukurku
Buat hari yang Kau b'ri
Tak habis-habisnya kasih dan rahmat-Mu
S'lalu baru dan tak pernah terlambat pertolongan-Mu
Besar setia-Mu di s'panjang hidupku`,
    bgAnim: "anim-cross"
  },
  {
    id: 2,
    title: "Sentuh Hatiku",
    lyrics: `[V1]
Betapa 'ku mencintai segala yang t'lah terjadi
Tak pernah sendiri jalani hidup ini
Selalu menyertai

[V2]
Betapa 'ku menyadari di dalam hidupku ini
Kau s'lalu memberi rancangan terbaik
Oleh karena kasih

[C1]
Bapa sentuh hatiku, ubah hidupku
Menjadi yang baru
Bagai emas yang murni
Kau membentuk bejana hatiku

[C2]
Bapa ajarku mengerti sebuah kasih
Yang selalu memberi
Bagai air mengalir
Yang tiada pernah berhenti`,
    bgAnim: "grad-1"
  },
  {
    id: 3,
    title: "Walau Ku Tak Dapat Melihat",
    lyrics: `[V1]
Ku sadar, tak semua dapat ku mengerti
Rahasia rencana-Mu bagi diriku
Namun ku tau satu hal yang pasti
Kasih-Mu tak pernah gagal

[C1]
Walau ku tak dapat melihat jalan-Mu
Namun ku tau janji-Mu pasti digenapi
Walau ku tak dapat mengerti cara-Mu
Namun ku tau rencana-Mu yang terbaik

[B1]
Ku mau bersandar pada-Mu Yesus
Ku mau percaya segenap hidupku`,
    bgAnim: "anim-stars"
  },
  {
    id: 4,
    title: "Kaulah Harapan",
    lyrics: `[V1]
Bukan dengan kekuatanku
'Ku dapat jalani hidupku
Tanpa Tuhan yang di sampingku
'Ku tak mampu sendiri

[V2]
Engkaulah kuatku
Yang menopang hidupku

[C1]
Kupandang wajah-Mu dan berseru
Pertolonganku datang dari-Mu
Peganglah tanganku, jangan lepaskan
Kaulah harapan dalam hidupku`,
    bgAnim: "grad-4"
  },
  {
    id: 5,
    title: "Janji-Mu S'perti Fajar",
    lyrics: `[V1]
Ketika kuhadapi kehidupan ini
Jalan mana yang harus kupilih
Kutahu sungguh, Engkau mengerti
Semua jalan hidupku

[C1]
Janji-Mu s'perti fajar pagi hari
Dan tiada pernah terlambat bersinar
Cinta-Mu s'perti sungai yang mengalir
Dan kutahu betapa dalam kasih-Mu`,
    bgAnim: "anim-cross"
  },
  {
    id: 6,
    title: "Amazing Grace (Anugerah Terbesar)",
    category: "Hymn / Dwibahasa",
    lyrics: `[V1]
Amazing grace, how sweet the sound
(Sungguh besar anugerah-Nya)
That saved a wretch like me
(Yang s'lamatkan jiwaku)

[V2]
I once was lost, but now am found
(Dahulu sesat, kini didapat)
Was blind, but now I see
(Dahulu buta, kini 'ku melihat)

[C1]
My chains are gone, I've been set free
(Rantaiku lepas, 'ku dibebaskan)
My God, my Savior has ransomed me
(Allah Penebusku melunasiku)

[B1]
The Lord has promised good to me
(Tuhan t'lah janjikan kebaikan bagiku)
His word my hope secures
(Firman-Nya teguhkan harapanku)

[E]
Praise God, praise God
(Pujilah Allah, pujilah Allah)
Praise God from whom all blessings flow
(Pujilah Sumber s'gala berkat)`,
    bgAnim: "html-heavenly-rays"
  },
  {
    id: 7,
    title: "Ro Ma Hamuna (Marilah Semua)",
    category: "Lagu Daerah / Batak",
    lyrics: `[V1]
Ro ma Hamuna angka na loja
(Marilah kamu sekalian yang berbeban berat)
Jala na sorat
(Dan yang letih lesu)

[C1]
Hupasonang pe hamu
(Aku akan memberikan kelegaan kepadamu)
Ninukki Tuhan Jesus
(Demikian firman Tuhan Yesus Kristus)

[V2]
Tangihon ma soara-Ni
(Dengarkanlah suara panggilan-Nya)
Ai holong do roha-Ni
(Karena sungguh besar kasih setia-Nya)`,
    bgAnim: "html-gold-cross"
  },
  {
    id: 8,
    title: "Malam Kudus (Silent Night)",
    category: "Lagu Natal / Christmas",
    lyrics: `[V1]
Silent night, holy night
(Malam kudus, sunyi senyap)
All is calm, all is bright
(Dunia terlelap)

[V2]
Round yon virgin mother and child
(Hanya dua berjaga terus)
Holy Infant so tender and mild
(Ayah bunda mesra dan kudus)

[C1]
Sleep in heavenly peace
(Anak tidur tenang)
Sleep in heavenly peace
(Anak tidur tenang)

[B1]
Silent night, holy night
(Malam kudus, sunyi senyap)
Son of God, love's pure light
(Kabar baik menggegap)
Radiant beams from Thy holy face
(Bala sorga menyanyikannya)
With the dawn of redeeming grace
(Kaum gembala menyaksikannya)`,
    bgAnim: "html-bethlehem-star"
  },
  {
    id: 9,
    title: "Hai Mari Berhimpun (O Come All Ye Faithful)",
    category: "Lagu Natal / Christmas",
    lyrics: `[V1]
O come, all ye faithful, joyful and triumphant
(Hai mari berhimpun dan bersukaria)
O come ye, O come ye to Bethlehem
(Turut semua ke Betlehem)

[C1]
Come and behold Him, born the King of angels
(Marilah pandang Tuhan bala sorga)
O come, let us adore Him
(Sembah dan puji Dia)
O come, let us adore Him
(Sembah dan puji Dia)
Christ the Lord
(Tuhanmu)

[V2]
Sing, choirs of angels, sing in exultation
(Bernyanyilah kamu tentara malaikat)
Sing, all ye citizens of heaven above
(Bernyanyilah warga sorgawi)
Glory to God, all glory in the highest
(Kemuliaan bagi Allah di tempat yang mahatinggi)`,
    bgAnim: "html-golden-noel"
  }
];

export const DEFAULT_BIBLE_VERSES: BibleVerse[] = [
  {
    id: "kej-1-1",
    book: "Kejadian",
    chapter: 1,
    verse: 1,
    text: "Pada mulanya Allah menciptakan langit dan bumi.",
    type: "PL"
  },
  {
    id: "kej-1-2",
    book: "Kejadian",
    chapter: 1,
    verse: 2,
    text: "Bumi belum berbentuk dan kosong; gelap gulita menutupi samudera raya, dan Roh Allah melayang-layang di atas permukaan air.",
    type: "PL"
  },
  {
    id: "kej-1-3",
    book: "Kejadian",
    chapter: 1,
    verse: 3,
    text: "Berfirmanlah Allah: \"Jadilah terang.\" Lalu terang itu jadi.",
    type: "PL"
  },
  {
    id: "maz-23-1",
    book: "Mazmur",
    chapter: 23,
    verse: 1,
    text: "TUHAN adalah gembalaku, takkan kekurangan aku.",
    type: "PL"
  },
  {
    id: "maz-23-2",
    book: "Mazmur",
    chapter: 23,
    verse: 2,
    text: "Ia membaringkan aku di padang yang berumput hijau, Ia membimbing aku ke air yang tenang;",
    type: "PL"
  },
  {
    id: "ams-3-5",
    book: "Amsal",
    chapter: 3,
    verse: 5,
    text: "Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri.",
    type: "PL"
  },
  {
    id: "yes-40-31",
    book: "Yesaya",
    chapter: 40,
    verse: 31,
    text: "Tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya; mereka berlari dan tidak menjadi lesu, mereka berjalan dan tidak menjadi lelah.",
    type: "PL"
  },
  {
    id: "mat-6-33",
    book: "Matius",
    chapter: 6,
    verse: 33,
    text: "Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu.",
    type: "PB"
  },
  {
    id: "yoh-3-16",
    book: "Yohanes",
    chapter: 3,
    verse: 16,
    text: "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.",
    type: "PB"
  },
  {
    id: "yoh-14-6",
    book: "Yohanes",
    chapter: 14,
    verse: 6,
    text: "Kata Yesus kepadanya: \"Akulah jalan dan kebenaran dan hidup. Tidak ada seorangpun yang datang kepada Bapa, kalau tidak melalui Aku.\"",
    type: "PB"
  },
  {
    id: "rom-8-28",
    book: "Roma",
    chapter: 8,
    verse: 28,
    text: "Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia, yaitu bagi mereka yang terpanggil sesuai dengan rencana Allah.",
    type: "PB"
  },
  {
    id: "1kor-13-4",
    book: "1 Korintus",
    chapter: 13,
    verse: 4,
    text: "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong.",
    type: "PB"
  },
  {
    id: "fil-4-13",
    book: "Filipi",
    chapter: 4,
    verse: 13,
    text: "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.",
    type: "PB"
  }
];

export const DEFAULT_GRADIENTS: Record<string, GradientSlot> = {
  'grad-1': { c1: '#0f2027', c2: '#203a43' },
  'grad-2': { c1: '#141e30', c2: '#243b55' },
  'grad-3': { c1: '#4b6cb7', c2: '#182848' },
  'grad-4': { c1: '#8E2DE2', c2: '#4A00E0' },
  'grad-5': { c1: '#1D976C', c2: '#93F9B9' },
  'grad-6': { c1: '#EB3349', c2: '#F45C43' },
  'grad-7': { c1: '#1A2980', c2: '#26D0CE' }
};

export const DEFAULT_GOLDEN_CROSS_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animasi Salib Emas Bercahaya</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body, html {
            width: 100%; height: 100%; overflow: hidden;
            background-color: #050505;
            background: radial-gradient(circle at center, #1a1400 0%, #050505 60%, #000000 100%);
            display: flex; justify-content: center; align-items: center;
            font-family: sans-serif;
        }
        #canvas-container {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 1; pointer-events: none;
        }
        #cross-container {
            position: relative; z-index: 2;
            display: flex; justify-content: center; align-items: center;
            width: 30vmin; height: 45vmin; min-width: 150px; min-height: 225px;
            perspective: 1000px;
        }
        .cross {
            width: 100%; height: 100%;
            filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 50px rgba(255, 200, 0, 0.3));
            animation: rotate3D 15s linear infinite, float 6s ease-in-out infinite;
            transform-style: preserve-3d;
        }
        @keyframes rotate3D {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
        }
        @keyframes float {
            0%, 100% { margin-top: 0; }
            50% { margin-top: -20px; }
        }
    </style>
</head>
<body>
    <div id="canvas-container">
        <canvas id="particleCanvas"></canvas>
    </div>
    <div id="cross-container">
        <svg class="cross" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FFF5A5; stop-opacity:1" />
                    <stop offset="40%" style="stop-color:#FFD700; stop-opacity:1" />
                    <stop offset="60%" style="stop-color:#DAA520; stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#B8860B; stop-opacity:1" />
                </linearGradient>
            </defs>
            <g fill="url(#goldGradient)">
                <rect x="42" y="10" width="16" height="130" rx="4" />
                <rect x="15" y="40" width="70" height="16" rx="4" />
            </g>
        </svg>
    </div>
    <script>
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 40;
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5 - 0.2;
                this.opacity = Math.random();
                this.fadeSpeed = (Math.random() * 0.02) + 0.005;
                this.fadingOut = Math.random() > 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.fadingOut) {
                    this.opacity -= this.fadeSpeed;
                    if (this.opacity <= 0) {
                        this.fadingOut = false;
                        if(Math.random() > 0.8) { this.reset(); this.opacity = 0; }
                    }
                } else {
                    this.opacity += this.fadeSpeed;
                    if (this.opacity >= 1) { this.fadingOut = true; }
                }
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 215, 100, ' + this.opacity + ')';
                ctx.fill();
                ctx.closePath();
            }
        }
        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) { particles.push(new Particle()); }
        }
        let lastTime = 0;
        const fpsInterval = 1000 / 30;
        function animate(currentTime) {
            requestAnimationFrame(animate);
            if (document.hidden) return;
            const delta = currentTime - lastTime;
            if (delta < fpsInterval) return;
            lastTime = currentTime - (delta % fpsInterval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        initParticles();
        requestAnimationFrame(animate);
    </script>
</body>
</html>`;

export const DEFAULT_CHRISTMAS_TREE_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Christmas Snow Loop</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #03050a; 
            background: radial-gradient(circle at center, #0b112c 0%, #020307 100%);
            font-family: sans-serif;
        }
        #canvas-container {
            width: 100vw;
            height: 100vh;
            display: block;
        }
    </style>
</head>
<body>
    <div id="canvas-container"></div>
    <script>
        let scene, camera, renderer;
        let snowParticles, bokehParticles, treeSystem, topStar;
        let snowVelocities = [];
        let bokehVelocities = [];
        const snowCount = 200;
        const bokehCount = 20;
        const treeCount = 600;

        function init() {
            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x0b112c, 0.0008);

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000);
            camera.position.set(0, 0, 1000);

            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
            document.getElementById('canvas-container').appendChild(renderer.domElement);

            const particleTexture = createGlowingTexture();

            const treeGeo = new THREE.BufferGeometry();
            const treePos = [];
            const treeColors = [];
            const colorGold = new THREE.Color(0xffd700);
            const colorWhite = new THREE.Color(0xffffff);
            const colorEmerald = new THREE.Color(0x2ecc71);

            for (let i = 0; i < treeCount; i++) {
                const progress = i / treeCount;
                const y = -350 + progress * 700; 
                const maxRadius = 300 * (1 - Math.pow(progress, 0.8)); 
                const angle = progress * Math.PI * 80;
                const noiseX = (Math.random() - 0.5) * 30;
                const noiseZ = (Math.random() - 0.5) * 30;

                const x = Math.cos(angle) * maxRadius + noiseX;
                const z = Math.sin(angle) * maxRadius + noiseZ;
                treePos.push(x, y, z);

                const colorMix = Math.random();
                let c = colorGold;
                if (colorMix > 0.75) c = colorWhite;
                if (colorMix > 0.95) c = colorEmerald;
                treeColors.push(c.r, c.g, c.b);
            }

            treeGeo.setAttribute('position', new THREE.Float32BufferAttribute(treePos, 3));
            treeGeo.setAttribute('color', new THREE.Float32BufferAttribute(treeColors, 3));

            const treeMat = new THREE.PointsMaterial({
                size: 6,
                vertexColors: true,
                map: particleTexture,
                blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: 0.9,
                depthWrite: false
            });

            treeSystem = new THREE.Points(treeGeo, treeMat);
            scene.add(treeSystem);

            const starGeo = new THREE.BufferGeometry();
            starGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 370, 0], 3));
            const starMat = new THREE.PointsMaterial({
                size: 200,
                color: 0xffffff,
                map: particleTexture,
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false
            });
            topStar = new THREE.Points(starGeo, starMat);
            scene.add(topStar);

            const snowGeo = new THREE.BufferGeometry();
            const snowPos = [];
            for (let i = 0; i < snowCount; i++) {
                snowPos.push(
                    (Math.random() - 0.5) * 3000,
                    (Math.random() - 0.5) * 2000,
                    (Math.random() - 0.5) * 3000
                );
                snowVelocities.push(
                    (Math.random() - 0.5) * 0.5,
                    0.5 + Math.random() * 2,
                    (Math.random() - 0.5) * 0.5
                );
            }
            snowGeo.setAttribute('position', new THREE.Float32BufferAttribute(snowPos, 3));
            const snowMat = new THREE.PointsMaterial({
                color: 0xffffff, size: 7, map: particleTexture,
                transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false
            });
            snowParticles = new THREE.Points(snowGeo, snowMat);
            scene.add(snowParticles);

            const bokehGeo = new THREE.BufferGeometry();
            const bokehPos = [];
            const bokehColors = [];
            const palette = [new THREE.Color(0xff2255), new THREE.Color(0xffaa00), new THREE.Color(0x0055ff)];
            
            for (let i = 0; i < bokehCount; i++) {
                bokehPos.push(
                    (Math.random() - 0.5) * 2000,
                    (Math.random() - 0.5) * 2000,
                    (Math.random() - 0.5) * 2000
                );
                bokehVelocities.push(
                    (Math.random() - 0.5) * 0.2,
                    0.2 + Math.random() * 0.5,
                    (Math.random() - 0.5) * 0.2
                );
                const c = palette[Math.floor(Math.random() * palette.length)];
                bokehColors.push(c.r, c.g, c.b);
            }
            bokehGeo.setAttribute('position', new THREE.Float32BufferAttribute(bokehPos, 3));
            bokehGeo.setAttribute('color', new THREE.Float32BufferAttribute(bokehColors, 3));
            
            const bokehMat = new THREE.PointsMaterial({
                size: 80,
                vertexColors: true, map: particleTexture,
                transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false
            });
            bokehParticles = new THREE.Points(bokehGeo, bokehMat);
            scene.add(bokehParticles);

            window.addEventListener('resize', onWindowResize, false);
        }

        function createGlowingTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 64; canvas.height = 64;
            const context = canvas.getContext('2d');
            const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.1, 'rgba(255,255,255,0.8)');
            gradient.addColorStop(0.4, 'rgba(255,255,255,0.2)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, 64, 64);
            return new THREE.CanvasTexture(canvas);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        let lastTime = 0;
        const fpsInterval = 1000 / 30;
        function animate(currentTime) {
            requestAnimationFrame(animate);
            if (document.hidden) return;
            const delta = currentTime - lastTime;
            if (delta < fpsInterval) return;
            lastTime = currentTime - (delta % fpsInterval);
            render();
        }

        function render() {
            const time = Date.now() * 0.0005;

            treeSystem.rotation.y = time * 0.2;
            topStar.rotation.y = time * 0.2;
            topStar.material.opacity = 0.6 + Math.sin(time * 3) * 0.4;

            const sPos = snowParticles.geometry.attributes.position.array;
            for (let i = 0; i < snowCount; i++) {
                const i3 = i * 3;
                sPos[i3] += snowVelocities[i3] + Math.sin(time + sPos[i3+1]*0.001)*0.2;
                sPos[i3 + 1] -= snowVelocities[i3 + 1];
                sPos[i3 + 2] += snowVelocities[i3 + 2];

                if (sPos[i3 + 1] < -1000) {
                    sPos[i3 + 1] = 1000;
                    sPos[i3] = (Math.random() - 0.5) * 3000;
                }
            }
            snowParticles.geometry.attributes.position.needsUpdate = true;

            const bPos = bokehParticles.geometry.attributes.position.array;
            for (let i = 0; i < bokehCount; i++) {
                const i3 = i * 3;
                bPos[i3] += bokehVelocities[i3] + Math.cos(time + bPos[i3+1]*0.002)*0.3;
                bPos[i3 + 1] += bokehVelocities[i3 + 1];
                bPos[i3 + 2] += bokehVelocities[i3 + 2];

                if (bPos[i3 + 1] > 1000) {
                    bPos[i3 + 1] = -1000;
                    bPos[i3] = (Math.random() - 0.5) * 2000;
                }
            }
            bokehParticles.geometry.attributes.position.needsUpdate = true;

            camera.position.x = Math.sin(time * 0.2) * 150;
            camera.position.y = Math.sin(time * 0.1) * 80;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        }

        window.onload = function() {
            init();
            animate();
        };
    </script>
</body>
</html>`;

export const DEFAULT_HEAVENLY_RAYS_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sinar Kemuliaan</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #04060c; }
    canvas { display: block; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    let w, h, t = 0;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * (w || 800),
        y: Math.random() * (h || 600),
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.15 - Math.random() * 0.3,
        alpha: Math.random() * 0.7 + 0.2,
        phase: Math.random() * Math.PI * 2
      });
    }

    let lastTime = 0;
    const fpsInterval = 1000 / 30;
    function draw(currentTime) {
      requestAnimationFrame(draw);
      if (document.hidden) return;
      const delta = currentTime - lastTime;
      if (delta < fpsInterval) return;
      lastTime = currentTime - (delta % fpsInterval);

      t += 0.016;
      ctx.fillStyle = '#03050c';
      ctx.fillRect(0, 0, w, h);

      const baseGlow = ctx.createRadialGradient(w * 0.5, 0, 10, w * 0.5, 0, Math.max(w, h));
      baseGlow.addColorStop(0, 'rgba(255, 230, 150, 0.28)');
      baseGlow.addColorStop(0.3, 'rgba(200, 160, 60, 0.12)');
      baseGlow.addColorStop(0.7, 'rgba(20, 30, 60, 0.05)');
      baseGlow.addColorStop(1, 'rgba(3, 5, 12, 0)');
      ctx.fillStyle = baseGlow;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const numRays = 8;
      for (let i = 0; i < numRays; i++) {
        const angle = -0.7 + (i / (numRays - 1)) * 1.4 + Math.sin(t * 0.6 + i * 0.8) * 0.06;
        const rayLen = Math.max(w, h) * 1.6;
        const spread = (0.04 + Math.sin(t * 0.9 + i) * 0.015);
        const opacity = (0.07 + Math.sin(t * 1.2 + i * 1.3) * 0.04);

        ctx.beginPath();
        ctx.moveTo(w * 0.5, 0);
        const x1 = w * 0.5 + Math.sin(angle - spread) * rayLen;
        const y1 = Math.cos(angle - spread) * rayLen;
        const x2 = w * 0.5 + Math.sin(angle + spread) * rayLen;
        const y2 = Math.cos(angle + spread) * rayLen;
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();

        const rayGrad = ctx.createRadialGradient(w * 0.5, 0, 0, w * 0.5, 0, rayLen);
        rayGrad.addColorStop(0, 'rgba(255, 240, 180, ' + (opacity * 1.8) + ')');
        rayGrad.addColorStop(0.3, 'rgba(255, 215, 120, ' + opacity + ')');
        rayGrad.addColorStop(0.7, 'rgba(220, 180, 80, ' + (opacity * 0.4) + ')');
        rayGrad.addColorStop(1, 'rgba(255, 200, 100, 0)');
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) { p.y = h; p.x = Math.random() * w; }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        const pulse = Math.sin(t * 2 + p.phase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 230, 160, ' + (p.alpha * pulse) + ')';
        ctx.fill();
      }
      ctx.restore();
    }
    requestAnimationFrame(draw);
  </script>
</body>
</html>`;

export const DEFAULT_AURORA_WAVES_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gelombang Sutra Aurora</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #030611; }
    canvas { display: block; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    let w, h, t = 0;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const waves = [
      { speed: 0.006, freq: 0.0018, amp: 90, yOffset: 0.52, color1: 'rgba(6, 182, 212, 0.25)', color2: 'rgba(59, 130, 246, 0.05)' },
      { speed: 0.008, freq: 0.0022, amp: 110, yOffset: 0.56, color1: 'rgba(139, 92, 246, 0.22)', color2: 'rgba(236, 72, 153, 0.04)' },
      { speed: 0.005, freq: 0.0014, amp: 80, yOffset: 0.48, color1: 'rgba(16, 185, 129, 0.20)', color2: 'rgba(6, 182, 212, 0.05)' },
      { speed: 0.009, freq: 0.0026, amp: 120, yOffset: 0.60, color1: 'rgba(99, 102, 241, 0.25)', color2: 'rgba(168, 85, 247, 0.02)' }
    ];

    let lastTime = 0;
    const fpsInterval = 1000 / 30;
    function draw(currentTime) {
      requestAnimationFrame(draw);
      if (document.hidden) return;
      const delta = currentTime - lastTime;
      if (delta < fpsInterval) return;
      lastTime = currentTime - (delta % fpsInterval);

      t += 1.8;
      ctx.fillStyle = '#02050e';
      ctx.fillRect(0, 0, w, h);

      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#030818');
      bgGrad.addColorStop(0.5, '#050a1f');
      bgGrad.addColorStop(1, '#010309');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < waves.length; i++) {
        const wv = waves[i];
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 16) {
          const y = h * wv.yOffset +
            Math.sin(x * wv.freq + t * wv.speed) * wv.amp +
            Math.sin(x * wv.freq * 0.5 + t * wv.speed * 0.7) * (wv.amp * 0.5);
          if (x === 0) ctx.lineTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, h * 0.3, 0, h);
        grad.addColorStop(0, wv.color1);
        grad.addColorStop(1, wv.color2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      ctx.restore();
    }
    requestAnimationFrame(draw);
  </script>
</body>
</html>`;

export const DEFAULT_HOLY_SPIRIT_FIRE_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nyala Api Roh Kudus</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #060201; }
    canvas { display: block; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Spark {
      constructor() { this.reset(); }
      reset() {
        this.x = (w || 800) * 0.5 + (Math.random() - 0.5) * (w || 800) * 0.8;
        this.y = (h || 600) + Math.random() * 40;
        this.r = Math.random() * 3 + 1;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = -(Math.random() * 2.5 + 1.5);
        this.life = Math.random() * 120 + 80;
        this.maxLife = this.life;
        this.colorType = Math.random();
      }
      update() {
        this.x += this.vx + Math.sin(this.y * 0.02) * 0.8;
        this.y += this.vy;
        this.life--;
        if (this.life <= 0 || this.y < -20) this.reset();
      }
      draw() {
        const progress = 1 - (this.life / this.maxLife);
        const alpha = Math.sin((this.life / this.maxLife) * Math.PI);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * (1 - progress * 0.5), 0, Math.PI * 2);
        if (this.colorType > 0.6) {
          ctx.fillStyle = 'rgba(255, 230, 100, ' + (alpha * 0.9) + ')';
        } else if (this.colorType > 0.3) {
          ctx.fillStyle = 'rgba(255, 120, 20, ' + (alpha * 0.85) + ')';
        } else {
          ctx.fillStyle = 'rgba(230, 40, 20, ' + (alpha * 0.75) + ')';
        }
        ctx.fill();
      }
    }

    const sparks = [];
    for (let i = 0; i < 32; i++) { sparks.push(new Spark()); }

    let heatPhase = 0;
    let lastTime = 0;
    const fpsInterval = 1000 / 30;
    function draw(currentTime) {
      requestAnimationFrame(draw);
      if (document.hidden) return;
      const delta = currentTime - lastTime;
      if (delta < fpsInterval) return;
      lastTime = currentTime - (delta % fpsInterval);

      heatPhase += 0.04;
      ctx.fillStyle = '#060201';
      ctx.fillRect(0, 0, w, h);

      const hearth = ctx.createRadialGradient(w * 0.5, h, 20, w * 0.5, h, h * 0.75);
      const intensity = 0.28 + Math.sin(heatPhase) * 0.05;
      hearth.addColorStop(0, 'rgba(255, 110, 20, ' + (intensity * 1.3) + ')');
      hearth.addColorStop(0.3, 'rgba(220, 60, 10, ' + intensity + ')');
      hearth.addColorStop(0.7, 'rgba(100, 20, 10, 0.15)');
      hearth.addColorStop(1, 'rgba(6, 2, 1, 0)');
      ctx.fillStyle = hearth;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let s of sparks) {
        s.update();
        s.draw();
      }
      ctx.restore();
    }
    requestAnimationFrame(draw);
  </script>
</body>
</html>`;

export const DEFAULT_SACRED_BOKEH_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lilin Doa & Bokeh Kudus</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #070502; }
    canvas { display: block; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Bokeh {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * (w || 800);
        this.y = (h || 600) + Math.random() * 100;
        this.r = Math.random() * 45 + 15;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -(Math.random() * 0.6 + 0.3);
        this.baseAlpha = Math.random() * 0.22 + 0.08;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulse = Math.random() * Math.PI * 2;
        this.gold = Math.random() > 0.3;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;
        if (this.y < -this.r * 2) this.reset();
      }
      draw() {
        const curAlpha = this.baseAlpha * (0.8 + Math.sin(this.pulse) * 0.3);
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        if (this.gold) {
          grad.addColorStop(0, 'rgba(255, 220, 140, ' + (curAlpha * 1.5) + ')');
          grad.addColorStop(0.4, 'rgba(245, 175, 55, ' + curAlpha + ')');
          grad.addColorStop(1, 'rgba(240, 150, 40, 0)');
        } else {
          grad.addColorStop(0, 'rgba(255, 245, 220, ' + (curAlpha * 1.8) + ')');
          grad.addColorStop(0.5, 'rgba(255, 200, 110, ' + (curAlpha * 0.8) + ')');
          grad.addColorStop(1, 'rgba(255, 180, 80, 0)');
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    const orbs = [];
    for (let i = 0; i < 20; i++) {
      const b = new Bokeh();
      b.y = Math.random() * (h || 600);
      orbs.push(b);
    }

    let flicker = 0;
    let lastTime = 0;
    const fpsInterval = 1000 / 30;
    function draw(currentTime) {
      requestAnimationFrame(draw);
      if (document.hidden) return;
      const delta = currentTime - lastTime;
      if (delta < fpsInterval) return;
      lastTime = currentTime - (delta % fpsInterval);

      flicker += 0.05;
      ctx.fillStyle = '#060402';
      ctx.fillRect(0, 0, w, h);

      const candle = ctx.createRadialGradient(w * 0.5, h * 0.95, 20, w * 0.5, h * 0.95, Math.max(w, h) * 0.8);
      const fVal = 0.20 + Math.sin(flicker * 3) * 0.02 + Math.sin(flicker * 7) * 0.01;
      candle.addColorStop(0, 'rgba(255, 180, 80, ' + (fVal * 1.4) + ')');
      candle.addColorStop(0.3, 'rgba(200, 120, 40, ' + fVal + ')');
      candle.addColorStop(0.7, 'rgba(80, 40, 15, 0.1)');
      candle.addColorStop(1, 'rgba(6, 4, 2, 0)');
      ctx.fillStyle = candle;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let o of orbs) {
        o.update();
        o.draw();
      }
      ctx.restore();
    }
    requestAnimationFrame(draw);
  </script>
</body>
</html>`;

export const DEFAULT_COSMIC_WORSHIP_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semesta & Nebula Bintang</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #020308; }
    canvas { display: block; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Star {
      constructor() { this.reset(); }
      reset() {
        this.x = (Math.random() - 0.5) * (w || 800) * 2;
        this.y = (Math.random() - 0.5) * (h || 600) * 2;
        this.z = Math.random() * (w || 800);
        this.pz = this.z;
        this.color = Math.random() > 0.8 ? '#a5b4fc' : Math.random() > 0.6 ? '#fef08a' : '#ffffff';
      }
      update(speed) {
        this.pz = this.z;
        this.z -= speed;
        if (this.z <= 0) {
          this.reset();
          this.z = w;
          this.pz = this.z;
        }
      }
      draw() {
        const k = 250;
        const cx = w * 0.5;
        const cy = h * 0.5;
        const sx = (this.x / this.z) * k + cx;
        const sy = (this.y / this.z) * k + cy;
        const r = Math.max(0.4, (1 - this.z / w) * 2.2);

        if (sx < 0 || sx >= w || sy < 0 || sy >= h) return;

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const stars = [];
    for (let i = 0; i < 70; i++) { stars.push(new Star()); }

    let t = 0;
    let lastTime = 0;
    const fpsInterval = 1000 / 30;
    function draw(currentTime) {
      requestAnimationFrame(draw);
      if (document.hidden) return;
      const delta = currentTime - lastTime;
      if (delta < fpsInterval) return;
      lastTime = currentTime - (delta % fpsInterval);

      t += 0.01;
      ctx.fillStyle = '#020308';
      ctx.fillRect(0, 0, w, h);

      const cx1 = w * (0.5 + Math.sin(t * 0.7) * 0.15);
      const cy1 = h * (0.5 + Math.cos(t * 0.5) * 0.12);
      const nebula1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, Math.min(w, h) * 0.8);
      nebula1.addColorStop(0, 'rgba(99, 102, 241, 0.18)');
      nebula1.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)');
      nebula1.addColorStop(1, 'rgba(2, 3, 8, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, w, h);

      const cx2 = w * (0.4 + Math.cos(t * 0.4) * 0.2);
      const cy2 = h * (0.6 + Math.sin(t * 0.6) * 0.15);
      const nebula2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, Math.min(w, h) * 0.7);
      nebula2.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
      nebula2.addColorStop(0.6, 'rgba(79, 70, 229, 0.06)');
      nebula2.addColorStop(1, 'rgba(2, 3, 8, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      for (let s of stars) {
        s.update(1.4);
        s.draw();
      }
      ctx.restore();
    }
    requestAnimationFrame(draw);
  </script>
</body>
</html>`;

export const DEFAULT_BETHLEHEM_STAR_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bintang Betlehem & Malam Kudus</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #02040f; }
    canvas { display: block; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const stars = [];
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.75,
        r: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
        color: Math.random() > 0.4 ? '#ffffff' : (Math.random() > 0.5 ? '#fef08a' : '#bae6fd')
      });
    }

    let t = 0;
    let lastTime = 0;
    const fpsInterval = 1000 / 30;
    function draw(currentTime) {
      requestAnimationFrame(draw);
      if (document.hidden) return;
      const delta = currentTime - lastTime;
      if (delta < fpsInterval) return;
      lastTime = currentTime - (delta % fpsInterval);

      t += 0.025;
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, '#01030d');
      sky.addColorStop(0.6, '#060a22');
      sky.addColorStop(0.88, '#0b1338');
      sky.addColorStop(1, '#080816');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#03050c';
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, h * 0.88);
      ctx.bezierCurveTo(w * 0.25, h * 0.84, w * 0.4, h * 0.90, w * 0.65, h * 0.87);
      ctx.bezierCurveTo(w * 0.8, h * 0.85, w * 0.9, h * 0.89, w, h * 0.86);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#010206';
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, h * 0.93);
      ctx.bezierCurveTo(w * 0.3, h * 0.91, w * 0.6, h * 0.95, w, h * 0.92);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      for (let s of stars) {
        const opacity = 0.3 + 0.6 * Math.abs(Math.sin(t * s.speed * 20 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const starX = w * 0.5;
      const starY = h * 0.26;
      const pulse = 1 + 0.08 * Math.sin(t * 1.5);

      const beam = ctx.createLinearGradient(starX, starY, starX, h * 0.9);
      beam.addColorStop(0, 'rgba(254, 240, 138, 0.28)');
      beam.addColorStop(0.3, 'rgba(253, 224, 71, 0.12)');
      beam.addColorStop(0.7, 'rgba(250, 204, 21, 0.05)');
      beam.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.moveTo(starX - 4, starY);
      ctx.lineTo(starX - w * 0.22, h * 0.9);
      ctx.lineTo(starX + w * 0.22, h * 0.9);
      ctx.lineTo(starX + 4, starY);
      ctx.closePath();
      ctx.fillStyle = beam;
      ctx.fill();

      const halo = ctx.createRadialGradient(starX, starY, 2, starX, starY, 120 * pulse);
      halo.addColorStop(0, 'rgba(255, 255, 230, 0.9)');
      halo.addColorStop(0.15, 'rgba(254, 240, 138, 0.55)');
      halo.addColorStop(0.4, 'rgba(250, 204, 21, 0.2)');
      halo.addColorStop(1, 'rgba(250, 204, 21, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(starX, starY, 120 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(starX, starY);

      const vertGrad = ctx.createLinearGradient(0, -70 * pulse, 0, 160 * pulse);
      vertGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      vertGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.95)');
      vertGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
      ctx.fillStyle = vertGrad;
      ctx.beginPath();
      ctx.moveTo(0, -70 * pulse);
      ctx.lineTo(3.5, 0);
      ctx.lineTo(0, 160 * pulse);
      ctx.lineTo(-3.5, 0);
      ctx.closePath();
      ctx.fill();

      const horizGrad = ctx.createLinearGradient(-85 * pulse, 0, 85 * pulse, 0);
      horizGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      horizGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
      horizGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = horizGrad;
      ctx.beginPath();
      ctx.moveTo(-85 * pulse, 0);
      ctx.lineTo(0, 3.5);
      ctx.lineTo(85 * pulse, 0);
      ctx.lineTo(0, -3.5);
      ctx.closePath();
      ctx.fill();

      ctx.rotate(Math.PI / 4);
      const diagGrad = ctx.createLinearGradient(-42 * pulse, 0, 42 * pulse, 0);
      diagGrad.addColorStop(0, 'rgba(255, 250, 200, 0)');
      diagGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
      diagGrad.addColorStop(1, 'rgba(255, 250, 200, 0)');
      ctx.fillStyle = diagGrad;
      ctx.fillRect(-42 * pulse, -1.5, 84 * pulse, 3);
      ctx.rotate(Math.PI / 2);
      ctx.fillRect(-42 * pulse, -1.5, 84 * pulse, 3);

      ctx.rotate(-3 * Math.PI / 4);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 4.5 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
    requestAnimationFrame(draw);
  </script>
</body>
</html>`;

export const DEFAULT_CHRISTMAS_CANDLE_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lilin Malam Kudus & Salju</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #070302; }
    canvas { display: block; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const bokehs = [];
    for (let i = 0; i < 14; i++) {
      bokehs.push({
        x: Math.random(),
        y: Math.random(),
        r: 15 + Math.random() * 45,
        speed: 0.0003 + Math.random() * 0.0006,
        alpha: 0.08 + Math.random() * 0.16,
        hue: Math.random() > 0.4 ? '42, 90%, 55%' : '15, 85%, 50%'
      });
    }

    const snowflakes = [];
    for (let i = 0; i < 25; i++) {
      snowflakes.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.8 + Math.random() * 2.2,
        speed: 0.0008 + Math.random() * 0.0016,
        swaySpeed: 0.01 + Math.random() * 0.02,
        swayAmp: 0.001 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.4 + Math.random() * 0.5
      });
    }

    let t = 0;
    let lastTime = 0;
    const fpsInterval = 1000 / 30;
    function draw(currentTime) {
      requestAnimationFrame(draw);
      if (document.hidden) return;
      const delta = currentTime - lastTime;
      if (delta < fpsInterval) return;
      lastTime = currentTime - (delta % fpsInterval);

      t += 0.04;

      ctx.fillStyle = '#080402';
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.9;

      const flicker = Math.sin(t * 3.5) * 0.06 + Math.cos(t * 7.1) * 0.04;
      const haloR = Math.min(w, h) * (0.6 + flicker);
      const halo = ctx.createRadialGradient(cx, cy, 10, cx, cy, haloR);
      halo.addColorStop(0, 'rgba(255, 170, 40, 0.38)');
      halo.addColorStop(0.35, 'rgba(235, 100, 20, 0.16)');
      halo.addColorStop(0.7, 'rgba(120, 25, 10, 0.05)');
      halo.addColorStop(1, 'rgba(8, 4, 2, 0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let b of bokehs) {
        b.y -= b.speed;
        if (b.y < -0.1) b.y = 1.1;
        const bx = b.x * w + Math.sin(t * 0.5 + b.y * 5) * 20;
        const by = b.y * h;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
        grad.addColorStop(0, 'hsla(' + b.hue + ', ' + b.alpha + ')');
        grad.addColorStop(1, 'hsla(' + b.hue + ', 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      for (let s of snowflakes) {
        s.y += s.speed;
        s.x += Math.sin(t * s.swaySpeed + s.phase) * s.swayAmp;
        if (s.y > 1.05) { s.y = -0.05; s.x = Math.random(); }
        if (s.x < 0) s.x = 1;
        if (s.x > 1) s.x = 0;

        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = s.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const flameH = 42 + flicker * 30;
      const flameW = 14 + flicker * 6;
      const flameTipX = cx + Math.sin(t * 4.2) * 3;
      const flameTipY = cy - flameH;

      const flameGlow = ctx.createRadialGradient(cx, cy - flameH * 0.5, 2, cx, cy - flameH * 0.5, 45);
      flameGlow.addColorStop(0, 'rgba(255, 240, 180, 0.95)');
      flameGlow.addColorStop(0.3, 'rgba(255, 140, 20, 0.7)');
      flameGlow.addColorStop(0.8, 'rgba(220, 50, 10, 0.15)');
      flameGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = flameGlow;
      ctx.beginPath();
      ctx.arc(cx, cy - flameH * 0.5, 45, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx - flameW, cy);
      ctx.bezierCurveTo(cx - flameW, cy - flameH * 0.5, flameTipX - 2, flameTipY + 5, flameTipX, flameTipY);
      ctx.bezierCurveTo(flameTipX + 2, flameTipY + 5, cx + flameW, cy - flameH * 0.5, cx + flameW, cy);
      ctx.closePath();
      const flameGrad = ctx.createLinearGradient(cx, cy, flameTipX, flameTipY);
      flameGrad.addColorStop(0, '#3b82f6');
      flameGrad.addColorStop(0.15, '#ffedd5');
      flameGrad.addColorStop(0.6, '#f59e0b');
      flameGrad.addColorStop(1, '#ef4444');
      ctx.fillStyle = flameGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy - 8, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.strokeStyle = '#292524';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx, cy + 12);
      ctx.stroke();

      ctx.fillStyle = '#1c1917';
      ctx.beginPath();
      ctx.roundRect(cx - 24, cy + 12, 48, 80, [4, 4, 0, 0]);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  </script>
</body>
</html>`;

export const DEFAULT_GOLDEN_NOEL_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hiasan Emas & Partikel Lonceng</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #030a06; }
    canvas { display: block; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const baubles = [
      { rx: 0.16, ry: 0.35, r: 42, sway: 0.8, phase: 0 },
      { rx: 0.32, ry: 0.22, r: 28, sway: 1.1, phase: 1.2 },
      { rx: 0.72, ry: 0.26, r: 36, sway: 0.9, phase: 2.5 },
      { rx: 0.86, ry: 0.42, r: 48, sway: 0.7, phase: 3.8 },
      { rx: 0.52, ry: 0.18, r: 22, sway: 1.3, phase: 4.9 }
    ];

    const sparkles = [];
    for (let i = 0; i < 35; i++) {
      sparkles.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.8 + Math.random() * 2.2,
        speed: 0.0006 + Math.random() * 0.0018,
        swaySpeed: 0.015 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        twinkle: Math.random() * Math.PI * 2
      });
    }

    let t = 0;
    let lastTime = 0;
    const fpsInterval = 1000 / 30;
    function draw(currentTime) {
      requestAnimationFrame(draw);
      if (document.hidden) return;
      const delta = currentTime - lastTime;
      if (delta < fpsInterval) return;
      lastTime = currentTime - (delta % fpsInterval);

      t += 0.035;

      const bg = ctx.createRadialGradient(w * 0.5, h * 0.5, 10, w * 0.5, h * 0.5, Math.max(w, h) * 0.85);
      bg.addColorStop(0, '#0a2316');
      bg.addColorStop(0.5, '#05130b');
      bg.addColorStop(0.85, '#120408');
      bg.addColorStop(1, '#020603');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      for (let b of baubles) {
        const swayX = Math.sin(t * b.sway + b.phase) * 16;
        const ox = b.rx * w + swayX;
        const oy = b.ry * h;

        ctx.strokeStyle = 'rgba(253, 224, 71, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(b.rx * w, 0);
        ctx.lineTo(ox, oy - b.r);
        ctx.stroke();

        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.roundRect(ox - 6, oy - b.r - 7, 12, 7, [2, 2, 0, 0]);
        ctx.fill();

        const sphereGrad = ctx.createRadialGradient(
          ox - b.r * 0.35, oy - b.r * 0.35, b.r * 0.08,
          ox, oy, b.r
        );
        sphereGrad.addColorStop(0, '#ffffff');
        sphereGrad.addColorStop(0.2, '#fef08a');
        sphereGrad.addColorStop(0.55, '#eab308');
        sphereGrad.addColorStop(0.85, '#a16207');
        sphereGrad.addColorStop(1, '#451a03');

        ctx.beginPath();
        ctx.arc(ox, oy, b.r, 0, Math.PI * 2);
        ctx.fillStyle = sphereGrad;
        ctx.fill();

        const halo = ctx.createRadialGradient(ox, oy, b.r * 0.8, ox, oy, b.r * 1.6);
        halo.addColorStop(0, 'rgba(250, 204, 21, 0.22)');
        halo.addColorStop(1, 'rgba(250, 204, 21, 0)');
        ctx.beginPath();
        ctx.arc(ox, oy, b.r * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let s of sparkles) {
        s.y += s.speed;
        s.x += Math.sin(t * s.swaySpeed + s.phase) * 0.0008;
        if (s.y > 1.05) { s.y = -0.05; s.x = Math.random(); }
        if (s.x < 0) s.x = 1;
        if (s.x > 1) s.x = 0;

        const sx = s.x * w;
        const sy = s.y * h;
        const alpha = 0.4 + 0.55 * Math.abs(Math.sin(t * 3 + s.twinkle));

        if (s.r > 1.6) {
          ctx.strokeStyle = 'rgba(255, 245, 160, ' + alpha + ')';
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(sx - 6, sy); ctx.lineTo(sx + 6, sy);
          ctx.moveTo(sx, sy - 6); ctx.lineTo(sx, sy + 6);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(254, 240, 138, ' + alpha + ')';
        ctx.fill();
      }
      ctx.restore();
    }
    requestAnimationFrame(draw);
  </script>
</body>
</html>`;

export const DEFAULT_CSS3D_SNOW_CRYSTALS_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kristal Salju 3D Spatial</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: radial-gradient(circle at 50% 20%, #061129 0%, #020713 55%, #010309 100%);
      perspective: 900px;
      perspective-origin: 50% 40%;
    }
    .scene-3d {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      pointer-events: none;
    }
    .flake {
      position: absolute;
      top: -60px;
      transform-style: preserve-3d;
      will-change: transform;
      animation: fall3D linear infinite;
    }
    .flake-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      animation: tumble3D ease-in-out infinite alternate;
    }
    .flake svg {
      width: 100%;
      height: 100%;
      stroke: #e0f2fe;
      fill: none;
      stroke-width: 1.5;
      stroke-linecap: round;
    }
    @keyframes fall3D {
      0% {
        transform: translate3d(var(--x), -80px, var(--z));
        opacity: 0;
      }
      10% {
        opacity: var(--op);
      }
      90% {
        opacity: var(--op);
      }
      100% {
        transform: translate3d(calc(var(--x) + var(--drift)), 105vh, var(--z));
        opacity: 0;
      }
    }
    @keyframes tumble3D {
      0% {
        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1);
      }
      50% {
        transform: rotateX(180deg) rotateY(90deg) rotateZ(120deg) scale(1.1);
      }
      100% {
        transform: rotateX(360deg) rotateY(270deg) rotateZ(240deg) scale(0.9);
      }
    }
    .ambient-glow {
      position: absolute;
      top: 15%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70vw;
      height: 40vh;
      background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.12) 0%, rgba(30, 58, 138, 0.05) 50%, transparent 80%);
      pointer-events: none;
    }
    body.paused, body.paused * {
      animation-play-state: paused !important;
    }
  </style>
</head>
<body>
  <div class="ambient-glow"></div>
  <div class="scene-3d" id="snowScene"></div>

  <script>
    const scene = document.getElementById('snowScene');
    const snowflakeCount = 20;
    const flakeSvg = '<svg viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="5" y1="5" x2="19" y2="19"/><line x1="5" y1="19" x2="19" y2="5"/><path d="M10 4l2 2 2-2M10 20l2-2 2 2M4 10l2 2-2 2M20 10l-2 2 2 2"/></svg>';

    for (let i = 0; i < snowflakeCount; i++) {
      const el = document.createElement('div');
      el.className = 'flake';
      const size = 18 + Math.random() * 32;
      const x = Math.random() * 100;
      const z = -350 + Math.random() * 600;
      const drift = -8 + Math.random() * 16;
      const duration = 7 + Math.random() * 10;
      const delay = -Math.random() * 15;
      const tumbleDur = 3 + Math.random() * 6;
      const opacity = 0.4 + Math.random() * 0.55;

      el.style.setProperty('--x', x + 'vw');
      el.style.setProperty('--z', z + 'px');
      el.style.setProperty('--drift', drift + 'vw');
      el.style.setProperty('--op', opacity);
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.animationDuration = duration + 's';
      el.style.animationDelay = delay + 's';

      const inner = document.createElement('div');
      inner.className = 'flake-inner';
      inner.style.width = '100%';
      inner.style.height = '100%';
      inner.style.animationDuration = tumbleDur + 's';
      inner.innerHTML = flakeSvg;

      el.appendChild(inner);
      scene.appendChild(el);
    }

    function setPaused(p) {
      document.body.classList.toggle('paused', !!p);
    }
    document.addEventListener('visibilitychange', () => {
      setPaused(document.hidden);
    });
    window.addEventListener('message', (e) => {
      if (e.data && typeof e.data.paused === 'boolean') {
        setPaused(e.data.paused);
      }
    });
  </script>
</body>
</html>`;

export const DEFAULT_CSS3D_CHRISTMAS_LANTERNS_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lentera Cahaya Natal 3D</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: radial-gradient(circle at 50% 50%, #0d1b12 0%, #060e0a 50%, #030407 100%);
      perspective: 950px;
      perspective-origin: 50% 35%;
    }
    .scene-3d {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      pointer-events: none;
    }
    .lantern-rig {
      position: absolute;
      top: -20px;
      transform-style: preserve-3d;
      will-change: transform;
      animation: gentleSway 6s ease-in-out infinite alternate;
    }
    .cord {
      position: absolute;
      top: 0;
      left: 50%;
      width: 1.5px;
      background: linear-gradient(to bottom, rgba(254, 240, 138, 0.2), rgba(254, 240, 138, 0.7));
      transform: translateX(-50%);
    }
    .lantern-body {
      position: absolute;
      left: 50%;
      transform-style: preserve-3d;
      transform: translateX(-50%);
      animation: spin3D 14s linear infinite;
    }
    .facet {
      position: absolute;
      inset: 0;
      border: 1px solid rgba(253, 224, 71, 0.45);
      background: radial-gradient(circle at center, rgba(254, 240, 138, 0.25) 0%, rgba(217, 119, 6, 0.12) 65%, transparent 100%);
      box-shadow: inset 0 0 12px rgba(245, 158, 11, 0.25);
    }
    .core-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 45%;
      height: 45%;
      transform: translate(-50%, -50%);
      background: radial-gradient(circle, #ffffff 0%, #fef08a 35%, #f59e0b 70%, transparent 100%);
      border-radius: 50%;
      filter: blur(4px);
      animation: pulseLight 3s ease-in-out infinite alternate;
    }
    @keyframes spin3D {
      0% { transform: translateX(-50%) rotateX(15deg) rotateY(0deg) rotateZ(5deg); }
      50% { transform: translateX(-50%) rotateX(-12deg) rotateY(180deg) rotateZ(-5deg); }
      100% { transform: translateX(-50%) rotateX(15deg) rotateY(360deg) rotateZ(5deg); }
    }
    @keyframes gentleSway {
      0% { transform: rotateZ(-3deg); }
      100% { transform: rotateZ(3deg); }
    }
    @keyframes pulseLight {
      0% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.8; }
      100% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
    }
    .star-sparkle {
      position: absolute;
      width: 2px;
      height: 2px;
      background: #fef08a;
      border-radius: 50%;
      box-shadow: 0 0 6px #facc15;
      animation: twinkle 4s ease-in-out infinite alternate;
    }
    @keyframes twinkle {
      0% { opacity: 0.2; transform: scale(0.6); }
      100% { opacity: 0.95; transform: scale(1.5); }
    }
    body.paused, body.paused * {
      animation-play-state: paused !important;
    }
  </style>
</head>
<body>
  <div class="scene-3d" id="lanternScene"></div>

  <script>
    const scene = document.getElementById('lanternScene');

    const lanterns = [
      { x: 18, y: 140, cordH: 140, size: 70, delay: 0, z: -100, spinSpeed: 16 },
      { x: 42, y: 90,  cordH: 90,  size: 55, delay: -2, z: 80, spinSpeed: 12 },
      { x: 68, y: 160, cordH: 160, size: 85, delay: -4, z: -60, spinSpeed: 18 },
      { x: 86, y: 110, cordH: 110, size: 60, delay: -1, z: 120, spinSpeed: 14 }
    ];

    lanterns.forEach((l) => {
      const rig = document.createElement('div');
      rig.className = 'lantern-rig';
      rig.style.left = l.x + 'vw';
      rig.style.animationDelay = l.delay + 's';
      rig.style.transform = 'translateZ(' + l.z + 'px)';

      const cord = document.createElement('div');
      cord.className = 'cord';
      cord.style.height = l.cordH + 'px';
      rig.appendChild(cord);

      const body = document.createElement('div');
      body.className = 'lantern-body';
      body.style.top = l.cordH + 'px';
      body.style.width = l.size + 'px';
      body.style.height = (l.size * 1.3) + 'px';
      body.style.animationDuration = l.spinSpeed + 's';

      const numFacets = 6;
      for (let f = 0; f < numFacets; f++) {
        const angle = (360 / numFacets) * f;
        const tz = (l.size * 0.45);
        const facet = document.createElement('div');
        facet.className = 'facet';
        facet.style.transform = 'rotateY(' + angle + 'deg) translateZ(' + tz + 'px)';
        body.appendChild(facet);
      }

      const core = document.createElement('div');
      core.className = 'core-glow';
      body.appendChild(core);

      rig.appendChild(body);
      scene.appendChild(rig);
    });

    for (let s = 0; s < 18; s++) {
      const star = document.createElement('div');
      star.className = 'star-sparkle';
      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = Math.random() * 100 + 'vh';
      star.style.animationDelay = Math.random() * 5 + 's';
      star.style.animationDuration = (2 + Math.random() * 4) + 's';
      scene.appendChild(star);
    }

    function setPaused(p) {
      document.body.classList.toggle('paused', !!p);
    }
    document.addEventListener('visibilitychange', () => {
      setPaused(document.hidden);
    });
    window.addEventListener('message', (e) => {
      if (e.data && typeof e.data.paused === 'boolean') {
        setPaused(e.data.paused);
      }
    });
  </script>
</body>
</html>`;

export const DEFAULT_CSS3D_SNOWMAN_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Boneka Salju Natal 3D CSS</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: radial-gradient(circle at 50% 35%, #0d1e38 0%, #061124 50%, #020610 100%);
      perspective: 1100px;
      perspective-origin: 50% 55%;
    }
    .scene-3d {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      pointer-events: none;
    }
    .ambient-glow {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80vw;
      height: 50vh;
      background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.08) 0%, rgba(30, 58, 138, 0.03) 60%, transparent 100%);
    }
    .snow-ground {
      position: absolute;
      bottom: -60px;
      left: 50%;
      transform: translateX(-50%) rotateX(75deg);
      width: 140vw;
      height: 380px;
      border-radius: 50%;
      background: radial-gradient(ellipse at center, #cbd5e1 0%, #64748b 45%, #1e293b 75%, transparent 100%);
      opacity: 0.6;
      box-shadow: 0 0 40px rgba(148, 163, 184, 0.25);
    }
    .snowman-rig {
      position: absolute;
      left: 50%;
      bottom: 70px;
      transform-style: preserve-3d;
      will-change: transform;
      animation: gentleSway 5s ease-in-out infinite alternate;
    }
    @keyframes gentleSway {
      0% { transform: translateX(-50%) rotateY(-14deg) rotateZ(-1.5deg); }
      100% { transform: translateX(-50%) rotateY(14deg) rotateZ(1.5deg); }
    }
    .snowball {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      transform-style: preserve-3d;
    }
    .snowball-bottom {
      bottom: 0;
      width: 160px;
      height: 150px;
      background: radial-gradient(circle at 35% 30%, #ffffff 0%, #e2e8f0 45%, #94a3b8 80%, #475569 100%);
      box-shadow: 0 15px 35px rgba(0,0,0,0.6), inset -6px -6px 16px rgba(15,23,42,0.3);
    }
    .snowball-mid {
      bottom: 125px;
      width: 120px;
      height: 112px;
      background: radial-gradient(circle at 35% 30%, #ffffff 0%, #e2e8f0 45%, #94a3b8 80%, #475569 100%);
      box-shadow: 0 10px 25px rgba(0,0,0,0.4), inset -5px -5px 12px rgba(15,23,42,0.3);
    }
    .snowball-head {
      bottom: 218px;
      width: 90px;
      height: 84px;
      background: radial-gradient(circle at 35% 30%, #ffffff 0%, #e2e8f0 45%, #94a3b8 80%, #475569 100%);
      box-shadow: 0 8px 20px rgba(0,0,0,0.35), inset -4px -4px 10px rgba(15,23,42,0.3);
    }
    .coal-btn {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, #475569, #09090b);
      box-shadow: 0 1px 3px rgba(0,0,0,0.7);
    }
    .coal-btn-1 { top: 28px; left: 56px; transform: translateZ(58px); }
    .coal-btn-2 { top: 52px; left: 56px; transform: translateZ(59px); }
    .coal-btn-3 { top: 76px; left: 56px; transform: translateZ(56px); }

    .coal-eye {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, #475569, #09090b);
      box-shadow: 0 1px 2px rgba(0,0,0,0.8);
    }
    .coal-eye.left { top: 28px; left: 26px; transform: translateZ(42px); }
    .coal-eye.right { top: 28px; right: 26px; transform: translateZ(42px); }

    .rosy-cheek {
      position: absolute;
      width: 14px;
      height: 8px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(244, 63, 94, 0.45), transparent 70%);
      filter: blur(1px);
    }
    .rosy-cheek.left { top: 40px; left: 16px; transform: translateZ(40px); }
    .rosy-cheek.right { top: 40px; right: 16px; transform: translateZ(40px); }

    .carrot-nose {
      position: absolute;
      top: 36px;
      left: 45px;
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 28px solid #ea580c;
      transform-origin: 50% 0;
      transform: translateZ(46px) rotateX(86deg) rotateY(4deg);
      filter: drop-shadow(0 3px 6px rgba(0,0,0,0.45));
    }

    .smile-dot {
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #18181b;
      box-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }
    .smile-1 { top: 54px; left: 28px; transform: translateZ(40px); }
    .smile-2 { top: 60px; left: 36px; transform: translateZ(42px); }
    .smile-3 { top: 62px; left: 45px; transform: translateZ(43px); }
    .smile-4 { top: 60px; left: 54px; transform: translateZ(42px); }
    .smile-5 { top: 54px; left: 62px; transform: translateZ(40px); }

    .top-hat {
      position: absolute;
      top: -46px;
      left: 50%;
      transform: translateX(-50%);
      transform-style: preserve-3d;
    }
    .hat-brim {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: radial-gradient(circle, #27272a 0%, #09090b 80%);
      transform: rotateX(80deg) translateZ(-6px);
      box-shadow: 0 4px 14px rgba(0,0,0,0.7);
    }
    .hat-crown {
      position: absolute;
      top: -38px;
      left: 20px;
      width: 56px;
      height: 48px;
      background: linear-gradient(135deg, #3f3f46 0%, #18181b 50%, #09090b 100%);
      border-radius: 4px 4px 2px 2px;
      box-shadow: inset 0 2px 5px rgba(255,255,255,0.15), 0 4px 10px rgba(0,0,0,0.6);
      transform-style: preserve-3d;
    }
    .hat-band {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 10px;
      background: linear-gradient(to right, #991b1b, #dc2626, #ef4444, #991b1b);
      box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }
    .holly-berry {
      position: absolute;
      bottom: 4px;
      right: 6px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ef4444;
      box-shadow: 0 0 4px #f87171;
    }
    .holly-leaf {
      position: absolute;
      bottom: 8px;
      right: 10px;
      width: 9px;
      height: 5px;
      border-radius: 50% 0 50% 0;
      background: #15803d;
      transform: rotate(30deg);
    }

    .scarf-ring {
      position: absolute;
      bottom: 208px;
      left: 50%;
      transform: translateX(-50%) rotateX(75deg);
      width: 98px;
      height: 98px;
      border-radius: 50%;
      border: 12px solid #b91c1c;
      box-shadow: 0 4px 10px rgba(0,0,0,0.6), inset 0 2px 5px rgba(255,255,255,0.2);
      transform-style: preserve-3d;
    }
    .scarf-tail {
      position: absolute;
      top: 10px;
      left: 20px;
      width: 22px;
      height: 58px;
      background: repeating-linear-gradient(180deg, #b91c1c, #b91c1c 12px, #15803d 12px, #15803d 20px);
      border-radius: 0 0 6px 6px;
      transform-origin: 50% 0;
      animation: flutterTail 3.5s ease-in-out infinite alternate;
      box-shadow: 0 4px 8px rgba(0,0,0,0.4);
    }
    @keyframes flutterTail {
      0% { transform: rotateY(15deg) rotateX(10deg); }
      100% { transform: rotateY(-18deg) rotateX(24deg) skewX(4deg); }
    }

    .twig-arm {
      position: absolute;
      top: 30px;
      width: 75px;
      height: 5px;
      background: #5c3a21;
      border-radius: 3px;
      transform-origin: 0 50%;
    }
    .twig-arm.left {
      left: -65px;
      transform: rotateZ(28deg) rotateY(-20deg);
      animation: armSwayLeft 4s ease-in-out infinite alternate;
    }
    .twig-arm.right {
      right: -65px;
      transform-origin: 100% 50%;
      transform: rotateZ(-32deg) rotateY(20deg);
      animation: armWaveRight 3s ease-in-out infinite alternate;
    }
    .twig-finger {
      position: absolute;
      width: 22px;
      height: 4px;
      background: #5c3a21;
      border-radius: 2px;
    }
    .twig-finger-1 { top: -8px; left: 4px; transform: rotate(-35deg); }
    .twig-finger-2 { top: -8px; right: 6px; transform: rotate(35deg); }

    @keyframes armSwayLeft {
      0% { transform: rotateZ(24deg) rotateY(-15deg); }
      100% { transform: rotateZ(32deg) rotateY(-25deg); }
    }
    @keyframes armWaveRight {
      0% { transform: rotateZ(-28deg) rotateY(15deg); }
      100% { transform: rotateZ(-45deg) rotateY(25deg); }
    }

    .lantern-cord {
      position: absolute;
      top: 4px;
      left: 0px;
      width: 2px;
      height: 24px;
      background: #78350f;
    }
    .lantern-box {
      position: absolute;
      top: 24px;
      left: -11px;
      width: 24px;
      height: 32px;
      border: 1.5px solid #d97706;
      background: radial-gradient(circle, rgba(254, 240, 138, 0.45) 0%, rgba(217, 119, 6, 0.25) 70%, transparent 100%);
      box-shadow: 0 0 16px rgba(245, 158, 11, 0.6);
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: lanternFlicker 2s ease-in-out infinite alternate;
    }
    .lantern-flame {
      width: 8px;
      height: 12px;
      border-radius: 50% 50% 20% 20%;
      background: radial-gradient(circle at 50% 30%, #ffffff 0%, #fef08a 40%, #f59e0b 80%);
      filter: blur(1px);
      box-shadow: 0 0 10px #f59e0b;
    }
    @keyframes lanternFlicker {
      0% { transform: scale(0.95); opacity: 0.85; }
      100% { transform: scale(1.05); opacity: 1; }
    }

    .flake-3d {
      position: absolute;
      background: #ffffff;
      border-radius: 50%;
      pointer-events: none;
      box-shadow: 0 0 6px rgba(224, 242, 254, 0.8);
      animation: fallDown linear infinite;
    }
    @keyframes fallDown {
      0% {
        transform: translate3d(var(--x), -30px, var(--z));
        opacity: 0;
      }
      10% { opacity: var(--op); }
      90% { opacity: var(--op); }
      100% {
        transform: translate3d(calc(var(--x) + var(--drift)), 105vh, var(--z));
        opacity: 0;
      }
    }
    body.paused, body.paused * {
      animation-play-state: paused !important;
    }
  </style>
</head>
<body>
  <div class="ambient-glow"></div>
  <div class="snow-ground"></div>
  <div class="scene-3d" id="snowScene">
    <div class="snowman-rig">
      <div class="snowball snowball-bottom"></div>
      <div class="snowball snowball-mid">
        <div class="coal-btn coal-btn-1"></div>
        <div class="coal-btn coal-btn-2"></div>
        <div class="coal-btn coal-btn-3"></div>

        <div class="twig-arm left">
          <div class="twig-finger twig-finger-1"></div>
          <div class="lantern-cord"></div>
          <div class="lantern-box">
            <div class="lantern-flame"></div>
          </div>
        </div>

        <div class="twig-arm right">
          <div class="twig-finger twig-finger-2"></div>
        </div>
      </div>

      <div class="scarf-ring">
        <div class="scarf-tail"></div>
      </div>

      <div class="snowball snowball-head">
        <div class="coal-eye left"></div>
        <div class="coal-eye right"></div>
        <div class="rosy-cheek left"></div>
        <div class="rosy-cheek right"></div>
        <div class="carrot-nose"></div>
        <div class="smile-dot smile-1"></div>
        <div class="smile-dot smile-2"></div>
        <div class="smile-dot smile-3"></div>
        <div class="smile-dot smile-4"></div>
        <div class="smile-dot smile-5"></div>

        <div class="top-hat">
          <div class="hat-crown">
            <div class="hat-band">
              <div class="holly-leaf"></div>
              <div class="holly-berry"></div>
            </div>
          </div>
          <div class="hat-brim"></div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const scene = document.getElementById('snowScene');
    const count = 20;
    for (let i = 0; i < count; i++) {
      const flake = document.createElement('div');
      flake.className = 'flake-3d';
      const size = 3 + Math.random() * 5;
      const x = Math.random() * 100 + 'vw';
      const z = (Math.random() * 500 - 250) + 'px';
      const drift = (Math.random() * 80 - 40) + 'px';
      const dur = 4 + Math.random() * 6;
      const delay = -(Math.random() * dur);
      const op = 0.35 + Math.random() * 0.55;

      flake.style.width = size + 'px';
      flake.style.height = size + 'px';
      flake.style.setProperty('--x', x);
      flake.style.setProperty('--z', z);
      flake.style.setProperty('--drift', drift);
      flake.style.setProperty('--op', op);
      flake.style.animationDuration = dur + 's';
      flake.style.animationDelay = delay + 's';

      scene.appendChild(flake);
    }

    function setPaused(p) {
      document.body.classList.toggle('paused', !!p);
    }
    document.addEventListener('visibilitychange', () => {
      setPaused(document.hidden);
    });
    window.addEventListener('message', (e) => {
      if (e.data && typeof e.data.paused === 'boolean') {
        setPaused(e.data.paused);
      }
    });
  </script>
</body>
</html>`;

export const DEFAULT_CSS3D_SANTA_SLEIGH_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Santa Claus & Kereta Rusa 3D CSS</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: radial-gradient(circle at 50% 25%, #0e1e38 0%, #060e1d 55%, #02040a 100%);
      perspective: 1200px;
      perspective-origin: 50% 45%;
    }
    .scene-3d {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      pointer-events: none;
    }
    .moon {
      position: absolute;
      top: 12%;
      right: 18%;
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #fffbeb 0%, #fef08a 40%, #fde047 70%, #ca8a04 100%);
      box-shadow: 0 0 60px rgba(254, 240, 138, 0.45), 0 0 120px rgba(234, 179, 8, 0.2);
      filter: drop-shadow(0 0 15px rgba(254, 240, 138, 0.3));
    }
    .pine-silhouettes {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 120px;
      background: linear-gradient(to top, #020617 30%, transparent 100%);
      opacity: 0.8;
    }
    .flight-rig {
      position: absolute;
      top: 26%;
      left: 50%;
      width: 320px;
      height: 140px;
      transform-style: preserve-3d;
      will-change: transform;
      animation: flightMotion 18s ease-in-out infinite alternate;
    }
    @keyframes flightMotion {
      0% {
        transform: translate3d(-60vw, 40px, -120px) rotateY(18deg) rotateZ(-4deg) rotateX(6deg);
      }
      40% {
        transform: translate3d(-10vw, -30px, 80px) rotateY(10deg) rotateZ(2deg) rotateX(-4deg);
      }
      70% {
        transform: translate3d(25vw, 15px, 0px) rotateY(-8deg) rotateZ(-3deg) rotateX(4deg);
      }
      100% {
        transform: translate3d(60vw, -45px, -140px) rotateY(-16deg) rotateZ(5deg) rotateX(-6deg);
      }
    }
    .sleigh-body {
      position: absolute;
      left: 30px;
      bottom: 25px;
      width: 135px;
      height: 60px;
      background: linear-gradient(135deg, #b91c1c 0%, #7f1d1d 80%);
      border-radius: 0 18px 26px 40px;
      border: 2px solid #facc15;
      box-shadow: inset 0 2px 6px rgba(255, 255, 255, 0.2), 0 8px 20px rgba(0,0,0,0.6);
      transform-style: preserve-3d;
    }
    .sleigh-front-curl {
      position: absolute;
      right: -16px;
      top: -12px;
      width: 28px;
      height: 48px;
      border-right: 4px solid #facc15;
      border-top: 4px solid #facc15;
      border-radius: 0 24px 0 0;
      transform: rotate(20deg);
    }
    .sleigh-runner {
      position: absolute;
      bottom: -16px;
      left: -10px;
      width: 155px;
      height: 6px;
      background: linear-gradient(to right, #facc15, #fef08a, #ca8a04);
      border-radius: 3px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.5);
    }
    .sleigh-runner::before {
      content: '';
      position: absolute;
      right: -8px;
      top: -16px;
      width: 24px;
      height: 24px;
      border-right: 4px solid #facc15;
      border-top: 4px solid #facc15;
      border-radius: 0 20px 0 0;
      transform: rotate(25deg);
    }
    .gift-sack {
      position: absolute;
      top: -30px;
      left: 12px;
      width: 52px;
      height: 52px;
      border-radius: 50% 50% 30% 30%;
      background: radial-gradient(circle at 40% 30%, #15803d, #14532d);
      box-shadow: inset 0 2px 6px rgba(255,255,255,0.2), 0 4px 10px rgba(0,0,0,0.4);
      transform: rotate(-10deg);
    }
    .gift-box {
      position: absolute;
      width: 18px;
      height: 18px;
      background: #eab308;
      border: 1px solid #ca8a04;
      top: -8px;
      left: 24px;
      transform: rotate(15deg);
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    .gift-ribbon {
      position: absolute;
      top: 0;
      left: 50%;
      width: 3px;
      height: 100%;
      background: #dc2626;
      transform: translateX(-50%);
    }
    .santa {
      position: absolute;
      bottom: 18px;
      left: 58px;
      transform-style: preserve-3d;
    }
    .santa-body {
      width: 44px;
      height: 38px;
      background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
      border-radius: 14px 14px 4px 4px;
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.25);
      position: relative;
    }
    .santa-belt {
      position: absolute;
      bottom: 8px;
      width: 100%;
      height: 7px;
      background: #18181b;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .belt-buckle {
      width: 11px;
      height: 11px;
      border: 2px solid #facc15;
      background: #ca8a04;
      border-radius: 2px;
    }
    .santa-head {
      position: absolute;
      top: -26px;
      left: 8px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #fed7aa;
      box-shadow: inset 0 -2px 4px rgba(0,0,0,0.1);
      transform-style: preserve-3d;
    }
    .santa-rosy {
      position: absolute;
      top: 10px;
      width: 6px;
      height: 4px;
      border-radius: 50%;
      background: rgba(244, 63, 94, 0.5);
    }
    .santa-rosy.left { left: 3px; }
    .santa-rosy.right { right: 3px; }
    .santa-beard {
      position: absolute;
      bottom: -18px;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
      height: 28px;
      background: radial-gradient(circle at center, #ffffff 0%, #f1f5f9 70%, #cbd5e1 100%);
      border-radius: 4px 4px 18px 18px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.25);
      animation: beardFlutter 2s ease-in-out infinite alternate;
    }
    @keyframes beardFlutter {
      0% { transform: translateX(-50%) rotateZ(-2deg); }
      100% { transform: translateX(-50%) rotateZ(4deg) skewX(-3deg); }
    }
    .santa-hat {
      position: absolute;
      top: -16px;
      left: -2px;
      width: 32px;
      height: 22px;
      background: #dc2626;
      border-radius: 50% 50% 0 0;
      transform: rotate(10deg);
    }
    .hat-trim {
      position: absolute;
      bottom: -4px;
      left: -3px;
      width: 38px;
      height: 8px;
      background: #f8fafc;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    .hat-pom {
      position: absolute;
      top: -6px;
      right: -8px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 0 5px rgba(255,255,255,0.8);
      animation: pomBounce 1.2s ease-in-out infinite alternate;
    }
    @keyframes pomBounce {
      0% { transform: translateY(0); }
      100% { transform: translateY(4px); }
    }
    .santa-arm-wave {
      position: absolute;
      top: 4px;
      left: -14px;
      width: 20px;
      height: 9px;
      background: #dc2626;
      border-radius: 5px;
      transform-origin: 100% 50%;
      transform: rotate(35deg);
      animation: waveGreeting 2.2s ease-in-out infinite alternate;
    }
    .santa-mitten {
      position: absolute;
      left: -6px;
      top: -2px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #15803d;
    }
    @keyframes waveGreeting {
      0% { transform: rotate(20deg); }
      100% { transform: rotate(55deg); }
    }
    .reindeer-team {
      position: absolute;
      right: 15px;
      bottom: 25px;
      width: 100px;
      height: 60px;
      transform-style: preserve-3d;
    }
    .reindeer {
      position: absolute;
      width: 52px;
      height: 40px;
      animation: gallop 0.9s ease-in-out infinite alternate;
    }
    .reindeer-lead {
      right: 0;
      top: 0;
    }
    .reindeer-body {
      width: 32px;
      height: 20px;
      background: #854d0e;
      border-radius: 8px 12px 6px 8px;
      position: relative;
    }
    .reindeer-head {
      position: absolute;
      top: -12px;
      right: -6px;
      width: 16px;
      height: 14px;
      background: #a16207;
      border-radius: 6px 8px 4px 6px;
    }
    .reindeer-antler {
      position: absolute;
      top: -10px;
      right: 2px;
      width: 12px;
      height: 12px;
      border-right: 2.5px solid #facc15;
      border-top: 2.5px solid #facc15;
      border-radius: 0 4px 0 0;
    }
    .rudolph-nose {
      position: absolute;
      top: 4px;
      right: -3px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #ef4444;
      box-shadow: 0 0 8px #f87171, 0 0 14px #ef4444;
      animation: nosePulse 1.2s ease-in-out infinite alternate;
    }
    @keyframes nosePulse {
      0% { transform: scale(0.9); opacity: 0.8; }
      100% { transform: scale(1.3); opacity: 1; }
    }
    @keyframes gallop {
      0% { transform: translateY(0) rotate(2deg); }
      100% { transform: translateY(-8px) rotate(-4deg); }
    }
    .golden-rein {
      position: absolute;
      top: 15px;
      left: 100px;
      width: 120px;
      height: 20px;
      border-bottom: 1.5px dashed #facc15;
      border-radius: 0 0 50% 50%;
      opacity: 0.7;
    }
    .stardust-particle {
      position: absolute;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #fef08a;
      box-shadow: 0 0 6px #fde047;
      animation: stardustFade linear infinite;
    }
    @keyframes stardustFade {
      0% { transform: translate3d(var(--x), var(--y), var(--z)) scale(1.4); opacity: 1; }
      100% { transform: translate3d(calc(var(--x) - 100px), calc(var(--y) + 40px), var(--z)) scale(0.2); opacity: 0; }
    }
    .sky-star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 0 4px #93c5fd;
      animation: twinkle 3s ease-in-out infinite alternate;
    }
    @keyframes twinkle {
      0% { opacity: 0.2; transform: scale(0.7); }
      100% { opacity: 0.95; transform: scale(1.4); }
    }
    body.paused, body.paused * {
      animation-play-state: paused !important;
    }
  </style>
</head>
<body>
  <div class="moon"></div>
  <div class="pine-silhouettes"></div>
  <div class="scene-3d" id="santaScene">
    <div class="flight-rig">
      <div class="golden-rein"></div>
      <div class="reindeer-team">
        <div class="reindeer reindeer-lead">
          <div class="reindeer-body">
            <div class="reindeer-head">
              <div class="reindeer-antler"></div>
              <div class="rudolph-nose"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="sleigh-body">
        <div class="sleigh-front-curl"></div>
        <div class="sleigh-runner"></div>
        <div class="gift-sack">
          <div class="gift-box">
            <div class="gift-ribbon"></div>
          </div>
        </div>

        <div class="santa">
          <div class="santa-arm-wave">
            <div class="santa-mitten"></div>
          </div>
          <div class="santa-body">
            <div class="santa-belt">
              <div class="belt-buckle"></div>
            </div>
          </div>
          <div class="santa-head">
            <div class="santa-rosy left"></div>
            <div class="santa-rosy right"></div>
            <div class="santa-beard"></div>
            <div class="santa-hat">
              <div class="hat-trim"></div>
              <div class="hat-pom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const scene = document.getElementById('santaScene');

    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.className = 'sky-star';
      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = Math.random() * 80 + 'vh';
      star.style.animationDelay = (Math.random() * 4) + 's';
      star.style.animationDuration = (2 + Math.random() * 3) + 's';
      scene.appendChild(star);
    }

    for (let p = 0; p < 16; p++) {
      const dust = document.createElement('div');
      dust.className = 'stardust-particle';
      const x = (Math.random() * 100) + 'vw';
      const y = (18 + Math.random() * 30) + 'vh';
      const z = (Math.random() * 200 - 100) + 'px';
      const dur = 2 + Math.random() * 3;
      const delay = -(Math.random() * dur);

      dust.style.setProperty('--x', x);
      dust.style.setProperty('--y', y);
      dust.style.setProperty('--z', z);
      dust.style.animationDuration = dur + 's';
      dust.style.animationDelay = delay + 's';
      scene.appendChild(dust);
    }

    function setPaused(p) {
      document.body.classList.toggle('paused', !!p);
    }
    document.addEventListener('visibilitychange', () => {
      setPaused(document.hidden);
    });
    window.addEventListener('message', (e) => {
      if (e.data && typeof e.data.paused === 'boolean') {
        setPaused(e.data.paused);
      }
    });
  </script>
</body>
</html>`;

export const DEFAULT_CSS3D_CHRISTMAS_TREE_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pohon Natal Kristal & Kado 3D CSS</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: radial-gradient(circle at 50% 35%, #081d18 0%, #030d0b 55%, #010404 100%);
      perspective: 1050px;
      perspective-origin: 50% 40%;
    }
    .scene-3d {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      pointer-events: none;
    }
    .tree-rig {
      position: absolute;
      left: 50%;
      bottom: 80px;
      transform-style: preserve-3d;
      will-change: transform;
      animation: treeRotate 18s linear infinite;
    }
    @keyframes treeRotate {
      0% { transform: translateX(-50%) rotateY(0deg); }
      100% { transform: translateX(-50%) rotateY(360deg); }
    }
    .tree-tier {
      position: absolute;
      left: 50%;
      transform-style: preserve-3d;
    }
    .tier-facet {
      position: absolute;
      border-left: var(--w) solid transparent;
      border-right: var(--w) solid transparent;
      border-bottom: var(--h) solid var(--col);
      opacity: 0.95;
    }
    .golden-star {
      position: absolute;
      left: 50%;
      top: -240px;
      transform: translateX(-50%);
      width: 36px;
      height: 36px;
      transform-style: preserve-3d;
      animation: starShine 3s ease-in-out infinite alternate;
    }
    .star-shape {
      width: 100%;
      height: 100%;
      background: #facc15;
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      box-shadow: 0 0 25px rgba(250, 204, 21, 0.9);
      filter: drop-shadow(0 0 10px #fef08a);
    }
    @keyframes starShine {
      0% { transform: translateX(-50%) scale(0.9) rotateZ(0deg); filter: brightness(0.9); }
      100% { transform: translateX(-50%) scale(1.15) rotateZ(12deg); filter: brightness(1.2); }
    }
    .gift-container {
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      transform-style: preserve-3d;
    }
    .gift-3d {
      position: absolute;
      width: 32px;
      height: 32px;
      transform-style: preserve-3d;
      box-shadow: 0 8px 16px rgba(0,0,0,0.6);
      border-radius: 3px;
    }
    .gift-red {
      background: #dc2626;
      border: 1px solid #b91c1c;
      transform: translate3d(-65px, 0, 45px) rotateY(25deg);
    }
    .gift-gold {
      background: #eab308;
      border: 1px solid #ca8a04;
      transform: translate3d(55px, -5px, 35px) rotateY(-30deg);
    }
    .gift-blue {
      background: #2563eb;
      border: 1px solid #1d4ed8;
      transform: translate3d(5px, 5px, 75px) rotateY(15deg);
    }
    .ribbon-cross {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ribbon-h { width: 100%; height: 5px; background: rgba(255,255,255,0.85); position: absolute; }
    .ribbon-v { height: 100%; width: 5px; background: rgba(255,255,255,0.85); position: absolute; }
    .fairy-light {
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      filter: blur(1px);
      animation: lightBlink 1.8s ease-in-out infinite alternate;
    }
    @keyframes lightBlink {
      0% { opacity: 0.35; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1.25); }
    }
    .snow-dot {
      position: absolute;
      background: #ffffff;
      border-radius: 50%;
      pointer-events: none;
      animation: snowFall linear infinite;
    }
    @keyframes snowFall {
      0% { transform: translate3d(var(--x), -20px, var(--z)); opacity: 0; }
      15% { opacity: var(--op); }
      85% { opacity: var(--op); }
      100% { transform: translate3d(calc(var(--x) + var(--drift)), 105vh, var(--z)); opacity: 0; }
    }
    body.paused, body.paused * {
      animation-play-state: paused !important;
    }
  </style>
</head>
<body>
  <div class="scene-3d" id="treeScene">
    <div class="tree-rig" id="treeRig">
      <div class="golden-star">
        <div class="star-shape"></div>
      </div>
      <div class="gift-container">
        <div class="gift-3d gift-red">
          <div class="ribbon-cross"><div class="ribbon-h"></div><div class="ribbon-v"></div></div>
        </div>
        <div class="gift-3d gift-gold">
          <div class="ribbon-cross"><div class="ribbon-h"></div><div class="ribbon-v"></div></div>
        </div>
        <div class="gift-3d gift-blue">
          <div class="ribbon-cross"><div class="ribbon-h"></div><div class="ribbon-v"></div></div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const rig = document.getElementById('treeRig');
    const scene = document.getElementById('treeScene');

    const tiers = [
      { y: -200, w: 32, h: 48, radius: 24, count: 6, col: '#15803d' },
      { y: -160, w: 46, h: 62, radius: 36, count: 7, col: '#166534' },
      { y: -110, w: 62, h: 78, radius: 52, count: 8, col: '#14532d' },
      { y: -45,  w: 80, h: 96, radius: 68, count: 9, col: '#0f3d22' }
    ];

    const lightColors = ['#fde047', '#ef4444', '#38bdf8', '#4ade80', '#f472b6'];

    tiers.forEach((t) => {
      const tierEl = document.createElement('div');
      tierEl.className = 'tree-tier';
      tierEl.style.top = t.y + 'px';

      for (let i = 0; i < t.count; i++) {
        const angle = (360 / t.count) * i;
        const facet = document.createElement('div');
        facet.className = 'tier-facet';
        facet.style.setProperty('--w', t.w + 'px');
        facet.style.setProperty('--h', t.h + 'px');
        facet.style.setProperty('--col', t.col);
        facet.style.transform = 'translateX(-50%) rotateY(' + angle + 'deg) translateZ(' + t.radius + 'px) rotateX(25deg)';
        tierEl.appendChild(facet);

        const light = document.createElement('div');
        light.className = 'fairy-light';
        const color = lightColors[(i + t.count) % lightColors.length];
        light.style.backgroundColor = color;
        light.style.boxShadow = '0 0 8px ' + color;
        light.style.transform = 'translateX(-50%) rotateY(' + angle + 'deg) translateZ(' + (t.radius + 10) + 'px) translateY(' + (t.h - 5) + 'px)';
        light.style.animationDelay = (Math.random() * 2) + 's';
        tierEl.appendChild(light);
      }
      rig.appendChild(tierEl);
    });

    for (let s = 0; s < 20; s++) {
      const snow = document.createElement('div');
      snow.className = 'snow-dot';
      const size = 2.5 + Math.random() * 4.5;
      const x = Math.random() * 100 + 'vw';
      const z = (Math.random() * 400 - 200) + 'px';
      const drift = (Math.random() * 60 - 30) + 'px';
      const dur = 4 + Math.random() * 6;
      const op = 0.3 + Math.random() * 0.6;

      snow.style.width = size + 'px';
      snow.style.height = size + 'px';
      snow.style.setProperty('--x', x);
      snow.style.setProperty('--z', z);
      snow.style.setProperty('--drift', drift);
      snow.style.setProperty('--op', op);
      snow.style.animationDuration = dur + 's';
      snow.style.animationDelay = -(Math.random() * dur) + 's';
      scene.appendChild(snow);
    }

    function setPaused(p) {
      document.body.classList.toggle('paused', !!p);
    }
    document.addEventListener('visibilitychange', () => {
      setPaused(document.hidden);
    });
    window.addEventListener('message', (e) => {
      if (e.data && typeof e.data.paused === 'boolean') {
        setPaused(e.data.paused);
      }
    });
  </script>
</body>
</html>`;

export const DEFAULT_JESUS_BIRTHDAY_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Happy Birthday Jesus - Palungan & Bintang Fajar</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: radial-gradient(circle at 50% 20%, #0d1b3e 0%, #060c20 50%, #02040b 100%);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      perspective: 1000px;
    }
    body.paused * {
      animation-play-state: paused !important;
    }
    .scene {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      pointer-events: none;
    }
    .ray-cone {
      position: absolute;
      top: 0;
      left: 50%;
      width: 650px;
      height: 100%;
      transform: translateX(-50%);
      background: radial-gradient(ellipse at 50% 0%, rgba(254, 240, 138, 0.4) 0%, rgba(251, 191, 36, 0.15) 40%, transparent 75%);
      filter: blur(20px);
      animation: pulseRays 8s ease-in-out infinite alternate;
    }
    @keyframes pulseRays {
      0% { opacity: 0.7; transform: translateX(-50%) scaleX(0.9); }
      100% { opacity: 1; transform: translateX(-50%) scaleX(1.15); }
    }
    .star-rig {
      position: absolute;
      top: 9%;
      left: 50%;
      transform: translateX(-50%);
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: starFloat 6s ease-in-out infinite alternate;
    }
    @keyframes starFloat {
      0% { transform: translateX(-50%) translateY(0) scale(0.98); }
      100% { transform: translateX(-50%) translateY(-10px) scale(1.05); }
    }
    .star-core {
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 0 25px #ffffff, 0 0 60px #fef08a, 0 0 100px #f59e0b;
    }
    .star-ray-v {
      position: absolute;
      width: 8px;
      height: 140px;
      background: linear-gradient(to bottom, transparent, #ffffff 45%, #ffffff 55%, transparent);
      border-radius: 4px;
      filter: drop-shadow(0 0 10px #fef08a);
    }
    .star-ray-h {
      position: absolute;
      height: 8px;
      width: 140px;
      background: linear-gradient(to right, transparent, #ffffff 45%, #ffffff 55%, transparent);
      border-radius: 4px;
      filter: drop-shadow(0 0 10px #fef08a);
    }
    .star-ray-d1 {
      position: absolute;
      width: 5px;
      height: 90px;
      transform: rotate(45deg);
      background: linear-gradient(to bottom, transparent, #fef08a 40%, #fef08a 60%, transparent);
    }
    .star-ray-d2 {
      position: absolute;
      width: 5px;
      height: 90px;
      transform: rotate(-45deg);
      background: linear-gradient(to bottom, transparent, #fef08a 40%, #fef08a 60%, transparent);
    }
    .manger-rig {
      position: absolute;
      bottom: 8%;
      left: 50%;
      transform: translateX(-50%);
      width: 260px;
      height: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
    }
    .manger-glow {
      position: absolute;
      bottom: 25px;
      width: 240px;
      height: 130px;
      border-radius: 50%;
      background: radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(254, 240, 138, 0.75) 35%, rgba(245, 158, 11, 0.35) 65%, transparent 100%);
      filter: blur(14px);
      animation: divineGlow 4s ease-in-out infinite alternate;
    }
    @keyframes divineGlow {
      0% { transform: scale(0.92); opacity: 0.8; }
      100% { transform: scale(1.08); opacity: 1; }
    }
    .cradle-svg {
      position: relative;
      z-index: 5;
      width: 210px;
      height: 115px;
      filter: drop-shadow(0 0 16px rgba(251, 191, 36, 0.55));
    }
    canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div class="scene">
    <div class="ray-cone"></div>
    <div class="star-rig">
      <div class="star-ray-v"></div>
      <div class="star-ray-h"></div>
      <div class="star-ray-d1"></div>
      <div class="star-ray-d2"></div>
      <div class="star-core"></div>
    </div>
    <div class="manger-rig">
      <div class="manger-glow"></div>
      <svg class="cradle-svg" viewBox="0 0 200 110">
        <line x1="45" y1="50" x2="25" y2="105" stroke="#451a03" stroke-width="8" stroke-linecap="round"/>
        <line x1="25" y1="50" x2="45" y2="105" stroke="#451a03" stroke-width="8" stroke-linecap="round"/>
        <line x1="155" y1="50" x2="175" y2="105" stroke="#451a03" stroke-width="8" stroke-linecap="round"/>
        <line x1="175" y1="50" x2="155" y2="105" stroke="#451a03" stroke-width="8" stroke-linecap="round"/>
        <path d="M20,45 L180,45 L155,85 L45,85 Z" fill="#78350f" stroke="#270f03" stroke-width="3"/>
        <path d="M15,42 Q60,18 100,32 Q140,18 185,42 Q160,65 140,50 Q100,60 60,50 Q40,65 15,42 Z" fill="#fde047"/>
        <path d="M30,42 Q70,26 100,38 Q130,26 170,42 Q140,55 100,46 Q60,55 30,42 Z" fill="#fef08a"/>
        <ellipse cx="100" cy="30" rx="22" ry="16" fill="#ffffff" opacity="0.95"/>
        <ellipse cx="100" cy="30" rx="34" ry="24" fill="#fde047" opacity="0.45"/>
      </svg>
    </div>
    <canvas id="stardust"></canvas>
  </div>
  <script>
    const canvas = document.getElementById('stardust');
    const ctx = canvas.getContext('2d');
    let width, height;
    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const count = 65;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + Math.random() * 2.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.6,
        alpha: 0.2 + Math.random() * 0.8,
        pulse: Math.random() * Math.PI * 2,
        isStar: Math.random() > 0.6
      });
    }

    let isPaused = false;
    function drawStar(ctx, cx, cy, r, rot) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.moveTo(0, -r);
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 4);
        ctx.lineTo(0, -r * 0.35);
        ctx.rotate(Math.PI / 4);
        ctx.lineTo(0, -r);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function loop() {
      if (isPaused) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.04;
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        const currentAlpha = Math.max(0.1, p.alpha * (0.6 + 0.4 * Math.sin(p.pulse)));
        ctx.fillStyle = 'rgba(254, 240, 138, ' + currentAlpha + ')';

        if (p.isStar) {
          drawStar(ctx, p.x, p.y, p.r * 2.2, p.pulse * 0.5);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    function setPaused(p) {
      isPaused = !!p;
      document.body.classList.toggle('paused', isPaused);
      if (!isPaused) requestAnimationFrame(loop);
    }
    document.addEventListener('visibilitychange', () => setPaused(document.hidden));
    window.addEventListener('message', (e) => {
      if (e.data && typeof e.data.paused === 'boolean') setPaused(e.data.paused);
    });
  </script>
</body>
</html>`;

export const DEFAULT_BIRTHDAY_CELEBRATION_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pesta Ulang Tahun Sukacita (Festive Balloons & Confetti 3D)</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: radial-gradient(circle at 50% 30%, #1a0b2e 0%, #0c0517 50%, #030108 100%);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      perspective: 1000px;
    }
    body.paused * {
      animation-play-state: paused !important;
    }
    .scene-3d {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      pointer-events: none;
    }
    .spotlight {
      position: absolute;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.35;
      animation: spotPulse 7s ease-in-out infinite alternate;
    }
    .spot-left {
      top: -100px;
      left: 10%;
      background: radial-gradient(circle, #f59e0b, transparent 70%);
    }
    .spot-right {
      top: -100px;
      right: 10%;
      background: radial-gradient(circle, #e11d48, transparent 70%);
      animation-delay: -3.5s;
    }
    @keyframes spotPulse {
      0% { transform: scale(0.9) translateY(0); opacity: 0.25; }
      100% { transform: scale(1.15) translateY(30px); opacity: 0.45; }
    }
    .balloon-cluster {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .balloon {
      position: absolute;
      width: 70px;
      height: 90px;
      border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
      box-shadow: inset -10px -10px 20px rgba(0,0,0,0.4), inset 8px 8px 15px rgba(255,255,255,0.6), 0 10px 25px rgba(0,0,0,0.3);
      animation: balloonFloat ease-in-out infinite alternate;
      will-change: transform;
    }
    .balloon::after {
      content: '';
      position: absolute;
      bottom: -7px;
      left: 50%;
      transform: translateX(-50%);
      width: 10px;
      height: 7px;
      background: inherit;
      clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%);
    }
    .balloon-string {
      position: absolute;
      bottom: -65px;
      left: 50%;
      width: 2px;
      height: 60px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.15));
      transform-origin: top center;
      animation: stringSway 4s ease-in-out infinite alternate;
    }
    @keyframes balloonFloat {
      0% { transform: translateY(0) rotate(-3deg); }
      100% { transform: translateY(-28px) rotate(3deg); }
    }
    @keyframes stringSway {
      0% { transform: rotate(-5deg); }
      100% { transform: rotate(5deg); }
    }
    canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div class="scene-3d">
    <div class="spotlight spot-left"></div>
    <div class="spotlight spot-right"></div>
    <div id="balloons" class="balloon-cluster"></div>
    <canvas id="confetti"></canvas>
  </div>
  <script>
    const balloonContainer = document.getElementById('balloons');
    const balloonColors = [
      'radial-gradient(circle at 30% 30%, #fef08a 0%, #f59e0b 60%, #b45309 100%)',
      'radial-gradient(circle at 30% 30%, #fda4af 0%, #f43f5e 60%, #9f1239 100%)',
      'radial-gradient(circle at 30% 30%, #bae6fd 0%, #0284c7 60%, #075985 100%)',
      'radial-gradient(circle at 30% 30%, #fbcfe8 0%, #db2777 60%, #831843 100%)',
      'radial-gradient(circle at 30% 30%, #a7f3d0 0%, #10b981 60%, #064e3b 100%)',
      'radial-gradient(circle at 30% 30%, #ddd6fe 0%, #8b5cf6 60%, #4c1d95 100%)'
    ];

    const balloonConfigs = [
      { x: '8vw', y: '35vh', scale: 1.1, color: 0, dur: 5.5, delay: 0 },
      { x: '16vw', y: '55vh', scale: 0.9, color: 1, dur: 6.2, delay: -2 },
      { x: '24vw', y: '25vh', scale: 0.85, color: 2, dur: 5.0, delay: -1 },
      { x: '72vw', y: '28vh', scale: 0.95, color: 3, dur: 5.8, delay: -3 },
      { x: '82vw', y: '48vh', scale: 1.15, color: 0, dur: 6.5, delay: -1.5 },
      { x: '90vw', y: '22vh', scale: 0.8, color: 4, dur: 4.8, delay: -2.5 }
    ];

    balloonConfigs.forEach(cfg => {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.left = cfg.x;
      b.style.top = cfg.y;
      b.style.background = balloonColors[cfg.color];
      b.style.transform = 'scale(' + cfg.scale + ')';
      b.style.animationDuration = cfg.dur + 's';
      b.style.animationDelay = cfg.delay + 's';

      const s = document.createElement('div');
      s.className = 'balloon-string';
      s.style.animationDuration = (cfg.dur * 0.8) + 's';
      b.appendChild(s);

      balloonContainer.appendChild(b);
    });

    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    let width, height;
    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const confettiList = [];
    const confettiCount = 85;
    const colors = ['#f59e0b', '#fef08a', '#f43f5e', '#38bdf8', '#a855f7', '#4ade80', '#ffffff'];

    for (let i = 0; i < confettiCount; i++) {
      confettiList.push({
        x: Math.random() * width,
        y: Math.random() * height,
        w: 6 + Math.random() * 8,
        h: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 1.5,
        vy: 1.2 + Math.random() * 2.2,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        vRotX: 0.03 + Math.random() * 0.05,
        vRotY: 0.02 + Math.random() * 0.04
      });
    }

    let isPaused = false;
    function loop() {
      if (isPaused) return;
      ctx.clearRect(0, 0, width, height);

      confettiList.forEach(c => {
        c.y += c.vy;
        c.x += c.vx + Math.sin(c.rotY) * 0.8;
        c.rotX += c.vRotX;
        c.rotY += c.vRotY;

        if (c.y > height + 20) {
          c.y = -20;
          c.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.fillStyle = c.color;

        const scaleY = Math.sin(c.rotX);
        const scaleX = Math.cos(c.rotY);
        ctx.scale(scaleX, scaleY);

        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
      });

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    function setPaused(p) {
      isPaused = !!p;
      document.body.classList.toggle('paused', isPaused);
      if (!isPaused) requestAnimationFrame(loop);
    }
    document.addEventListener('visibilitychange', () => setPaused(document.hidden));
    window.addEventListener('message', (e) => {
      if (e.data && typeof e.data.paused === 'boolean') setPaused(e.data.paused);
    });
  </script>
</body>
</html>`;

export const DEFAULT_BIRTHDAY_CANDLES_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lilin Ulang Tahun Emas & Doa Syukur (Golden Birthday Candles)</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: radial-gradient(circle at 50% 65%, #241306 0%, #120902 50%, #030200 100%);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      perspective: 1000px;
    }
    body.paused * {
      animation-play-state: paused !important;
    }
    .scene {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      pointer-events: none;
    }
    .candles-ambient {
      position: absolute;
      bottom: 15%;
      left: 50%;
      transform: translateX(-50%);
      width: 500px;
      height: 350px;
      border-radius: 50%;
      background: radial-gradient(ellipse at 50% 50%, rgba(254, 240, 138, 0.45) 0%, rgba(245, 158, 11, 0.25) 45%, transparent 75%);
      filter: blur(30px);
      animation: ambientPulse 5s ease-in-out infinite alternate;
    }
    @keyframes ambientPulse {
      0% { transform: translateX(-50%) scale(0.94); opacity: 0.8; }
      100% { transform: translateX(-50%) scale(1.08); opacity: 1; }
    }
    .candles-row {
      position: absolute;
      bottom: 12%;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: flex-end;
      gap: 40px;
      z-index: 5;
    }
    .candle-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .flame-wrapper {
      position: relative;
      width: 24px;
      height: 48px;
      margin-bottom: 2px;
      animation: flameSway 3s ease-in-out infinite alternate;
      transform-origin: bottom center;
    }
    .flame-outer {
      position: absolute;
      inset: 0;
      border-radius: 50% 50% 35% 35% / 60% 60% 40% 40%;
      background: linear-gradient(to bottom, #ffffff 0%, #fef08a 25%, #f59e0b 60%, #ef4444 85%, #3b82f6 100%);
      box-shadow: 0 0 20px #f59e0b, 0 0 40px #fef08a;
      animation: flameFlicker 0.15s ease-in-out infinite alternate;
    }
    @keyframes flameFlicker {
      0% { transform: scale(0.96) rotate(-1deg); }
      100% { transform: scale(1.04) rotate(1deg); }
    }
    @keyframes flameSway {
      0% { transform: rotate(-3deg); }
      100% { transform: rotate(3deg); }
    }
    .wick {
      width: 3px;
      height: 10px;
      background: #1c1917;
      border-radius: 2px;
    }
    .candle-body {
      width: 42px;
      border-radius: 6px 6px 0 0;
      background: linear-gradient(90deg, #ca8a04 0%, #fef08a 40%, #fef9c3 60%, #ca8a04 100%);
      box-shadow: 0 4px 15px rgba(0,0,0,0.5);
      position: relative;
    }
    .candle-body::before {
      content: '';
      position: absolute;
      top: -3px;
      left: 0;
      right: 0;
      height: 6px;
      border-radius: 50%;
      background: #fef08a;
    }
    canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div class="scene">
    <div class="candles-ambient"></div>
    <div class="candles-row">
      <div class="candle-item">
        <div class="flame-wrapper"><div class="flame-outer"></div></div>
        <div class="wick"></div>
        <div class="candle-body" style="height: 110px;"></div>
      </div>
      <div class="candle-item">
        <div class="flame-wrapper" style="animation-delay: -1s;"><div class="flame-outer" style="animation-delay: -0.05s;"></div></div>
        <div class="wick"></div>
        <div class="candle-body" style="height: 150px; width: 48px;"></div>
      </div>
      <div class="candle-item">
        <div class="flame-wrapper" style="animation-delay: -2s;"><div class="flame-outer" style="animation-delay: -0.1s;"></div></div>
        <div class="wick"></div>
        <div class="candle-body" style="height: 125px;"></div>
      </div>
    </div>
    <canvas id="bokeh"></canvas>
  </div>
  <script>
    const canvas = document.getElementById('bokeh');
    const ctx = canvas.getContext('2d');
    let width, height;
    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const count = 55;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 3 + Math.random() * 12,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.4 - Math.random() * 0.8,
        alpha: 0.15 + Math.random() * 0.45,
        pulse: Math.random() * Math.PI * 2
      });
    }

    let isPaused = false;
    function loop() {
      if (isPaused) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        const currentAlpha = Math.max(0.05, p.alpha * (0.7 + 0.3 * Math.sin(p.pulse)));
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, 'rgba(254, 240, 138, ' + currentAlpha + ')');
        grad.addColorStop(0.5, 'rgba(245, 158, 11, ' + (currentAlpha * 0.6) + ')');
        grad.addColorStop(1, 'rgba(245, 158, 11, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    function setPaused(p) {
      isPaused = !!p;
      document.body.classList.toggle('paused', isPaused);
      if (!isPaused) requestAnimationFrame(loop);
    }
    document.addEventListener('visibilitychange', () => setPaused(document.hidden));
    window.addEventListener('message', (e) => {
      if (e.data && typeof e.data.paused === 'boolean') setPaused(e.data.paused);
    });
  </script>
</body>
</html>`;

export const DEFAULT_BUILTIN_HTML_BACKGROUNDS = [
  {
    id: 'html-gold-cross',
    name: 'Salib Emas 3D (Partikel Cahaya)',
    type: 'html' as const,
    data: DEFAULT_GOLDEN_CROSS_HTML,
    dateAdded: 1,
  },
  {
    id: 'html-heavenly-rays',
    name: 'Sinar Kemuliaan (Heavenly Rays)',
    type: 'html' as const,
    data: DEFAULT_HEAVENLY_RAYS_HTML,
    dateAdded: 2,
  },
  {
    id: 'html-aurora-waves',
    name: 'Gelombang Sutra Aurora (Silk Waves)',
    type: 'html' as const,
    data: DEFAULT_AURORA_WAVES_HTML,
    dateAdded: 3,
  },
  {
    id: 'html-sacred-bokeh',
    name: 'Lilin Doa & Bokeh Kudus (Sanctuary)',
    type: 'html' as const,
    data: DEFAULT_SACRED_BOKEH_HTML,
    dateAdded: 4,
  },
  {
    id: 'html-holy-spirit-fire',
    name: 'Nyala Api Roh Kudus (Pentecost Fire)',
    type: 'html' as const,
    data: DEFAULT_HOLY_SPIRIT_FIRE_HTML,
    dateAdded: 5,
  },
  {
    id: 'html-cosmic-worship',
    name: 'Semesta Bintang & Nebula (Cosmic Glory)',
    type: 'html' as const,
    data: DEFAULT_COSMIC_WORSHIP_HTML,
    dateAdded: 6,
  },
  {
    id: 'html-christmas-tree',
    name: 'Pohon Natal & Salju 3D (Three.js Loop)',
    type: 'html' as const,
    data: DEFAULT_CHRISTMAS_TREE_HTML,
    dateAdded: 7,
  },
  {
    id: 'html-bethlehem-star',
    name: 'Bintang Betlehem & Malam Kudus (Holy Night Star)',
    type: 'html' as const,
    data: DEFAULT_BETHLEHEM_STAR_HTML,
    dateAdded: 8,
  },
  {
    id: 'html-christmas-candle',
    name: 'Lilin Malam Kudus & Salju (Candlelight Vigil)',
    type: 'html' as const,
    data: DEFAULT_CHRISTMAS_CANDLE_HTML,
    dateAdded: 9,
  },
  {
    id: 'html-golden-noel',
    name: 'Hiasan Emas & Partikel Lonceng (Golden Noel)',
    type: 'html' as const,
    data: DEFAULT_GOLDEN_NOEL_HTML,
    dateAdded: 10,
  },
  {
    id: 'html-css3d-snow-crystals',
    name: 'Kristal Salju 3D CSS (Spatial Snowfall)',
    type: 'html' as const,
    data: DEFAULT_CSS3D_SNOW_CRYSTALS_HTML,
    dateAdded: 11,
  },
  {
    id: 'html-css3d-christmas-lanterns',
    name: 'Lentera Cahaya Natal 3D CSS (3D Light Ornaments)',
    type: 'html' as const,
    data: DEFAULT_CSS3D_CHRISTMAS_LANTERNS_HTML,
    dateAdded: 12,
  },
  {
    id: 'html-css3d-snowman',
    name: 'Boneka Salju 3D CSS (Festive Winter Snowman)',
    type: 'html' as const,
    data: DEFAULT_CSS3D_SNOWMAN_HTML,
    dateAdded: 13,
  },
  {
    id: 'html-css3d-santa-sleigh',
    name: 'Santa Claus & Kereta Rusa 3D CSS (Santa Flight)',
    type: 'html' as const,
    data: DEFAULT_CSS3D_SANTA_SLEIGH_HTML,
    dateAdded: 14,
  },
  {
    id: 'html-css3d-christmas-tree',
    name: 'Pohon Natal Kristal & Kado 3D CSS (3D Geometric Tree)',
    type: 'html' as const,
    data: DEFAULT_CSS3D_CHRISTMAS_TREE_HTML,
    dateAdded: 15,
  },
  {
    id: 'html-jesus-birthday',
    name: 'Kelahiran Yesus 3D (Happy Birthday Jesus - Palungan & Bintang Fajar)',
    type: 'html' as const,
    data: DEFAULT_JESUS_BIRTHDAY_HTML,
    dateAdded: 16,
  },
  {
    id: 'html-birthday-celebration',
    name: 'Pesta Ulang Tahun Sukacita (Festive Balloons & Golden Confetti 3D)',
    type: 'html' as const,
    data: DEFAULT_BIRTHDAY_CELEBRATION_HTML,
    dateAdded: 17,
  },
  {
    id: 'html-birthday-candles',
    name: 'Lilin Ulang Tahun Emas & Doa Syukur (Golden Birthday Candles & Bokeh)',
    type: 'html' as const,
    data: DEFAULT_BIRTHDAY_CANDLES_HTML,
    dateAdded: 18,
  },
];

export const DEFAULT_HTML_BG_IDS = DEFAULT_BUILTIN_HTML_BACKGROUNDS.map((b) => b.id);

export const normalizeBookName = (raw: string | number): string => {
  if (raw === undefined || raw === null) return '';
  const str = String(raw).trim();
  const num = parseInt(str, 10);
  if (!isNaN(num) && num >= 1 && num <= 66) {
    return INDO_BIBLE_BOOKS[num - 1];
  }
  const foundExact = INDO_BIBLE_BOOKS.find((b) => b.toLowerCase() === str.toLowerCase());
  if (foundExact) return foundExact;

  const cleanStr = str.toLowerCase().replace(/\s+/g, '');
  const foundPartial = INDO_BIBLE_BOOKS.find((b) => {
    const cleanB = b.toLowerCase().replace(/\s+/g, '');
    return cleanB.startsWith(cleanStr) || cleanStr.startsWith(cleanB);
  });
  if (foundPartial) return foundPartial;

  return str;
};

