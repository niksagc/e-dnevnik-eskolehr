'use client';
import {useUserRole} from '@/hooks/useUserRole';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function AdminPage() {
  const {role, loading} = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role !== 'admin') {
      router.push('/');
    }
  }, [role, loading, router]);

  if (loading) return <div>Učitavanje...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-bold mb-2">Upravljanje korisnicima</h2>
          <p className="text-sm text-gray-600">Dodavanje i uređivanje korisnika.</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-bold mb-2">Upravljanje razredima</h2>
          <p className="text-sm text-gray-600">Kreiranje razreda i dodjela.</p>
        </div>
      </div>
    </div>
  );
}
