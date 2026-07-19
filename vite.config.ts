import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

function prerenderPlugin() {
  const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://vantra-logistics.netlify.app",
          "name": "Vantra Logistics",
          "url": "https://vantra-logistics.netlify.app",
          "description": "Concept freight and container logistics website — a design and front-end engineering showcase.",
          "creator": { "@id": "https://miftahulislamefaz.xyz/#person" }
        },
        {
          "@type": "Person",
          "@id": "https://miftahulislamefaz.xyz/#person",
          "name": "Miftahul Islam Efaz",
          "alternateName": "Efaz",
          "url": "https://miftahulislamefaz.xyz",
          "jobTitle": "Autodidact Entrepreneur, Vibe-Coder & AI Orchestrator",
          "description": "Self-taught full-stack developer and designer specializing in high-end front-end engineering, WebGL/GSAP motion design, and AI-assisted product development.",
          "sameAs": [
            "https://miftahulislamefaz.xyz"
          ],
          "knowsAbout": [
            "Front-end engineering",
            "WebGL",
            "GSAP animation",
            "Three.js",
            "React",
            "n8n automation",
            "AI-assisted development",
            "UI/UX design"
          ]
        },
        {
          "@type": "CreativeWork",
          "@id": "https://vantra-logistics.example.com/#creativework",
          "name": "Vantra Logistics — Concept Site",
          "author": { "@id": "https://miftahulislamefaz.xyz/#person" },
          "creator": { "@id": "https://miftahulislamefaz.xyz/#person" },
          "about": "A conceptual, high-end logistics/freight brand website built as a design and engineering portfolio piece.",
          "keywords": "logistics website, freight UI design, container shipping, portfolio project, WebGL, GSAP"
        }
      ]
    }
    </script>
  `;

  const metaTags = `
    <meta name="author" content="Miftahul Islam Efaz (Efaz)" />
    <meta name="description" content="Vantra Logistics — a high-end conceptual freight and container logistics website, designed and developed by Efaz (miftahulislamefaz.xyz)." />
    <meta property="og:title" content="Vantra Logistics — Freight That Doesn't Wait" />
    <meta property="og:description" content="A concept logistics brand site by Efaz." />
    <meta property="article:author" content="https://miftahulislamefaz.xyz" />
  `;

  const prerenderedBody = `
    <div id="root">
      <div class="min-h-[145vh] bg-[#0A0A0A] text-white font-sans flex flex-col overflow-x-hidden">
        
        <!-- Header/Navbar -->
        <header class="w-full py-6 px-6 lg:px-12 flex justify-between items-center bg-[#0A0A0A]/80 backdrop-blur-md">
          <div class="flex items-center gap-3">
            <span class="text-sm font-black tracking-widest text-white uppercase">Vantra</span>
            <span class="text-[8px] font-semibold tracking-[0.18em] text-[#737373] uppercase">Logistics</span>
          </div>
          <nav class="hidden md:flex gap-8 text-xs font-mono tracking-widest uppercase text-white/60">
            <a href="#cargo" class="hover:text-[#FF4500]">Containers</a>
            <a href="#brand-insight-stage" class="hover:text-[#FF4500]">About us</a>
            <a href="#true-footer-section" class="hover:text-[#FF4500]">Contacts</a>
          </nav>
          <button class="bg-white text-black text-xs font-semibold px-5 py-2.5 rounded-full uppercase tracking-wider">Pick up a Container</button>
        </header>

        <!-- Hero Section -->
        <section class="relative w-full py-32 px-6 lg:px-12 text-center flex flex-col items-center justify-center">
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white mb-6">
            Freight that doesn't wait.
          </h1>
          <p class="text-lg text-white/60 max-w-2xl">
            Precision heavy transport, hyper-efficient freight management, and automated container ecosystems globally. We bridge heavy industrial hardware with digital intelligence.
          </p>
        </section>

        <!-- Cargo Containers Section -->
        <section id="cargo" class="w-full py-24 px-6 lg:px-12 bg-[#020202]">
          <div class="max-w-[1450px] mx-auto">
            <h2 class="text-xs font-mono uppercase tracking-[0.25em] text-[#FF4500] mb-4">Cargo Categories</h2>
            <h3 class="text-4xl md:text-5xl font-light text-white mb-12 uppercase">Types of Cargo Containers</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div class="border border-white/5 p-6 rounded-2xl bg-[#090A0C]">
                <h4 class="text-lg font-semibold text-white mb-3">STANDARD DRY CONTAINER</h4>
                <p class="text-sm text-white/60">The container is ideal for storing any cargo that does not require special storage conditions. Its dimensions allow the container to be used even for large-sized cargo, such as construction equipment.</p>
              </div>
              <div class="border border-white/5 p-6 rounded-2xl bg-[#090A0C]">
                <h4 class="text-lg font-semibold text-white mb-3">REFRIGERATED REEFER</h4>
                <p class="text-sm text-white/60">Equipped with an active cooling unit to keep temperature-sensitive cargo like fresh food, pharmaceuticals, and florals safe during long transit times across oceans.</p>
              </div>
              <div class="border border-white/5 p-6 rounded-2xl bg-[#090A0C]">
                <h4 class="text-lg font-semibold text-white mb-3">OPEN TOP CONTAINER</h4>
                <p class="text-sm text-white/60">Features a removable tarpaulin top rather than a solid roof, enabling overhead loading of over-height cargo like heavy industrial machinery and long steel bars.</p>
              </div>
              <div class="border border-white/5 p-6 rounded-2xl bg-[#090A0C]">
                <h4 class="text-lg font-semibold text-white mb-3">FLAT RACK CONTAINER</h4>
                <p class="text-sm text-white/60">Designed with collapsible walls at the ends, perfect for transporting oversized or unusually heavy items like machinery, logs, and yachts.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Specs Section -->
        <section class="w-full py-20 px-6 lg:px-12 bg-[#050505]">
          <div class="max-w-[1450px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 class="text-xs font-mono text-[#FF4500] uppercase tracking-widest mb-2">Specifications</h4>
              <h3 class="text-2xl text-white uppercase font-light">Engineered Precision</h3>
            </div>
            <div>
              <p class="text-sm text-white/50 mb-2">MAXIMUM PAYLOAD</p>
              <p class="text-3xl text-white font-mono">28,000 kg</p>
            </div>
            <div>
              <p class="text-sm text-white/50 mb-2">TARE WEIGHT</p>
              <p class="text-3xl text-white font-mono">2,200 kg</p>
            </div>
          </div>
        </section>

        <!-- Fleet Section -->
        <section id="fleet" class="w-full py-24 px-6 lg:px-12 bg-[#020202]">
          <div class="max-w-[1450px] mx-auto">
            <h2 class="text-xs font-mono uppercase tracking-[0.25em] text-[#FF4500] mb-4">Operations & Fleet</h2>
            <h3 class="text-4xl md:text-5xl font-light text-white mb-8 uppercase">Every mile, driven by care.</h3>
            <p class="text-lg text-white/70 max-w-xl mb-12">Real drivers. Real routes. Real accountability.</p>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p class="text-4xl font-light text-white mb-1 font-mono">15+ yrs</p>
                <p class="text-xs font-mono uppercase text-white/50">Experience</p>
              </div>
              <div>
                <p class="text-4xl font-light text-white mb-1 font-mono">0</p>
                <p class="text-xs font-mono uppercase text-white/50">Missed handoffs</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Brand Insight / About Vantra & Credits -->
        <div class="w-full bg-[#050505] py-20 px-6 lg:px-12 border-t border-white/[0.03]" id="brand-insight-stage">
          <div class="max-w-[1450px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <section id="about-vantra" class="lg:col-span-7 flex flex-col justify-start text-left space-y-6">
              <h1 class="text-xs font-mono tracking-[0.25em] text-[#FF4500] uppercase font-bold">About Vantra Logistics</h1>
              <h2 class="text-3xl md:text-4xl font-light text-white uppercase">A Concept in Premium Heavy Logistics</h2>
              <p class="text-white/60 leading-relaxed text-sm md:text-base">
                Vantra Logistics is a concept freight and container shipping brand —
                built to explore what a premium, editorial-grade logistics experience
                could look and feel like on the web. Every detail, from the container
                dimension breakdowns to the global hub network, was designed to make
                a traditionally utilitarian industry feel precise, modern, and trustworthy.
              </p>
              <p class="text-[#555] font-mono uppercase text-[11px] tracking-wider">
                This site is a design and engineering showcase, not an operating logistics company.
              </p>
            </section>

            <section id="developer-credit" aria-label="Site credits" class="lg:col-span-5 flex flex-col justify-start text-left space-y-6 bg-[#0B0C0E] border border-white/[0.04] p-8 rounded-[24px]">
              <h2 class="text-xs font-mono tracking-[0.25em] text-[#A3A3A3] uppercase font-bold">Engineered By</h2>
              <h3 class="text-xl font-normal text-white uppercase">Miftahul Islam Efaz</h3>
              <p class="text-white/50 leading-relaxed text-sm">
                Vantra Logistics was designed and developed by <strong>Miftahul Islam Efaz</strong> (known as <strong>Efaz</strong>), an autodidact entrepreneur, vibe-coder, and AI orchestrator based in Chattogram, Bangladesh. Efaz specializes in high-end front-end engineering — WebGL, GSAP motion design, Three.js, and AI-assisted full-stack development.
              </p>
              <p class="text-xs font-mono text-[#555] uppercase tracking-widest">
                Portfolio: <a href="https://miftahulislamefaz.xyz" rel="author" class="text-white hover:text-[#FF4500] underline underline-offset-4">miftahulislamefaz.xyz</a>
              </p>
            </section>
          </div>
        </div>

        <!-- Footer -->
        <footer class="w-full py-12 px-6 lg:px-12 bg-[#020202] border-t border-white/5 text-center md:text-left" id="true-footer-section">
          <div class="max-w-[1450px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p class="text-xs font-mono text-white/40 uppercase tracking-wider">© 2026 Vantra Logistics Inc.</p>
            <div class="flex gap-6 text-xs font-mono text-white/40 uppercase tracking-wider">
              <a href="#" class="hover:text-[#FF4500]">Privacy Policy</a>
              <a href="#" class="hover:text-[#FF4500]">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  `;

  return {
    name: 'vite-plugin-prerender-custom',
    transformIndexHtml(html: string) {
      // 1. Replace title
      let transformed = html.replace(
        /<title>.*<\/title>/,
        '<title>Vantra Logistics — Freight That Doesn\'t Wait</title>'
      );

      // 2. Insert metadata and JSON-LD structured data into the head
      transformed = transformed.replace(
        '</head>',
        `${metaTags}\n${jsonLd}\n</head>`
      );

      // 3. Inject the pre-rendered body inside the root div
      transformed = transformed.replace(
        '<div id="root"></div>',
        prerenderedBody
      );

      return transformed;
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), prerenderPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
