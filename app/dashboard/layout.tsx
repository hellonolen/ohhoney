import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardTopbar from '@/components/DashboardTopbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <DashboardSidebar />
      <div className="main" style={{ display: 'flex', flexDirection: 'column' }}>
        <DashboardTopbar />
        <div style={{ flex: 1, padding: '48px 56px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
