'use client';
import { useState } from 'react';
import Link from 'next/link';

type Step = 'plan' | 'details' | 'payment' | 'confirm';

const PLANS = {
  trial:     { name: 'Free Trial',         price: 0,    period: '3 days free',   whopPlanId: '' },
  member:    { name: 'Member',             price: 97,   period: 'per month',     whopPlanId: '' },
  pro:       { name: 'Pro',               price: 497,  period: 'per month',     whopPlanId: '' },
  team:      { name: 'Team',              price: 997,  period: 'per month',     whopPlanId: '' },
  intensive: { name: 'OhHoney Intensive', price: 1800, period: 'one-time',      whopPlanId: '' },
};

export type PlanKey = keyof typeof PLANS;

export default function CheckoutClient({ planKey }: { planKey: string }) {
  const key = planKey as PlanKey;
  const plan = PLANS[key] ?? PLANS.member;
  const [step, setStep] = useState<Step>('details');
  const [form, setForm] = useState({ name: '', email: '', card: '', expiry: '', cvc: '' });
  const isFree = plan.price === 0;

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--white)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 40px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: '1px solid var(--border)' }}>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 12 }}>Checkout</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 300, fontStyle: 'italic' }}>
            {plan.name}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64 }}>
          {/* Left — form */}
          <div>
            {/* Step progress */}
            <div style={{ display: 'flex', gap: 32, marginBottom: 40, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
              {(['details', 'payment', 'confirm'] as Step[]).filter(s => !isFree || s !== 'payment').map((s, i) => {
                const steps: Step[] = isFree ? ['details', 'confirm'] : ['details', 'payment', 'confirm'];
                const idx = steps.indexOf(s);
                const cur = steps.indexOf(step);
                return (
                  <button key={s} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 11, fontWeight: step === s ? 500 : 300,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: idx <= cur ? 'var(--black)' : 'var(--mid-gray)',
                    paddingBottom: 12,
                    borderBottom: step === s ? '1px solid var(--black)' : '1px solid transparent',
                    marginBottom: -1,
                  }}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                );
              })}
            </div>

            {step === 'details' && (
              <div>
                <div style={{ marginBottom: 28 }}>
                  <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Full name</label>
                  <input className="input" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Your full name" />
                </div>
                <div style={{ marginBottom: 40 }}>
                  <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Email address</label>
                  <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="you@example.com" />
                </div>
                <button onClick={() => setStep(isFree ? 'confirm' : 'payment')} className="btn btn-primary">
                  {isFree ? 'Activate free trial' : 'Continue to payment'}
                </button>
              </div>
            )}

            {step === 'payment' && !isFree && (
              <div>
                <p style={{ fontSize: 12, fontWeight: 300, color: 'var(--mid-gray)', marginBottom: 28, lineHeight: 1.6 }}>
                  Your payment is processed securely. We do not store card details.
                </p>
                <div style={{ marginBottom: 28 }}>
                  <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Card number</label>
                  <input className="input" value={form.card} onChange={e => setForm(f => ({...f, card: e.target.value}))} placeholder="•••• •••• •••• ••••" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
                  <div>
                    <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Expiry</label>
                    <input className="input" value={form.expiry} onChange={e => setForm(f => ({...f, expiry: e.target.value}))} placeholder="MM / YY" />
                  </div>
                  <div>
                    <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>CVC</label>
                    <input className="input" value={form.cvc} onChange={e => setForm(f => ({...f, cvc: e.target.value}))} placeholder="•••" />
                  </div>
                </div>
                <button onClick={() => setStep('confirm')} className="btn btn-primary">
                  {`Pay $${plan.price} — ${plan.name}`}
                </button>
                <p style={{ fontSize: 10, fontWeight: 300, color: 'var(--mid-gray)', marginTop: 16, lineHeight: 1.6 }}>
                  By continuing you agree to our Terms. Billing powered by a secure payment processor. Cancel anytime.
                </p>
              </div>
            )}

            {step === 'confirm' && (
              <div style={{ paddingTop: 20 }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 300, fontStyle: 'italic', marginBottom: 20 }}>
                  {isFree ? 'Your trial is active.' : 'Welcome to OhHoney.'}
                </p>
                <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.7, marginBottom: 32 }}>
                  {isFree
                    ? 'Your 3-day free trial has been activated. Explore the full platform — no card required.'
                    : `Your ${plan.name} membership is confirmed. You will receive an onboarding email within minutes.`
                  }
                </p>
                <Link href="/dashboard" className="btn btn-primary">Go to dashboard</Link>
              </div>
            )}
          </div>

          {/* Right — order summary */}
          <div>
            <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 20 }}>Order summary</p>
            <div style={{ background: 'var(--off-white)', padding: '28px 24px' }}>
              <div style={{ paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontSize: 13, fontWeight: 400, color: 'var(--black)', marginBottom: 4 }}>{plan.name}</p>
                <p style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)' }}>{plan.period}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 300, color: 'var(--dark-gray)' }}>Subtotal</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 300, color: 'var(--black)' }}>{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
              </div>
              {plan.price > 0 && (
                <p style={{ fontSize: 10, fontWeight: 300, color: 'var(--mid-gray)', marginTop: 8, lineHeight: 1.5 }}>
                  Cancel at any time. No contracts.
                </p>
              )}
            </div>
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', lineHeight: 1.7 }}>
                Need help? <a href="mailto:support@ohhoney.ai" style={{ color: 'var(--black)', textDecoration: 'underline' }}>support@ohhoney.ai</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
