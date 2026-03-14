// OhHoney.ai — Deals data layer
// Affiliate links are stored server-side only; clients receive display data.
// Category IDs match the 12 intelligence pillars.

export type DealTier = 'all' | 'member' | 'pro';

export interface Deal {
  id: string;
  category: string;
  categorySlug: string;
  title: string;
  description: string;
  terms: string;
  expiry: string;
  exclusive: boolean;
  tier: DealTier;
  affiliateLink: string; // stored server-side, never exposed to client
  published: boolean;
  createdBy: string; // admin email
  createdAt: string;
}

export const CATEGORIES = [
  { id: 'wealth',       label: 'Wealth Management & Investing' },
  { id: 'tax',          label: 'Tax Strategy & Estate Planning' },
  { id: 'travel',       label: 'Luxury Travel & Experiences' },
  { id: 'health',       label: 'Health Optimization & Longevity' },
  { id: 'beauty',       label: 'Beauty, Wellness & Aesthetic Medicine' },
  { id: 'realestate',   label: 'Real Estate & Property' },
  { id: 'business',     label: 'Entrepreneurship & Business Ownership' },
  { id: 'education',    label: 'Education Planning' },
  { id: 'philanthropy', label: 'Philanthropy & Impact Investing' },
  { id: 'security',     label: 'Personal Security & Privacy' },
  { id: 'interior',     label: 'Interior Design & Home Upgrades' },
  { id: 'fashion',      label: 'Fashion, Luxury & Personal Styling' },
];

