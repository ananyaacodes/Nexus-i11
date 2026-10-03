import React, { useState } from 'react';
import { Trophy, Award, Sparkles } from 'lucide-react';
import ShatterableGlassCard from '../components/ui/shatterable-glass-card';

interface PrizeCategory {
  badge: string;
  category: string;
  title: string;
  reward: string;
  description: string;
  highlight: boolean;
  accentColor: string;
  icon: React.ReactNode;
  image: string;
  coverImage?: string;
  revealedTitle: string;
  revealedDescription: string;
  revealedPerks: string[];
}

export const Prizes: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  const prizeCategories: PrizeCategory[] = [
    {
      badge: '1ST PLACE • GRAND PRIZE',
      category: 'Top Honor',
      title: 'Winner',
      reward: 'Grand Trophy & Top Cash Pool',
      coverImage: '/prizes/card_1.png',
      description:
        'Awarded to the overall most impactful, viably engineered technical solution exhibiting exceptional architecture and execution.',
      highlight: true,
      accentColor: '#D97745',
      icon: <Trophy size={20} className="text-[#D97745]" />,
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      revealedTitle: 'Grand Champion Vault',
      revealedDescription:
        'Glass barrier shattered! Top cash pool, flagship trophy, and partner accelerator fast-track unlocked.',
      revealedPerks: [
        'Top cash grant from total pool',
        'Direct accelerator interview & incubator invite',
        'Dedicated cloud compute credits voucher',
        'Official Hack for Good 2025 Grand Trophy',
      ],
    },
    {
      badge: '2ND PLACE • RUNNER UP',
      category: 'Excellence',
      title: 'Runner Up',
      reward: 'Runner-Up Grant & Merit Citations',
      coverImage: '/prizes/card_2.png',
      description:
        'Recognizing extraordinary technical craft, clear problem definition, and high-performance implementation depth.',
      highlight: false,
      accentColor: '#E2E8F0',
      icon: <Award size={20} className="text-[#E2E8F0]" />,
      image:
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      revealedTitle: 'Excellence Grant Vault',
      revealedDescription:
        'Glass barrier shattered! Runner-up grant allocation and engineering mentorship unlocked.',
      revealedPerks: [
        'Runner-up grant allocation from sponsor pool',
        '1-on-1 architecture review with senior jury',
        'Cloud infrastructure compute credits',
        'Official Hack for Good Merit Certificate',
      ],
    },
    {
      badge: 'SPECIAL JURY CITATION',
      category: 'Special Award',
      title: 'Best Innovation',
      reward: 'Incubation Support & Sponsor Perks',
      coverImage: '/prizes/card_3.png',
      description:
        'Celebrating the most creative, unconventional, or visionary approach to tackling real-world community challenges.',
      highlight: false,
      accentColor: '#28C840',
      icon: <Sparkles size={20} className="text-[#28C840]" />,
      image:
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
      revealedTitle: 'Innovation Lab Vault',
      revealedDescription:
        'Glass barrier shattered! Incubation prototyping perks and sponsor hardware grant unlocked.',
      revealedPerks: [
        'Incubator prototyping and testing grant',
        'Direct hardware & API credits from sponsors',
        'Featured product demo showcase in demo day',
        'Special Innovation Jury Award Plaque',
      ],
    },
  ];

  return (
    <section
      id="prizes"
      className="relative w-full pt-[360px] sm:pt-[420px] md:pt-[460px] lg:pt-[500px] xl:pt-[540px] pb-16 sm:pb-24 border-b border-[rgba(241,238,231,0.12)] overflow-hidden bg-[#111315] transform-gpu"
    >
      {/* Full-Bleed Restored Artwork Background Layer */}
      {!imgError && (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat z-0 transform-gpu"
          style={{
            backgroundImage: "url('/prizes/prizef-1.png')",
            backgroundPosition: '25% center',
          }}
        >
          <img
            src="/prizes/prizef-1.png"
            alt="Hack for Good Prizes Artwork"
            className="hidden"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Atmospheric directional scrims for seamless section transitions without darkening the left wall */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#111315] via-[#111315]/60 to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#111315] via-[#111315]/60 to-transparent z-[1] pointer-events-none" />

      {/* Main Content: Shatterable Glass prize cards positioned in the lower plaza area below the background PRIZES artwork */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:pl-56 xl:pl-72 flex flex-col gap-8">
        {/* Interactive Shatterable Glass Prize Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {prizeCategories.map((item) => (
            <ShatterableGlassCard
              key={item.title}
              badge={item.badge}
              category={item.category}
              title={item.title}
              reward={item.reward}
              description={item.description}
              highlight={item.highlight}
              accentColor={item.accentColor}
              icon={item.icon}
              coverImage={item.coverImage}
              revealedTitle={item.revealedTitle}
              revealedDescription={item.revealedDescription}
              revealedPerks={item.revealedPerks}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

