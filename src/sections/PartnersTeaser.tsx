import React from 'react';
import { CircularGallery, GalleryItem } from '../components/ui/circular-gallery';
import { useRouter } from '../lib/router';
import { ArrowRight, Sparkles } from 'lucide-react';

const NGO_GALLERY_ITEMS: GalleryItem[] = [
  {
    common: 'Gram Vikas',
    binomial: 'Water & Rural Resilience',
    photo: {
      url: '/ngoi/ngo.png',
      text: 'Sustainable water systems and community resilience across indigenous villages in Odisha.',
      by: 'Mohuda, Odisha',
    },
  },
  {
    common: 'Bakul Foundation',
    binomial: 'Education & Open Libraries',
    photo: {
      url: '/ngoi/ngo1.png',
      text: 'Volunteer-driven children libraries, tree campaigns, and youth civic engagement.',
      by: 'Bhubaneswar, Odisha',
    },
  },
  {
    common: 'Goonj India',
    binomial: 'Rural Infrastructure & Relief',
    photo: {
      url: '/ngoi/ngo2.png',
      text: 'Turning urban surplus into currency for village development and disaster rehabilitation.',
      by: 'Pan-India & Odisha',
    },
  },
  {
    common: 'KISS Foundation',
    binomial: 'Indigenous Tribal Education',
    photo: {
      url: '/ngoi/ngo3.jpeg',
      text: 'Free residential schooling, healthcare, nutrition, and STEM education for 30,000+ students.',
      by: 'Bhubaneswar, Odisha',
    },
  },
  {
    common: 'Pratham Education',
    binomial: 'Foundational Literacy & EdTech',
    photo: {
      url: '/ngoi/ngo4.png',
      text: 'Grassroots learning kits, digital tablet hubs, and community volunteer mentorship.',
      by: 'Pan-India Initiative',
    },
  },
  {
    common: 'Wildlife Society of Odisha',
    binomial: 'Chilika Lake & Ecology',
    photo: {
      url: '/ngoi/ngo6.png',
      text: 'Preserving Odisha biodiversity, protecting Irrawaddy dolphins and elephant corridors.',
      by: 'Chilika & Cuttack',
    },
  },
];

export const PartnersTeaser: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section
      id="partners-teaser"
      className="relative w-full py-20 sm:py-28 lg:py-32 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/ngoi/ngobg.png')",
      }}
    >
      {/* Seamless transition gradients at top & bottom so it flows effortlessly into adjacent sections */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#111315] via-[#111315]/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#111315] via-[#111315]/50 to-transparent pointer-events-none" />

      {/* Content grid - fully seamless without boxed container lines */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* LEFT COLUMN: Editorial Heading & Message */}
        <div className="lg:col-span-5 flex flex-col items-start justify-center">
          {/* Small section label */}
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#FF2A85] tracking-widest uppercase mb-4 px-3 py-1 rounded bg-black/40 border border-[#FF2A85]/30 backdrop-blur-md shadow-lg">
            <Sparkles size={12} className="text-[#FF2A85] animate-pulse" />
            <span>01 / PARTNERS</span>
          </div>

          {/* Large heading with crisp drop-shadow */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#F1EEE7] font-display uppercase tracking-tight leading-[0.92] text-balance drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            BUILT WITH<br />
            <span className="text-[#F1EEE7] drop-shadow-md">THE RIGHT</span><br />
            <span className="text-[#FF2A85] drop-shadow-[0_0_30px_rgba(255,42,133,0.55)]">
              PEOPLE.
            </span>
          </h2>

          {/* Supporting paragraph with high contrast */}
          <p className="mt-5 text-sm sm:text-base text-[#D4D5D0] leading-relaxed max-w-md font-normal text-pretty drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Hack for Good is powered by the people, communities, and organisations that believe in turning bold ideas into meaningful impact.
          </p>

          {/* Handwritten Note + Physical Label CTA Sticker */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-white/10 w-full flex flex-col items-start">
            <span className="font-marker text-xs sm:text-sm text-[#FFB085] tracking-wide mb-3 -rotate-1 select-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              LIKE WHAT YOU SEE?
            </span>

            {/* Physical Label / Sticker CTA */}
            <button
              onClick={() => navigate('/partners', true)}
              className="group relative inline-flex items-center gap-3 px-6 py-3.5 bg-[#171A1D]/90 hover:bg-[#202428] text-[#F1EEE7] rounded-sm font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border border-[rgba(241,238,231,0.25)] transition-all duration-200 shadow-[3px_3px_0px_#FF2A85] hover:shadow-[5px_5px_0px_#FF2A85] hover:translate-x-1 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 backdrop-blur-md"
              style={{
                clipPath:
                  'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)',
              }}
            >
              <span className="relative z-10 text-[#F1EEE7] group-hover:text-white transition-colors">
                WANT TO KNOW MORE?
              </span>
              <ArrowRight
                size={16}
                className="text-[#FF2A85] transition-transform duration-200 group-hover:translate-x-1.5"
              />
              {/* Subtle neon highlight stripe */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF2A85] via-[#28C840] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
            </button>
            <span className="mt-2.5 text-[10px] font-mono text-[#A0A49E] uppercase tracking-wider drop-shadow">
              // SCROLL OVER OR DRAG CAROUSEL TO SPIN //
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Circular Gallery Showcase */}
        <div className="lg:col-span-7 relative w-full h-[480px] sm:h-[540px] md:h-[600px] flex items-center justify-center">
          {/* 3D Circular Gallery floating seamlessly on background */}
          <CircularGallery
            items={NGO_GALLERY_ITEMS}
            radius={380}
            autoRotateSpeed={0.035}
            cardWidth={240}
            cardHeight={330}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};
