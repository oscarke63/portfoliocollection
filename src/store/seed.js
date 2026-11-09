/**
 * Seed content for the agency site. This is the default dataset the store
 * boots from on first load. Everything here is editable from the Studio.
 */

export const seedAgency = {
  name: 'Northlight Studio',
  initials: 'NL',
  tagline: 'We design brands and digital products that move people.',
  intro:
    'Northlight is an independent creative agency working at the intersection of brand, product, and technology. We partner with ambitious teams to turn ideas into experiences people remember.',
  about:
    'Founded in 2016, Northlight Studio is a small, senior team of designers, engineers, and strategists. We believe great work comes from close collaboration and a refusal to settle for the obvious. From brand identity to shipped product, we own the whole arc of the work.',
  location: 'Nairobi · London · Remote',
  email: 'hello@northlight.studio',
  phone: '+254 700 000 000',
  founded: 2016,
  availability: 'Booking projects for Q3',
  socials: [
    { label: 'Instagram', url: 'https://instagram.com/example', handle: '@northlight' },
    { label: 'LinkedIn', url: 'https://linkedin.com/company/example', handle: 'northlight-studio' },
    { label: 'Behance', url: 'https://behance.net/example', handle: 'northlight' },
    { label: 'Dribbble', url: 'https://dribbble.com/example', handle: 'northlight' },
  ],
  services: [
    {
      title: 'Brand Identity',
      description:
        'Naming, visual systems, and guidelines that give a brand a clear, ownable point of view.',
    },
    {
      title: 'Digital Product',
      description:
        'Web and mobile products designed and built end to end — from prototype to production.',
    },
    {
      title: 'Web Design & Build',
      description:
        'Fast, accessible marketing sites and platforms with motion and craft baked in.',
    },
    {
      title: 'Strategy & Research',
      description:
        'Positioning, audience research, and roadmaps that ground creative decisions in evidence.',
    },
  ],
  team: [
    { name: 'Amara Okafor', role: 'Founder & Creative Director' },
    { name: 'Leo Martins', role: 'Design Lead' },
    { name: 'Priya Nair', role: 'Engineering Lead' },
    { name: 'Sam Whitfield', role: 'Strategy Director' },
  ],
  stats: [
    { label: 'Projects delivered', value: '120+' },
    { label: 'Years in business', value: '9' },
    { label: 'Client retention', value: '92%' },
    { label: 'Awards won', value: '18' },
  ],
  toolGroups: [
    {
      group: 'Design',
      tools: [
        { name: 'Figma', description: 'Interface design, prototyping, and design systems.' },
        { name: 'Adobe Illustrator', description: 'Identity, iconography, and vector craft.' },
        { name: 'After Effects', description: 'Motion design and brand animation.' },
        { name: 'Blender', description: '3D visuals and product renders.' },
      ],
    },
    {
      group: 'Build',
      tools: [
        { name: 'React', description: 'Component-driven web interfaces.' },
        { name: 'Next.js', description: 'Fast, SEO-friendly production sites.' },
        { name: 'TypeScript', description: 'Type-safe, maintainable codebases.' },
        { name: 'Tailwind CSS', description: 'Utility-first styling at speed.' },
      ],
    },
    {
      group: 'Collaborate',
      tools: [
        { name: 'Notion', description: 'Docs, briefs, and project wikis.' },
        { name: 'Linear', description: 'Issue tracking and sprint planning.' },
        { name: 'Slack', description: 'Day-to-day client communication.' },
        { name: 'Loom', description: 'Async video walkthroughs and reviews.' },
      ],
    },
  ],
  resources: [
    {
      title: 'Brand Strategy Workbook',
      description: 'A fill-in-the-blanks template we use to align teams before design begins.',
      type: 'Template',
      url: 'https://example.com/resources/brand-strategy',
    },
    {
      title: 'Design System Starter Kit',
      description: 'Tokens, component patterns, and documentation scaffolding to bootstrap a system.',
      type: 'Kit',
      url: 'https://example.com/resources/design-system',
    },
    {
      title: 'Project Kickoff Checklist',
      description: 'Everything to confirm before a project starts — scope, access, and success metrics.',
      type: 'Checklist',
      url: 'https://example.com/resources/kickoff',
    },
    {
      title: 'Accessibility Field Guide',
      description: 'Practical WCAG checks we run on every build, written for designers and devs.',
      type: 'Guide',
      url: 'https://example.com/resources/accessibility',
    },
  ],
}

