'use client';
import {useEffect, useState} from 'react';
import {supabase} from '@/lib/supabase';
import {useUserRole} from '@/hooks/useUserRole';
import {useRouter} from 'next/navigation';

type Korisnik = {
  id: string;
  email: string;
  uloga: string;
};

export default function KorisniciPage() {
  const [korisnici, setKorisnici] = useState<Korisnik[]>([]);
  const {role, loading} = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role !== 'admin') {
      router.push('/');
    }
    const fetchKorisnike = async () => {
      const {data} = await supabase.from('korisnici').select('*');
      if (data) setKorisnici(data);
    };
    fetchKorisnike();
  }, [role, loading, router]);

  const obrisiKorisnika = async (id: string) => {
    if (confirm('Jeste li sigurni da želite obrisati korisnika?')) {
      await supabase.from('korisnici').delete().eq('id', id);
      window.location.reload();
    }
  };

  if (loading) return <div>Učitavanje...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upravljanje korisnicima</h1>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Uloga</th>
            <th className="p-2 text-left">Akcije</th>
          </tr>
        </thead>
        <tbody>
          {korisnici.map(k => (
            <tr key={k.id} className="border-t">
              <td className="p-2">{k.email}</td>
              <td className="p-2">{k.uloga}</td>
              <td className="p-2">
                <button 
                  onClick={() => obrisiKorisnika(k.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                >
                  Obriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
