import Nav from '@/components/Nav';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <div style={{ paddingTop: '72px' }}>{children}</div>
    </>
  );
}
