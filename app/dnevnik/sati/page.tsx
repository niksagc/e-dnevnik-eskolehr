'use client';
import {useEffect, useState} from 'react';
import {supabase} from '@/lib/supabase';

type Sat = {
  id: string;
  tema: string;
  datum: string;
};

export default function SatiPage() {
  const [sati, setSati] = useState<Sat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSati = async () => {
      const {data} = await supabase
        .from('sati')
        .select('id, tema, datum')
        .order('datum', {ascending: false});
      if (data) setSati(data);
      setLoading(false);
    };
    fetchSati();
  }, []);

  const dodajSat = async () => {
    const tema = prompt('Unesite temu sata:');
    if (tema) {
      await supabase.from('sati').insert({tema, datum: new Date().toISOString()});
      window.location.reload();
    }
  };

  if (loading) return <div>Učitavanje...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Održani sati</h1>
        <button onClick={dodajSat} className="bg-blue-600 text-white px-4 py-2 rounded">Dodaj sat</button>
      </div>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Datum</th>
            <th className="p-2 text-left">Tema sata</th>
          </tr>
        </thead>
        <tbody>
          {sati.map(s => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{new Date(s.datum).toLocaleDateString('hr-HR')}</td>
              <td className="p-2">{s.tema}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
