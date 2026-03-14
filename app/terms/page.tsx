import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — OhHoney.ai',
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using OhHoney.ai ("OhHoney", "the platform"), you agree to be bound by these Terms of Service and our Privacy Policy. These terms constitute a legally binding agreement between you and OhHoney.ai.

If you do not agree to these terms, you must not access or use OhHoney. We recommend reading them carefully before creating an account.`,
  },
  {
    title: '2. Eligibility',
    body: `OhHoney is available to individuals who are 18 years of age or older. By using OhHoney, you represent that you meet this requirement and that the information you provide during the membership application is accurate and truthful.

OhHoney is a curated platform. We reserve the right to decline or revoke membership at our discretion.`,
  },
  {
    title: '3. Membership & Access',
    body: `OhHoney offers several membership tiers: Free Trial, Member ($97/month), Pro ($497/month), and Team ($997/month for up to 5 seats). Custom White Glove engagements are available upon inquiry.

Your membership is personal and non-transferable. Sharing account credentials with others is prohibited and may result in account termination.

Free Trial access is limited to 3 days. We reserve the right to require identity verification before granting membership access.`,
  },
  {
    title: '4. Billing & Cancellation',
    body: `Paid memberships are billed monthly in advance. Your membership renews automatically unless cancelled before the renewal date.

To cancel your membership, navigate to your profile settings or contact support@ohhoney.ai. Cancellations take effect at the end of your current billing period. We do not provide prorated refunds for partial months.

Refunds are available within 72 hours of initial purchase for new members only. After 72 hours, no refunds are issued.`,
  },
  {
    title: '5. Intelligence Briefings & Deal Flow',
    body: `OhHoney intelligence briefings and deal access are provided for informational purposes only. Nothing on the platform constitutes financial, legal, medical, tax, or investment advice.

Deal terms, affiliate arrangements, and partner offers are subject to change without notice. OhHoney is not a party to transactions between members and deal partners.

Member deal access requires authentication. You acknowledge that deal benefits are contingent on your current membership tier and active subscription status.`,
  },
  {
    title: '6. Intellectual Property',
    body: `All content on OhHoney — including intelligence briefings, deal curation, design, copy, software, the OhHoney wordmark, and the "Intelligence Feels Good" tagline — is the exclusive intellectual property of OhHoney.ai.

You may not reproduce, republish, distribute, or use our content for commercial purposes without written permission. Your personal notes, tasks, and data created within OhHoney remain your property.`,
  },
  {
    title: '7. Prohibited Conduct',
    body: `You agree not to:

— Share, resell, or redistribute OhHoney content, briefings, or deal access
— Share your account credentials with any other person
— Attempt to circumvent any authentication, paywall, or security measure
— Use automated tools to scrape, crawl, or harvest OhHoney content
— Impersonate OhHoney or any of its members, staff, or partners
— Engage in any conduct that violates applicable law

Violations may result in immediate account termination without refund.`,
  },
  {
    title: '8. The OhHoney Intensive',
    body: `The OhHoney Intensive is a ticketed one-day live event at $1,800 per seat. Members in good standing receive a $300 reduction applied automatically at checkout.

Intensive tickets are non-transferable and non-refundable after the cancellation window closes (14 days prior to the event date). OhHoney reserves the right to reschedule or cancel an event due to unforeseen circumstances, in which case full refunds will be issued.`,
  },
  {
    title: '9. Disclaimers & Limitation of Liability',
    body: `OhHoney is provided "as is" and "as available." We make no warranties regarding the accuracy, completeness, or timeliness of intelligence content or deal availability.

To the fullest extent permitted by law, OhHoney shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform, reliance on intelligence content, or participation in a deal or event.

OhHoney's total liability for any claim shall not exceed the total amount you paid to OhHoney in the 3 months preceding the claim.`,
  },
  {
    title: '10. Governing Law',
    body: `These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association rules, unless prohibited by applicable law.`,
  },
  {
    title: '11. Modifications',
    body: `OhHoney reserves the right to update these Terms at any time. Material changes will be communicated via email or a notice within the platform at least 14 days before taking effect. Continued use of OhHoney after that period constitutes acceptance of the updated Terms.`,
  },
  {
    title: '12. Contact',
    body: `For questions about these Terms:

OhHoney.ai
legal@ohhoney.ai

For support: support@ohhoney.ai
For enterprise inquiries: enterprise@ohhoney.ai`,
  },
];

export default function TermsPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '64px 40px 120px' }}>
        <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 20 }}>Last updated March 14, 2026</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 300, fontStyle: 'italic', marginBottom: 16, lineHeight: 1.1 }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--mid-gray)', marginBottom: 48, lineHeight: 1.6 }}>
          Please read these terms carefully before using the OhHoney.ai platform. Questions? <Link href="/contact" style={{ color: 'var(--black)', textDecoration: 'underline' }}>Contact us</Link>.
        </p>

        {sections.map(sec => (
          <div key={sec.title} style={{ paddingBottom: 40, marginBottom: 40, borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: 13, fontWeight: 500, color: 'var(--black)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
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