// 36 deals — 3 per category
export const DEALS: Deal[] = [
  // ── Wealth Management (3) ───────────────────────────────────────
  { id: 'w1', category: 'Wealth Management & Investing', categorySlug: 'wealth', title: 'Vanguard Advisor Services — Priority Onboarding', description: 'Skip the waitlist. Members receive dedicated advisor assignment within 48 hours. Minimum: $100K AUM.', terms: 'Member priority · No cost to access', expiry: 'Ongoing', exclusive: true, tier: 'member', affiliateLink: 'https://partners.vanguard.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
  { id: 'w2', category: 'Wealth Management & Investing', categorySlug: 'wealth', title: 'Betterment Premium — 90-Day Fee Waiver', description: 'Automated investing with human advisor access. Members receive first 90 days fee-free.', terms: '0.40% AUM fee waived months 1–3', expiry: 'April 30, 2026', exclusive: false, tier: 'member', affiliateLink: 'https://betterment.com/aff/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
  { id: 'w3', category: 'Wealth Management & Investing', categorySlug: 'wealth', title: 'Private Equity Access via iCapital — Reduced Minimum', description: 'Access institutional-grade PE funds. Member minimum reduced from $250K to $100K through our partnership.', terms: 'Pro members only · Accredited investors', expiry: 'Rolling', exclusive: true, tier: 'pro', affiliateLink: 'https://icapital.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },

  // ── Tax & Estate (3) ────────────────────────────────────────────
  { id: 't1', category: 'Tax Strategy & Estate Planning', categorySlug: 'tax', title: 'Andersen Tax — Complimentary Strategy Session', description: 'A 60-minute strategy session with a senior advisor. Tax optimization, estate structure, and entity planning.', terms: 'Complimentary · $600 value', expiry: 'May 1, 2026', exclusive: true, tier: 'member', affiliateLink: 'https://andersen.com/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },
  { id: 't2', category: 'Tax Strategy & Estate Planning', categorySlug: 'tax', title: 'Estates & Trusts — Attorney Introductions', description: 'Our vetted network of estate attorneys. Members receive direct email introductions in their state.', terms: 'Member benefit · Introductory rates apply', expiry: 'Ongoing', exclusive: false, tier: 'member', affiliateLink: 'https://estates.ohhoney.ai/refer', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },
  { id: 't3', category: 'Tax Strategy & Estate Planning', categorySlug: 'tax', title: 'TaxAct Premium — Annual Plan 50% Off', description: 'For self-filers who want professional-grade software. Members receive 50% on annual plans.', terms: 'Code applied at checkout · Member only', expiry: 'March 31, 2026', exclusive: false, tier: 'all', affiliateLink: 'https://taxact.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },

  // ── Luxury Travel (3) ───────────────────────────────────────────
  { id: 'tr1', category: 'Luxury Travel & Experiences', categorySlug: 'travel', title: 'Aman Residences — Priority Suite Access', description: 'Member-only priority booking for Aman properties globally. Rate parity guaranteed and butler pre-assignment.', terms: 'Member rate · $3,200+/night', expiry: 'Closes March 31', exclusive: true, tier: 'pro', affiliateLink: 'https://aman.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
  { id: 'tr2', category: 'Luxury Travel & Experiences', categorySlug: 'travel', title: 'Eleven Experience — Private Guides', description: 'Remote adventure travel at ultra-premium lodges. Member access to guide-led private itineraries.', terms: 'From $1,800/night · Contact for rates', expiry: 'Summer 2026 only', exclusive: true, tier: 'pro', affiliateLink: 'https://elevenexp.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
  { id: 'tr3', category: 'Luxury Travel & Experiences', categorySlug: 'travel', title: 'Traveler\'s Joy — Honeymoon Registry Credit', description: '$200 credit toward any honeymoon or anniversary registry. No minimum spend.', terms: '$200 credit · All members', expiry: 'Ongoing', exclusive: false, tier: 'all', affiliateLink: 'https://travelersjoy.com/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },

  // ── Health & Longevity (3) ──────────────────────────────────────
  { id: 'h1', category: 'Health Optimization & Longevity', categorySlug: 'health', title: 'Lifeforce — First Month 50% Off', description: 'Science-backed optimization programs with lab testing and a dedicated physician. Member rate on first month.', terms: 'Member rate · From $149/month', expiry: 'April 15, 2026', exclusive: true, tier: 'member', affiliateLink: 'https://lifeforce.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
  { id: 'h2', category: 'Health Optimization & Longevity', categorySlug: 'health', title: 'Oura Ring — Members Save $50', description: 'Track sleep, recovery, and readiness. Pro members receive $50 off the Oura Ring 4.', terms: '$50 off Oura Ring 4 · Code at checkout', expiry: 'Ongoing', exclusive: false, tier: 'member', affiliateLink: 'https://ouraring.com/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },
  { id: 'h3', category: 'Health Optimization & Longevity', categorySlug: 'health', title: 'Six Senses — Longevity Immersion Program', description: 'Seven-day full-program assessment with Dr. Bland. September cohort via our member partnership.', terms: 'Member priority · $28,000', expiry: 'Cohort fills March 28', exclusive: true, tier: 'pro', affiliateLink: 'https://sixsenses.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },

  // ── Beauty & Aesthetics (3) ─────────────────────────────────────
  { id: 'b1', category: 'Beauty, Wellness & Aesthetic Medicine', categorySlug: 'beauty', title: 'Heyday — Monthly Facial Membership', description: 'Premium facial studio with personalized skincare. Members receive first facial free with monthly membership.', terms: 'First facial complimentary · $49/month after', expiry: 'Ongoing', exclusive: false, tier: 'all', affiliateLink: 'https://heyday.com/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },
  { id: 'b2', category: 'Beauty, Wellness & Aesthetic Medicine', categorySlug: 'beauty', title: 'Aedit — Aesthetic Consultation Credit', description: 'AI-powered aesthetic planning platform. Members receive a complimentary $200 consultation credit.', terms: '$200 credit · Members only', expiry: 'May 2026', exclusive: true, tier: 'member', affiliateLink: 'https://aedit.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
  { id: 'b3', category: 'Beauty, Wellness & Aesthetic Medicine', categorySlug: 'beauty', title: 'TULA Skincare — 25% Off Sitewide', description: 'Probiotic-powered skincare. Member code applies 25% off any purchase sitewide.', terms: '25% off · All members', expiry: 'Ongoing', exclusive: false, tier: 'all', affiliateLink: 'https://tula.com/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },

  // ── Real Estate (3) ─────────────────────────────────────────────
  { id: 're1', category: 'Real Estate & Property', categorySlug: 'realestate', title: 'Côte d\'Azur — Off-Market Villa Introduction', description: '4-bedroom villa, Eze-sur-Mer. Off-market introduction through our network. Commission restructure available.', terms: 'Off-market · €7.4M asking', expiry: 'Active', exclusive: true, tier: 'pro', affiliateLink: 'https://realestate.ohhoney.ai/eze', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
  { id: 're2', category: 'Real Estate & Property', categorySlug: 'realestate', title: 'Roofstock — $500 Property Credit', description: 'Passive real estate investing in single-family rentals. Members receive a $500 credit on first property.', terms: '$500 credit · Members · 1 per account', expiry: 'Ongoing', exclusive: false, tier: 'member', affiliateLink: 'https://roofstock.com/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },
  { id: 're3', category: 'Real Estate & Property', categorySlug: 'realestate', title: 'HomeLight — Top Agent Match Priority', description: 'Buy or sell with data-matched top agents in your market. Members receive priority matching and fee negotiation.', terms: 'Member priority · Free service', expiry: 'Ongoing', exclusive: false, tier: 'all', affiliateLink: 'https://homelight.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },

  // ── Business & Ownership (3) ────────────────────────────────────
  { id: 'biz1', category: 'Entrepreneurship & Business Ownership', categorySlug: 'business', title: 'Gusto — 3 Months Free Payroll', description: 'Full-service payroll, benefits, and HR. Members get 3 months free on any Gusto plan.', terms: '3 months free · Code at signup', expiry: 'June 2026', exclusive: false, tier: 'member', affiliateLink: 'https://gusto.com/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },
  { id: 'biz2', category: 'Entrepreneurship & Business Ownership', categorySlug: 'business', title: 'Notion — Pro Plan for Teams Free 6 Months', description: 'The operating system for founders. Members get 6 months of Notion Pro for their team.', terms: '6 months free · Up to 10 seats', expiry: 'Ongoing', exclusive: false, tier: 'member', affiliateLink: 'https://notion.so/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
  { id: 'biz3', category: 'Entrepreneurship & Business Ownership', categorySlug: 'business', title: 'EO — Entrepreneurs Organization Priority Review', description: 'Direct introduction to your regional EO chapter president. Member review waived.', terms: 'Pro members only · Introduction only', expiry: 'Ongoing', exclusive: true, tier: 'pro', affiliateLink: 'https://eonetwork.org/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },

  // ── Education (3) ───────────────────────────────────────────────
  { id: 'ed1', category: 'Education Planning', categorySlug: 'education', title: 'Fama — Private School Admissions Consulting', description: 'White-glove K-12 college consulting. Members receive a complimentary 90-minute strategy session.', terms: 'Complimentary first session · $800 value', expiry: 'Fall 2026 intake', exclusive: true, tier: 'member', affiliateLink: 'https://fama.consulting/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },
  { id: 'ed2', category: 'Education Planning', categorySlug: 'education', title: 'ScholarShare 529 — $100 Bonus Contribution', description: 'California\'s 529 college savings plan. Members receive a $100 state contribution match on first deposit.', terms: '$100 bonus · CA residents · First account', expiry: 'Ongoing', exclusive: false, tier: 'all', affiliateLink: 'https://scholarshare529.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
  { id: 'ed3', category: 'Education Planning', categorySlug: 'education', title: 'Ivy Coach — College Counseling Priority Access', description: 'The most elite college counseling firm in the country. Members receive priority scheduling and a one-hour strategy call.', terms: 'Priority scheduling · Member rate applies', expiry: 'Limited 2026 slots', exclusive: true, tier: 'pro', affiliateLink: 'https://ivycoach.com/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },

  // ── Philanthropy (3) ────────────────────────────────────────────
  { id: 'ph1', category: 'Philanthropy & Impact Investing', categorySlug: 'philanthropy', title: 'Donors Choose — 2x Matching on First Gift', description: 'Direct classroom giving, doubled. Members\' first gift matched 2:1 up to $500.', terms: '2:1 match · First gift · Up to $500', expiry: 'April 30, 2026', exclusive: false, tier: 'all', affiliateLink: 'https://donorschoose.org/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
  { id: 'ph2', category: 'Philanthropy & Impact Investing', categorySlug: 'philanthropy', title: 'Calvert Impact — Community Investment Notes', description: 'Community investment at scale. Minimum reduced to $5K for OhHoney members (normally $20K).', terms: 'Members · Minimum $5K · Fixed 4% return', expiry: 'Ongoing', exclusive: true, tier: 'member', affiliateLink: 'https://calvertimpact.org/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },
  { id: 'ph3', category: 'Philanthropy & Impact Investing', categorySlug: 'philanthropy', title: 'Rockefeller Philanthropy Advisors — Member Introduction', description: 'For members giving $1M+ annually. Direct introduction to an RPA advisor to structure your giving strategy.', terms: 'Pro members · $1M+ charitable giving', expiry: 'Rolling', exclusive: true, tier: 'pro', affiliateLink: 'https://rockpa.org/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },

  // ── Personal Security (3) ────────────────────────────────────────
  { id: 'sec1', category: 'Personal Security & Privacy', categorySlug: 'security', title: 'DeleteMe — Annual Plan 25% Off', description: 'Remove your personal data from 750+ data broker sites. Most trusted removal service available.', terms: '25% off annual plan · Code applied', expiry: 'Ongoing', exclusive: false, tier: 'all', affiliateLink: 'https://deleteme.com/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },
  { id: 'sec2', category: 'Personal Security & Privacy', categorySlug: 'security', title: 'Black Cloak — Executive Digital Security', description: 'Personal cybersecurity for executives and their families. Members receive a complimentary threat assessment.', terms: 'Complimentary assessment · $500 value', expiry: 'Q2 2026', exclusive: true, tier: 'pro', affiliateLink: 'https://blackcloak.io/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
  { id: 'sec3', category: 'Personal Security & Privacy', categorySlug: 'security', title: '1Password Families — 6 Months Free', description: 'Password management for you and your household. Members get 6 months free on Families plan.', terms: '6 months free · Up to 5 family members', expiry: 'Ongoing', exclusive: false, tier: 'member', affiliateLink: 'https://1password.com/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },

  // ── Interior Design & Home (3) ─────────────────────────────────
  { id: 'in1', category: 'Interior Design & Home Upgrades', categorySlug: 'interior', title: 'Decorilla — Design Package Upgrade Complimentary', description: 'Online interior design with award-winning designers. Members receive a free package upgrade (value: $600).', terms: 'Upgrade complimentary · All members', expiry: 'May 31, 2026', exclusive: false, tier: 'member', affiliateLink: 'https://decorilla.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
  { id: 'in2', category: 'Interior Design & Home Upgrades', categorySlug: 'interior', title: 'Serena & Lily — VIP Trade Discount', description: 'Coast-inspired home furnishings. Members receive trade pricing (15–20% off retail) across the full collection.', terms: '15–20% off · Members + Pro', expiry: 'Ongoing', exclusive: false, tier: 'member', affiliateLink: 'https://serenaandlily.com/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },
  { id: 'in3', category: 'Interior Design & Home Upgrades', categorySlug: 'interior', title: 'One Kings Lane — Concierge Design Intro', description: 'Luxury furniture and antiques. Pro members receive a personal design concierge introduction for large projects.', terms: 'Pro members · Concierge intro · By request', expiry: 'Ongoing', exclusive: true, tier: 'pro', affiliateLink: 'https://onekingslane.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },

  // ── Fashion & Styling (3) ───────────────────────────────────────
  { id: 'fa1', category: 'Fashion, Luxury & Personal Styling', categorySlug: 'fashion', title: 'Loro Piana — Private Atelier Visit, Milan', description: 'Access to the atelier floor during fashion week. Bespoke consultation with a senior stylist. One guest permitted.', terms: 'By application · No purchase required', expiry: 'Limited — 8 slots', exclusive: true, tier: 'pro', affiliateLink: 'https://loropiana.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
  { id: 'fa2', category: 'Fashion, Luxury & Personal Styling', categorySlug: 'fashion', title: 'Rent the Runway — Pro Plan First Month Free', description: 'Unlimited designer wear for your calendar. Members receive first month of the Pro plan at no cost.', terms: 'First month free · $144/month after', expiry: 'Ongoing', exclusive: false, tier: 'member', affiliateLink: 'https://renttherunway.com/ohhoney', published: true, createdBy: 'tracyhogan76@gmail.com', createdAt: '2026-03-01' },
  { id: 'fa3', category: 'Fashion, Luxury & Personal Styling', categorySlug: 'fashion', title: 'Stitch Fix — $50 Credit on First Delivery', description: 'Personal styling delivered to your door. Members receive a $50 credit on their first Stitch Fix shipment.', terms: '$50 credit · First delivery · New accounts', expiry: 'Ongoing', exclusive: false, tier: 'all', affiliateLink: 'https://stitchfix.com/ohhoney', published: true, createdBy: 'hellonolen@gmail.com', createdAt: '2026-03-01' },
];

// Client-safe version of a deal (no affiliate links)
export type PublicDeal = Omit<Deal, 'affiliateLink' | 'createdBy'>;

export function getPublicDeals(): PublicDeal[] {
  return DEALS.filter(d => d.published).map(({ affiliateLink: _, createdBy: __, ...rest }) => rest);
}

export function getDealById(id: string): Deal | undefined {
  return DEALS.find(d => d.id === id);
}

export function getDealsByCategory(slug: string): PublicDeal[] {
  return getPublicDeals().filter(d => d.categorySlug === slug);
}
