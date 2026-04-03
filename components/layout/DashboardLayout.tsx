'use client';
import {Sidebar} from '@/components/layout/Sidebar';
import {Topbar} from '@/components/layout/Topbar';
import {AuthWrapper} from '@/components/layout/AuthWrapper';
import {usePathname} from 'next/navigation';

export function DashboardLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <AuthWrapper>
      {isLoginPage ? (
        children
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      )}
    </AuthWrapper>
  );
}
