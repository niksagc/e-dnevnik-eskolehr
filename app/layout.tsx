import type {Metadata} from 'next';
import './globals.css';
import {Sidebar} from '@/components/layout/Sidebar';
import {Topbar} from '@/components/layout/Topbar';

export const metadata: Metadata = {
  title: 'e-Dnevnik',
  description: 'Sustav za upravljanje školom',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="hr" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 text-gray-900" suppressHydrationWarning>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
