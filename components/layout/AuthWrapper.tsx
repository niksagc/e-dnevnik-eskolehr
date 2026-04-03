'use client';
import {useEffect, useState} from 'react';
import {supabase} from '@/lib/supabase';
import {useRouter, usePathname} from 'next/navigation';

export function AuthWrapper({children}: {children: React.ReactNode}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      const {data: {session}} = await supabase.auth.getSession();
      if (!session && pathname !== '/login') {
        router.push('/login');
      }
      setLoading(false);
    };
    checkSession();
  }, [pathname, router]);

  if (loading) return <div>Učitavanje...</div>;
  return <>{children}</>;
}
