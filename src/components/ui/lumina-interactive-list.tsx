import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useRouter } from '../../lib/router';
import { ArrowLeft } from 'lucide-react';

export interface LuminaSlide {
  title: string;
  description: string;
  media: string;
  location?: string;
  focus?: string;
}

export function Component() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { navigate } = useRouter();

  const slides: LuminaSlide[] = [
    {
      title: "Gram Vikas Odisha",
      description: "Empowering rural and indigenous tribal communities across Odisha with sustainable water systems, village sanitation, and renewable energy.",
      media: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=85",
      location: "Mohuda, Berhampur, Odisha",
      focus: "Water Security & Rural Resilience",
    },
    {
      title: "Bakul Foundation",
      description: "Catalyzing volunteer-led social change across Odisha through open children's libraries, environmental tree campaigns, and youth engagement.",
      media: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=2000&q=85",
      location: "Bhubaneswar, Odisha",
      focus: "Education & Open Libraries",
    },
    {
      title: "Goonj India",
      description: "Transforming urban surplus into a powerful development currency for disaster rehabilitation and rural infrastructure across Odisha & nationwide.",
      media: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb7?auto=format&fit=crop&w=2000&q=85",
      location: "New Delhi & Odisha Outposts",
      focus: "Disaster Relief & Cloth for Work",
    },
    {
      title: "KISS Foundation Odisha",
      description: "Providing world-class residential schooling, healthcare, nutrition, and STEM education to over 30,000 indigenous tribal children in Odisha.",
      media: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2000&q=85",
      location: "Bhubaneswar, Odisha",
      focus: "Indigenous Tribal Education",
    },
    {
      title: "Pratham Education",
      description: "Transforming grassroots learning outcomes for millions of children across India through foundational literacy kits and digital learning hubs.",
      media: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2000&q=85",
      location: "Pan-India & Odisha Hubs",
      focus: "Grassroots Literacy & EdTech",
    },
    {
      title: "Wildlife Society of Odisha",
      description: "Preserving Odisha's unique ecosystems, protecting Chilika Lake Irrawaddy dolphins, sea turtle nesting beaches, and elephant corridors.",
      media: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85",
      location: "Chilika & Cuttack, Odisha",
      focus: "Coastal Marine & Wildlife Ecology",
    },
  ];

  useEffect(() => {
    let isDisposed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let shaderMaterial: THREE.ShaderMaterial | null = null;
    let animFrameId: number | null = null;
    let autoSlideTimer: NodeJS.Timeout | null = null;
    let progressAnimation: NodeJS.Timeout | null = null;

    const SLIDER_CONFIG: any = {
      settings: {
        transitionDuration: 2.2,
        autoSlideSpeed: 5500,
        currentEffect: "glass",
        currentEffectPreset: "Default",
        globalIntensity: 1.0,
        speedMultiplier: 1.0,
        distortionStrength: 1.0,
        colorEnhancement: 1.0,
        glassRefractionStrength: 1.0,
        glassChromaticAberration: 1.0,
        glassBubbleClarity: 1.0,
        glassEdgeGlow: 1.0,
        glassLiquidFlow: 1.0,
      },
    };

    let currentSlideIndex = 0;
    let isTransitioning = false;
    let slideTextures: THREE.Texture[] = [];
    let texturesLoaded = false;
    let sliderEnabled = false;

    const SLIDE_DURATION = () => SLIDER_CONFIG.settings.autoSlideSpeed;
    const PROGRESS_UPDATE_INTERVAL = 50;
    const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

    // --- SHADERS ---
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture1, uTexture2;
      uniform float uProgress;
      uniform vec2 uResolution, uTexture1Size, uTexture2Size;
      uniform int uEffectType;
      uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength, uColorEnhancement;
      uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
      varying vec2 vUv;

      vec2 getCoverUV(vec2 uv, vec2 textureSize) {
        vec2 s = uResolution / textureSize;
        float scale = max(s.x, s.y);
        vec2 scaledSize = textureSize * scale;
        vec2 offset = (uResolution - scaledSize) * 0.5;
        return (uv * uResolution - offset) / scaledSize;
      }

      vec4 glassEffect(vec2 uv, float progress) {
        float time = progress * 5.0 * uSpeedMultiplier;
        vec2 uv1 = getCoverUV(uv, uTexture1Size);
        vec2 uv2 = getCoverUV(uv, uTexture2Size);
        float maxR = length(uResolution) * 0.85;
        float br = progress * maxR;
        vec2 p = uv * uResolution;
        vec2 c = uResolution * 0.5;
        float d = length(p - c);
        float nd = d / max(br, 0.001);
        float param = smoothstep(br + 3.0, br - 3.0, d);

        vec4 img;
        if (param > 0.0) {
          float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
          vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
          vec2 distUV = uv2 - dir * ro;
          distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
          float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
          img = vec4(
            texture2D(uTexture2, distUV + dir * ca * 1.2).r,
            texture2D(uTexture2, distUV + dir * ca * 0.2).g,
            texture2D(uTexture2, distUV - dir * ca * 0.8).b,
            1.0
          );
          if (uGlassEdgeGlow > 0.0) {
            float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
            img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
          }
        } else {
          img = texture2D(uTexture2, uv2);
        }
        vec4 oldImg = texture2D(uTexture1, uv1);
        if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
        return mix(oldImg, img, param);
      }

      void main() {
        gl_FragColor = glassEffect(vUv, uProgress);
      }
    `;

    const splitText = (text: string) => {
      return text
        .split('')
        .map(
          (char) =>
            `<span style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
        )
        .join('');
    };

    const updateContent = (idx: number) => {
      if (isDisposed) return;
      const titleEl = document.getElementById('mainTitle');
      const descEl = document.getElementById('mainDesc');
      const locEl = document.getElementById('mainLocation');

      if (titleEl && descEl) {
        gsap.to(titleEl.children, { y: -20, opacity: 0, duration: 0.45, stagger: 0.02, ease: "power2.in" });
        gsap.to(descEl, { y: -10, opacity: 0, duration: 0.35, ease: "power2.in" });

        setTimeout(() => {
          if (isDisposed) return;
          titleEl.innerHTML = splitText(slides[idx].title);
          descEl.textContent = slides[idx].description;
          if (locEl && slides[idx].location) {
            locEl.textContent = `${slides[idx].location} · ${slides[idx].focus}`;
          }

          gsap.set(titleEl.children, { opacity: 0, y: 22 });
          gsap.set(descEl, { opacity: 0, y: 16 });

          const children = titleEl.children;
          switch (idx % 6) {
            case 0:
              gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
              gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
              break;
            case 1:
              gsap.set(children, { y: -20 });
              gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "back.out(1.7)" });
              gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
              break;
            case 2:
              gsap.set(children, { filter: "blur(10px)", scale: 1.3, y: 0 });
              gsap.to(children, { filter: "blur(0px)", scale: 1, opacity: 1, duration: 1, stagger: { amount: 0.4, from: "random" }, ease: "power2.out" });
              gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out" });
              break;
            case 3:
              gsap.set(children, { scale: 0, y: 0 });
              gsap.to(children, { scale: 1, opacity: 1, duration: 0.65, stagger: 0.04, ease: "back.out(1.5)" });
              gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
              break;
            case 4:
              gsap.set(children, { rotationX: 90, y: 0, transformOrigin: "50% 50%" });
              gsap.to(children, { rotationX: 0, opacity: 1, duration: 0.8, stagger: 0.035, ease: "power2.out" });
              gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" });
              break;
            case 5:
              gsap.set(children, { x: 30, y: 0 });
              gsap.to(children, { x: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
              gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
              break;
            default:
              gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
              gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
          }
        }, 400);
      }
    };

    const stopAutoSlideTimer = () => {
      if (progressAnimation) clearInterval(progressAnimation);
      if (autoSlideTimer) clearTimeout(autoSlideTimer);
      progressAnimation = null;
      autoSlideTimer = null;
    };

    const updateSlideProgress = (idx: number, prog: number) => {
      const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill") as HTMLElement;
      if (el) {
        el.style.width = `${prog}%`;
        el.style.opacity = '1';
      }
    };

    const fadeSlideProgress = (idx: number) => {
      const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill") as HTMLElement;
      if (el) {
        el.style.opacity = '0';
        setTimeout(() => {
          if (el) el.style.width = "0%";
        }, 300);
      }
    };

    const quickResetProgress = (idx: number) => {
      const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill") as HTMLElement;
      if (el) {
        el.style.transition = "width 0.2s ease-out";
        el.style.width = "0%";
        setTimeout(() => {
          if (el) el.style.transition = "width 0.1s ease, opacity 0.3s ease";
        }, 200);
      }
    };

    const updateCounter = (idx: number) => {
      const sn = document.getElementById("slideNumber");
      if (sn) sn.textContent = String(idx + 1).padStart(2, "0");
      const st = document.getElementById("slideTotal");
      if (st) st.textContent = String(slides.length).padStart(2, "0");
    };

    const updateNavigationState = (idx: number) => {
      document.querySelectorAll(".slide-nav-item").forEach((el, i) => {
        el.classList.toggle("active", i === idx);
      });
    };

    const navigateToSlide = (targetIndex: number) => {
      if (isDisposed || isTransitioning || targetIndex === currentSlideIndex || !shaderMaterial) return;
      stopAutoSlideTimer();
      quickResetProgress(currentSlideIndex);

      const currentTexture = slideTextures[currentSlideIndex];
      const targetTexture = slideTextures[targetIndex];
      if (!currentTexture || !targetTexture) return;

      isTransitioning = true;
      shaderMaterial.uniforms.uTexture1.value = currentTexture;
      shaderMaterial.uniforms.uTexture2.value = targetTexture;
      shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
      shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;

      updateContent(targetIndex);

      currentSlideIndex = targetIndex;
      updateCounter(currentSlideIndex);
      updateNavigationState(currentSlideIndex);

      gsap.fromTo(
        shaderMaterial.uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: TRANSITION_DURATION(),
          ease: "power2.inOut",
          onComplete: () => {
            if (isDisposed || !shaderMaterial) return;
            shaderMaterial.uniforms.uProgress.value = 0;
            shaderMaterial.uniforms.uTexture1.value = targetTexture;
            shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
            isTransitioning = false;
            safeStartTimer(150);
          },
        }
      );
    };

    const handleSlideChange = () => {
      if (isDisposed || isTransitioning || !texturesLoaded || !sliderEnabled) return;
      navigateToSlide((currentSlideIndex + 1) % slides.length);
    };

    const startAutoSlideTimer = () => {
      if (isDisposed || !texturesLoaded || !sliderEnabled) return;
      stopAutoSlideTimer();
      let progress = 0;
      const increment = (100 / SLIDE_DURATION()) * PROGRESS_UPDATE_INTERVAL;
      progressAnimation = setInterval(() => {
        if (isDisposed || !sliderEnabled) {
          stopAutoSlideTimer();
          return;
        }
        progress += increment;
        updateSlideProgress(currentSlideIndex, progress);
        if (progress >= 100) {
          if (progressAnimation) clearInterval(progressAnimation);
          progressAnimation = null;
          fadeSlideProgress(currentSlideIndex);
          if (!isTransitioning) handleSlideChange();
        }
      }, PROGRESS_UPDATE_INTERVAL);
    };

    const safeStartTimer = (delay = 0) => {
      stopAutoSlideTimer();
      if (sliderEnabled && texturesLoaded && !isDisposed) {
        if (delay > 0) autoSlideTimer = setTimeout(startAutoSlideTimer, delay);
        else startAutoSlideTimer();
      }
    };

    const createSlidesNavigation = () => {
      const nav = document.getElementById("slidesNav");
      if (!nav) return;
      nav.innerHTML = "";
      slides.forEach((slide, i) => {
        const item = document.createElement("div");
        item.className = `slide-nav-item${i === 0 ? " active" : ""}`;
        item.dataset.slideIndex = String(i);
        item.innerHTML = `
          <div class="slide-progress-line"><div class="slide-progress-fill"></div></div>
          <div class="slide-nav-title">${slide.title}</div>
        `;
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          if (!isTransitioning && i !== currentSlideIndex) {
            stopAutoSlideTimer();
            quickResetProgress(currentSlideIndex);
            navigateToSlide(i);
          }
        });
        nav.appendChild(item);
      });
    };

    const loadImageTexture = (src: string) =>
      new Promise<THREE.Texture>((resolve) => {
        const loader = new THREE.TextureLoader();
        loader.setCrossOrigin('anonymous');
        loader.load(
          src,
          (t) => {
            t.minFilter = t.magFilter = THREE.LinearFilter;
            t.userData = {
              size: new THREE.Vector2(
                (t.image as HTMLImageElement)?.width || 1920,
                (t.image as HTMLImageElement)?.height || 1080
              ),
            };
            resolve(t);
          },
          undefined,
          () => {
            const canvas = document.createElement('canvas');
            canvas.width = 1920;
            canvas.height = 1080;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const grad = ctx.createLinearGradient(0, 0, 1920, 1080);
              grad.addColorStop(0, '#101010');
              grad.addColorStop(1, '#050505');
              ctx.fillStyle = grad;
              ctx.fillRect(0, 0, 1920, 1080);
            }
            const fallback = new THREE.CanvasTexture(canvas);
            fallback.userData = { size: new THREE.Vector2(1920, 1080) };
            resolve(fallback);
          }
        );
      });

    const initRenderer = async () => {
      if (isDisposed || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTexture1: { value: null },
          uTexture2: { value: null },
          uProgress: { value: 0 },
          uResolution: { value: new THREE.Vector2(width, height) },
          uTexture1Size: { value: new THREE.Vector2(1, 1) },
          uTexture2Size: { value: new THREE.Vector2(1, 1) },
          uEffectType: { value: 0 },
          uGlobalIntensity: { value: 1.0 },
          uSpeedMultiplier: { value: 1.0 },
          uDistortionStrength: { value: 1.0 },
          uColorEnhancement: { value: 1.0 },
          uGlassRefractionStrength: { value: 1.0 },
          uGlassChromaticAberration: { value: 1.0 },
          uGlassBubbleClarity: { value: 1.0 },
          uGlassEdgeGlow: { value: 1.0 },
          uGlassLiquidFlow: { value: 1.0 },
        },
        vertexShader,
        fragmentShader,
      });

      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

      const loaded = await Promise.all(slides.map((s) => loadImageTexture(s.media)));
      if (isDisposed) return;
      slideTextures = loaded;

      if (slideTextures.length >= 2) {
        shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
        shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
        shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
        shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
        texturesLoaded = true;
        sliderEnabled = true;

        containerRef.current?.classList.add("loaded");
        safeStartTimer(400);
      }

      const render = () => {
        if (isDisposed || !renderer || !scene || !camera) return;
        renderer.render(scene, camera);
        animFrameId = requestAnimationFrame(render);
      };
      render();
    };

    createSlidesNavigation();
    updateCounter(0);

    const tEl = document.getElementById('mainTitle');
    const dEl = document.getElementById('mainDesc');
    const locEl = document.getElementById('mainLocation');
    if (tEl && dEl) {
      tEl.innerHTML = splitText(slides[0].title);
      dEl.textContent = slides[0].description;
      if (locEl && slides[0].location) {
        locEl.textContent = `${slides[0].location} · ${slides[0].focus}`;
      }
      gsap.fromTo(tEl.children, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "power3.out", delay: 0.4 });
      gsap.fromTo(dEl, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.7 });
    }

    initRenderer();

    const handleResize = () => {
      if (renderer && shaderMaterial) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        shaderMaterial.uniforms.uResolution.value.set(w, h);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      stopAutoSlideTimer();
      window.removeEventListener("resize", handleResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (renderer) renderer.dispose();
      slideTextures.forEach((t) => t.dispose());
    };
  }, []);

  return (
    <main
      className="slider-wrapper fixed inset-0 w-screen h-screen overflow-hidden bg-[#0a0a0a] text-white z-50 select-none"
      ref={containerRef}
    >
      {/* Three.js Shader WebGL Canvas */}
      <canvas ref={canvasRef} className="webgl-canvas absolute inset-0 w-full h-full pointer-events-none" />

      {/* Floating Minimal Return Home Nav */}
      <div className="absolute top-6 sm:top-10 left-6 sm:left-12 z-30 flex items-center gap-6">
        <button
          onClick={() => navigate('/', true)}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/80 hover:text-white border border-white/10 hover:border-white/25 transition-all text-xs font-mono uppercase tracking-wider"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          <span>Home</span>
        </button>

        {/* Slide Counter Numbers */}
        <div className="flex items-baseline gap-1.5 font-mono">
          <span className="slide-number text-lg sm:text-2xl font-bold tracking-tight text-white" id="slideNumber">
            01
          </span>
          <span className="text-white/40 text-xs">/</span>
          <span className="slide-total text-xs sm:text-sm text-white/50" id="slideTotal">
            06
          </span>
        </div>
      </div>

      {/* Ambient Vignette for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none z-[5]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none z-[5]" />

      {/* Slide Typography & Information Content */}
      <div className="slide-content absolute bottom-28 sm:bottom-32 left-6 sm:left-12 right-6 sm:right-12 max-w-3xl z-20 pointer-events-none">
        <p
          id="mainLocation"
          className="text-xs sm:text-sm font-mono text-[#E5A06F] uppercase tracking-widest mb-3 opacity-90"
        >
          Mohuda, Berhampur, Odisha · Water Security & Rural Resilience
        </p>
        <h1
          className="slide-title text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-4 leading-[1.05]"
          id="mainTitle"
          style={{ fontFamily: 'var(--font-sans, "PP Neue Montreal", sans-serif)' }}
        ></h1>
        <p
          className="slide-description text-sm sm:text-base md:text-lg text-white/80 font-normal leading-relaxed max-w-2xl text-pretty"
          id="mainDesc"
        ></p>
      </div>

      {/* Bottom Interactive Navigation & Progress Track */}
      <nav
        className="slides-navigation absolute bottom-8 sm:bottom-10 inset-x-6 sm:inset-x-12 flex gap-3 sm:gap-6 z-30"
        id="slidesNav"
      ></nav>
    </main>
  );
}

export const LuminaInteractiveList = Component;