export const seedProjects = [
  {
    id: 'lumen-festival',
    title: 'Lumen Festival',
    client: 'Lumen Arts Trust',
    tagline: 'A living identity for a city-wide light festival',
    description:
      'A generative brand system for a ten-day light festival. The identity reacts to real-time weather and footfall data, shifting color and motion across screens, wayfinding, and social.',
    category: 'Brand Identity',
    year: 2024,
    services: ['Brand Identity', 'Motion', 'Web Design'],
    cover: '#5b4bff',
    featured: true,
    published: true,
    links: { live: 'https://example.com/lumen', caseStudy: null },
    highlights: [
      'Built a generative logo engine that produces a unique mark for every event night.',
      'Designed a wayfinding system spanning 40 physical locations.',
      'Festival site drew 210k visitors in ten days.',
    ],
  },
  {
    id: 'verdant',
    title: 'Verdant',
    client: 'Verdant Foods',
    tagline: 'E-commerce platform for a plant-based grocer',
    description:
      'A headless commerce experience for a fast-growing plant-based grocery brand. We rebuilt the storefront for speed, added a subscription engine, and designed a packaging system that scales.',
    category: 'Digital Product',
    year: 2024,
    services: ['Digital Product', 'Web Design & Build', 'Strategy'],
    cover: '#16a34a',
    featured: true,
    published: true,
    links: { live: 'https://example.com/verdant', caseStudy: null },
    highlights: [
      'Cut checkout abandonment by 34% with a redesigned flow.',
      'Subscription engine now drives 41% of revenue.',
      'Lighthouse performance score of 98 on mobile.',
    ],
  },
  {
    id: 'atlas-finance',
    title: 'Atlas Finance',
    client: 'Atlas Bank',
    tagline: 'Rebuilding trust in everyday banking',
    description:
      'A ground-up redesign of a retail banking app used by 2M customers. We simplified navigation, introduced a clear money-movement model, and shipped a design system the in-house team now owns.',
    category: 'Digital Product',
    year: 2023,
    services: ['Digital Product', 'Strategy & Research'],
    cover: '#0ea5e9',
    featured: true,
    published: true,
    links: { live: null, caseStudy: 'https://example.com/atlas-case' },
    highlights: [
      'Task completion for transfers rose from 71% to 94% in testing.',
      'Shipped a 90-component design system adopted across 6 squads.',
      'App store rating climbed from 3.1 to 4.6 stars.',
    ],
  },
  {
    id: 'meridian',
    title: 'Meridian',
    client: 'Meridian Architecture',
    tagline: 'A portfolio site for a boutique architecture firm',
    description:
      'An editorial, image-forward website for an architecture practice. Built around a flexible CMS so the studio can publish new projects without touching code.',
    category: 'Web Design & Build',
    year: 2023,
    services: ['Web Design & Build'],
    cover: '#a855f7',
    featured: false,
    published: true,
    links: { live: 'https://example.com/meridian', caseStudy: null },
    highlights: [
      'Custom CMS lets the studio publish a project in under five minutes.',
      'Full-bleed galleries with lazy-loaded, responsive imagery.',
      'Won a regional design award for digital craft.',
    ],
  },
  {
    id: 'pulse',
    title: 'Pulse',
    client: 'Pulse Health',
    tagline: 'A wellness app that people actually stick with',
    description:
      'A habit-forming wellness companion combining coaching, tracking, and community. We led product strategy, design, and the initial build.',
    category: 'Digital Product',
    year: 2022,
    services: ['Digital Product', 'Strategy & Research', 'Brand Identity'],
    cover: '#f43f5e',
    featured: false,
    published: true,
    links: { live: 'https://example.com/pulse', caseStudy: null },
    highlights: [
      'Day-30 retention doubled versus the previous app.',
      'Onboarding completion reached 88%.',
      'Launched on iOS and Android simultaneously.',
    ],
  },
  {
    id: 'northwind',
    title: 'Northwind Rebrand',
    client: 'Northwind Logistics',
    tagline: 'Modernizing a 40-year-old logistics brand',
    description:
      'A full rebrand for a legacy logistics company — new name architecture, visual identity, fleet livery, and a refreshed digital presence.',
    category: 'Brand Identity',
    year: 2022,
    services: ['Brand Identity', 'Web Design & Build'],
    cover: '#f59e0b',
    featured: false,
    published: true,
    links: { live: null, caseStudy: 'https://example.com/northwind-case' },
    highlights: [
      'Unified 12 sub-brands under one clear architecture.',
      'Rolled out livery across a 300-vehicle fleet.',
      'Brand recall up 27% in post-launch research.',
    ],
  },
]

export const seedContent = {
  agency: seedAgency,
  projects: seedProjects,
}
