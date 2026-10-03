import React from 'react';
import { InfiniteMovingCards } from '../components/ui/infinite-moving-cards';
import { Sparkles } from 'lucide-react';

const TIMELINE_EVENTS = [
  {
    stage: 'PHASE 01',
    date: '05 FEB 2026',
    title: 'REGISTRATIONS OPEN',
    name: 'Team formation & track selections initiate',
    quote:
      'Portal goes live for student developers, designers, and innovators across all colleges. Form multidisciplinary squads of 2–4 members and lock in your focus domain.',
    image: '/timeline/idcomp.png',
    status: 'COMPLETED',
    accent: '#FF2A85',
  },
  {
    stage: 'PHASE 02',
    date: '20 FEB 2026',
    title: 'REGISTRATIONS CLOSE',
    name: 'Submission deadline for entries & abstracts',
    quote:
      'Final deadline for team registration and submission of proposed solution abstracts. All project profiles are locked for jury review and evaluation.',
    image: '/timeline/papc.png',
    status: 'UPCOMING',
    accent: '#FEBC2E',
  },
  {
    stage: 'PHASE 03',
    date: '22 FEB 2026',
    title: 'SHORTLISTING ANNOUNCEMENT',
    name: 'Top finalist teams selected for offline sprint',
    quote:
      'Technical review committee shortlists the most promising teams across all five tracks. Selected teams receive invitations and physical venue credentials.',
    image: '/timeline/illuscomp.png',
    status: 'UPCOMING',
    accent: '#1F86F9',
  },
  {
    stage: 'PHASE 04',
    date: '28 FEB 2026',
    title: 'HACKATHON BEGINS',
    name: '12 hours of relentless prototyping & mentorship',
    quote:
      'Check-in at Christ College of Engineering campus. Opening ceremony, keynote briefings, and the clock starts for 12 hours of continuous collaborative engineering.',
    image: '/timeline/lapcomp.png',
    status: 'MAIN EVENT',
    accent: '#FF2A85',
  },
  {
    stage: 'PHASE 05',
    date: '29 FEB 2026',
    title: 'GRAND FINALE & AWARDS',
    name: 'Live prototype demos, jury scoring, 20K prizes',
    quote:
      'Final code freeze and pitching round before a distinguished jury. Prototype evaluations, track-winner felicitations, and celebration of impactful builds.',
    image: '/timeline/tcomp.png',
    status: 'SHOWCASE',
    accent: '#28C840',
  },
];

export const Timeline: React.FC = () => {
  return (
    <section
      id="timeline"
      className="relative w-full py-20 sm:py-28 lg:py-32 overflow-hidden bg-cover bg-center bg-no-repeat transform-gpu"
      style={{
        backgroundImage: "url('/timeline/timebg.png')",
      }}
    >
      {/* Soft natural edge fades for seamless flow into adjacent sections */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#111315] via-[#111315]/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#111315] via-[#111315]/50 to-transparent pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#FF2A85] tracking-widest uppercase mb-3.5 px-3 py-1 rounded-full bg-black/50 border border-[#FF2A85]/30 backdrop-blur-md shadow-lg">
          <Sparkles size={13} className="text-[#FF2A85] animate-pulse" />
          <span>03 / EVENT TIMELINE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#F1EEE7] font-display uppercase tracking-tight text-balance leading-[0.95] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
          YOUR JOURNEY AT<br />
          <span className="text-[#FF2A85] drop-shadow-[0_0_30px_rgba(255,42,133,0.5)]">
            HACK FOR GOOD.
          </span>
        </h2>

        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#D4D5D0] max-w-xl text-balance leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          From registrations and team formation to the 12-hour high-impact prototype build sprint and grand finale.
        </p>
      </div>

      {/* Infinite Moving Cards Carousel - Seamless Full-Bleed Scroller */}
      <div className="relative z-10 w-full overflow-hidden">
        <InfiniteMovingCards
          items={TIMELINE_EVENTS}
          direction="left"
          speed="normal"
          pauseOnHover={false}
          className="py-4"
        />
      </div>
    </section>
  );
};
