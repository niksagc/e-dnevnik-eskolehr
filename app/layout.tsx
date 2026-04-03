import type {Metadata} from 'next';
import './globals.css';
import {DashboardLayout} from '@/components/layout/DashboardLayout';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'e-Dnevnik',
  description: 'Sustav za upravljanje školom',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="hr" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen bg-gray-50 text-gray-900" suppressHydrationWarning>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
