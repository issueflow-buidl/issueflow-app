import { type ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
    { label: 'Bounties', href: '/bounties' },
    { label: 'Profile', href: '/profile' },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0f0f0f', color: '#fff' }}>
      <div style={{ width: '240px', backgroundColor: '#1a1a1a', padding: '24px 16px', borderRight: '1px solid #2d2d2d' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '32px', color: '#22c55e' }}>IssueFlow</h1>
        <nav>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} style={{ display: 'block', padding: '10px 12px', marginBottom: '4px', borderRadius: '6px', color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '60px', backgroundColor: '#1a1a1a', borderBottom: '1px solid #2d2d2d', display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between' }}>
          <span style={{ color: '#888', fontSize: '14px' }}>Welcome to IssueFlow</span>
          <button style={{ backgroundColor: '#22c55e', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>Connect Wallet</button>
        </div>
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}