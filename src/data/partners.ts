import React from 'react';

export interface Partner {
  id: string;
  name: string;
  category: string;
  classification: string;
  tagline: string;
  description: string;
  contribution: string;
  website: string;
  accent: string;
  badge: string;
  founded: string;
  location: string;
  impactMetrics: {
    label: string;
    value: string;
  }[];
  socialLinks: {
    platform: string;
    handle: string;
    url: string;
  }[];
}

export const PARTNERS_DATA: Partner[] = [
  {
    id: 'verdant-labs',
    name: 'VERDANT LABS',
    category: 'Title Sustainability Partner',
    classification: 'TIER-01 // CLIMATE ECOSYSTEM',
    tagline: 'Planetary telemetry & carbon intelligence APIs',
    description:
      'Verdant Labs pioneers open-access environmental sensing protocols and high-resolution carbon tracking APIs for developers building for ecological resilience.',
    contribution:
      'Providing full API access to environmental datasets, 100+ hardware telemetry developer kits, and sponsoring the 10,000 INR Climate Track Prize.',
    website: 'https://verdantlabs.earth',
    accent: '#28C840',
    badge: 'CLIMATE / SENSORS',
    founded: '2021',
    location: 'Bangalore // Berlin',
    impactMetrics: [
      { label: 'Sensor Nodes', value: '42K+' },
      { label: 'Datasets', value: '180 TB' },
      { label: 'Grant Pool', value: '₹10,000' },
    ],
    socialLinks: [
      { platform: 'Twitter', handle: '@verdant_labs', url: 'https://twitter.com' },
      { platform: 'GitHub', handle: 'verdant-open', url: 'https://github.com' },
      { platform: 'Web', handle: 'verdantlabs.earth', url: 'https://verdantlabs.earth' },
    ],
  },
  {
    id: 'synthetix-ai',
    name: 'SYNTHETIX AI',
    category: 'Lead Machine Intelligence Partner',
    classification: 'TIER-01 // NEURAL INFRASTRUCTURE',
    tagline: 'High-throughput inference & agentic orchestration',
    description:
      'Synthetix designs zero-latency inference runtimes and multi-agent coordination frameworks tailored for community-first civic automation.',
    contribution:
      'Providing $5,000 in model inference credits per team, dedicated machine learning mentors on-site, and access to private multimodal embedding pipelines.',
    website: 'https://synthetix.ai',
    accent: '#FF2A85',
    badge: 'NEURAL COMPUTE',
    founded: '2022',
    location: 'San Francisco // Kochi',
    impactMetrics: [
      { label: 'Compute Credits', value: '$5,000/tm' },
      { label: 'On-site Mentors', value: '6 Engineers' },
      { label: 'Model Runtimes', value: '12 APIs' },
    ],
    socialLinks: [
      { platform: 'Twitter', handle: '@synthetix_ai', url: 'https://twitter.com' },
      { platform: 'GitHub', handle: 'synthetix-core', url: 'https://github.com' },
      { platform: 'Web', handle: 'synthetix.ai', url: 'https://synthetix.ai' },
    ],
  },
  {
    id: 'hyperion-cloud',
    name: 'HYPERION CLOUD',
    category: 'Core Infrastructure & DevOps Partner',
    classification: 'TIER-02 // SERVERLESS RUNTIMES',
    tagline: 'Distributed edge clusters & instant deployments',
    description:
      'Hyperion powers mission-critical edge computing with zero-config preview environments, distributed PostgreSQL databases, and automated SSL orchestration.',
    contribution:
      'Deploying unified staging clusters for all hackathon projects, offering free 1-year developer subscriptions to winning teams, and on-site devops support.',
    website: 'https://hyperion.cloud',
    accent: '#1F86F9',
    badge: 'EDGE PLATFORM',
    founded: '2019',
    location: 'Singapore // Chennai',
    impactMetrics: [
      { label: 'Deploy Latency', value: '<250ms' },
      { label: 'Free Tiers', value: '1-Year Full' },
      { label: 'Cluster Regions', value: '38 Edge' },
    ],
    socialLinks: [
      { platform: 'Twitter', handle: '@hyperion_edge', url: 'https://twitter.com' },
      { platform: 'GitHub', handle: 'hyperion-cloud', url: 'https://github.com' },
      { platform: 'Web', handle: 'hyperion.cloud', url: 'https://hyperion.cloud' },
    ],
  },
  {
    id: 'nexus-civic-dao',
    name: 'NEXUS CIVIC DAO',
    category: 'Community & Public Impact Partner',
    classification: 'TIER-02 // CIVIC ACCELERATOR',
    tagline: 'Connecting grassroot developers with municipal adoption',
    description:
      'A coalition of municipal leaders, technologists, and public health researchers dedicated to bringing student-engineered civic solutions into public service.',
    contribution:
      'Fast-track accelerator interviews for the top 3 teams, direct municipal deployment pilots in Kerala municipalities, and civic domain advisory.',
    website: 'https://nexuscivic.org',
    accent: '#FEBC2E',
    badge: 'MUNICIPAL ADOPTION',
    founded: '2020',
    location: 'Trivandrum // London',
    impactMetrics: [
      { label: 'Civic Pilots', value: '14 Cities' },
      { label: 'Follow-on Grants', value: '₹500K Pool' },
      { label: 'NGO Partners', value: '60+' },
    ],
    socialLinks: [
      { platform: 'Twitter', handle: '@nexus_civic', url: 'https://twitter.com' },
      { platform: 'GitHub', handle: 'nexus-civic', url: 'https://github.com' },
      { platform: 'Web', handle: 'nexuscivic.org', url: 'https://nexuscivic.org' },
    ],
  },
  {
    id: 'aura-hardware',
    name: 'AURA HARDWARE WORKS',
    category: 'Hardware & Embedded IoT Lab',
    classification: 'TIER-03 // PHYSICAL COMPUTING',
    tagline: 'Microcontrollers, rapid prototyping benches & fab lab',
    description:
      'Aura provides specialized embedded prototyping hardware, custom PCB rapid fabrication units, and sensor interfacing benches for physical computing builds.',
    contribution:
      'Setting up an on-campus hardware workbench equipped with ESP32 kits, logic analyzers, soldering stations, and 3D printers for immediate hacker access.',
    website: 'https://aurahardware.io',
    accent: '#A855F7',
    badge: 'FAB LAB ACCESS',
    founded: '2023',
    location: 'Thrissur // Hyderabad',
    impactMetrics: [
      { label: 'Bench Units', value: '25 Stations' },
      { label: '3D Printers', value: '4 High-Speed' },
      { label: 'Hardware Kits', value: '80+ Kits' },
    ],
    socialLinks: [
      { platform: 'Twitter', handle: '@aurahardware', url: 'https://twitter.com' },
      { platform: 'GitHub', handle: 'aura-hw', url: 'https://github.com' },
      { platform: 'Web', handle: 'aurahardware.io', url: 'https://aurahardware.io' },
    ],
  },
];
