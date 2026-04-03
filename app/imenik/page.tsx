'use client';
import {useEffect, useState} from 'react';
import {supabase} from '@/lib/supabase';

type Ucenik = {
  id: string;
  ime: string;
  prezime: string;
  razred: {naziv: string};
};

export default function ImenikPage() {
  const [ucenici, setUcenici] = useState<Ucenik[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUcenici = async () => {
      const {data} = await supabase
        .from('ucenici')
        .select('id, ime, prezime, razredi(naziv)');
      if (data) {
        // @ts-ignore
        setUcenici(data.map(u => ({...u, razred: u.razredi})));
      }
      setLoading(false);
    };
    fetchUcenici();
  }, []);

  if (loading) return <div>Učitavanje...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Imenik</h1>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Ime</th>
            <th className="p-2 text-left">Prezime</th>
            <th className="p-2 text-left">Razred</th>
          </tr>
        </thead>
        <tbody>
          {ucenici.map(u => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.ime}</td>
              <td className="p-2">{u.prezime}</td>
              <td className="p-2">{u.razred?.naziv}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
