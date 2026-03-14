import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — OhHoney.ai',
};

const sections = [
  {
    title: 'Overview',
    body: `OhHoney.ai ("OhHoney", "we", "our") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and protect information about you when you use the OhHoney platform and related services.

By creating an account or using OhHoney, you agree to this Privacy Policy. If you do not agree, please do not use our services.`,
  },
  {
    title: 'Information We Collect',
    body: `We collect the following categories of information:

Membership information: When you apply for or purchase a membership, we collect your name, email address, and payment information. Payment processing is handled by our payment processor; OhHoney does not store full card numbers.

Usage data: We collect data about how you use the platform — pages visited, features used, intelligence briefings read, and deals accessed. This helps us improve the product and curate your experience.

Communications: If you contact our support team or submit a note through the platform, we retain that communication.

Device and browser information: Standard technical data including browser type, operating system, IP address, and access timestamps.`,
  },
  {
    title: 'How We Use Your Information',
    body: `We use your information to:

— Provide and improve the OhHoney platform and services
— Curate intelligence briefings, deal flow, and recommendations relevant to you
— Communicate with you about your membership, events, and platform updates
— Process payments and prevent fraud
— Comply with legal obligations

We do not use your data for advertising. We do not sell your data. Ever.`,
  },
  {
    title: 'Intelligence & Notes Privacy',
    body: `Your notes, tasks, calendar entries, inbox, and graph data are strictly private. OhHoney staff cannot read your personal notes or communications unless you explicitly share them or we are required to by law.

Intelligence briefings you receive are curated to your tier. We may use aggregated, anonymized engagement data to improve briefing quality — but this is never tied to your identity.`,
  },
  {
    title: 'Sharing of Information',
    body: `OhHoney does not sell, rent, or trade your personal information to third parties.

We share information only in these circumstances:

Service providers: We work with payment processors, cloud infrastructure, and analytics providers who are contractually obligated to protect your data.

Deal partners: When you redeem a deal through OhHoney, the partner may receive your name and email to fulfill the offer. This will always be disclosed at the point of access.

Legal compliance: We may disclose information if required by law, court order, or to protect the safety of our members or the public.`,
  },
  {
    title: 'Data Retention',
    body: `We retain your data for as long as your account is active or as needed to provide services. If you cancel your membership, we retain your account data for 12 months before permanent deletion, unless you request earlier deletion.

To request account deletion, contact us at privacy@ohhoney.ai.`,
  },
  {
    title: 'Security',
    body: `OhHoney uses industry-standard security measures including encrypted data transmission (TLS), encrypted storage, and strict access controls. We conduct regular security reviews.

No system is completely immune to risk. We encourage you to use a strong, unique password and enable two-factor authentication on your account.`,
  },
  {
    title: 'Cookies',
    body: `OhHoney uses functional cookies necessary to maintain your session and preferences. We do not use advertising or tracking cookies. You can manage browser cookies in your browser settings, though disabling functional cookies may affect platform functionality.`,
  },
  {
    title: 'Your Rights',
    body: `Depending on your jurisdiction, you may have the right to:

— Access the personal data we hold about you
— Request correction of inaccurate data
— Request deletion of your account and personal data
— Object to or restrict certain processing
— Request data portability

To exercise any of these rights, contact us at privacy@ohhoney.ai. We will respond within 30 days.`,
  },
  {
    title: 'Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. Material changes will be communicated via email or a notice within the platform. Your continued use of OhHoney after changes constitutes acceptance of the revised policy.`,
  },
  {
    title: 'Contact',
    body: `For privacy-related questions or requests:

OhHoney.ai
privacy@ohhoney.ai

For general support: support@ohhoney.ai
For enterprise inquiries: enterprise@ohhoney.ai`,
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '64px 40px 120px' }}>
        <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 20 }}>Last updated March 14, 2026</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 300, fontStyle: 'italic', marginBottom: 48, lineHeight: 1.1 }}>
          Privacy Policy
        </h1>

        {sections.map(sec => (
          <div key={sec.title} style={{ paddingBottom: 40, marginBottom: 40, borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: 14, fontWeight: 500, color: 'var(--black)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>
              {sec.title}
            </h2>
            {sec.body.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: 13, fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.8, marginBottom: 16 }}>
                {para}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
