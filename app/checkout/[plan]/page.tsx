import CheckoutClient from './checkout-client';

export function generateStaticParams() {
  return [
    { plan: 'trial' },
    { plan: 'member' },
    { plan: 'pro' },
    { plan: 'team' },
    { plan: 'intensive' },
  ];
}

export default async function CheckoutPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params;
  return <CheckoutClient planKey={plan} />;
}
