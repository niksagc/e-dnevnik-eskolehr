'use client';
import {useEffect, useState} from 'react';
import {supabase} from '@/lib/supabase';

type Ucenik = {
  id: string;
  ime: string;
  prezime: string;
  izostanci: {id: string, vrsta: string}[];
};

export default function IzostanciPage() {
  const [ucenici, setUcenici] = useState<Ucenik[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodatke = async () => {
      const {data} = await supabase
        .from('ucenici')
        .select('id, ime, prezime, izostanci(id, vrsta)');
      if (data) {
        // @ts-ignore
        setUcenici(data);
      }
      setLoading(false);
    };
    fetchPodatke();
  }, []);

  const dodajIzostanak = async (ucenikId: string) => {
    const vrsta = prompt('Unesite vrstu (opravdano, neopravdano):');
    if (vrsta) {
      await supabase.from('izostanci').insert({
        ucenik_id: ucenikId,
        vrsta: vrsta
      });
      window.location.reload();
    }
  };

  if (loading) return <div>Učitavanje...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Izostanci</h1>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Učenik</th>
            <th className="p-2 text-left">Broj izostanaka</th>
            <th className="p-2 text-left">Akcije</th>
          </tr>
        </thead>
        <tbody>
          {ucenici.map(u => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.ime} {u.prezime}</td>
              <td className="p-2">{u.izostanci.length}</td>
              <td className="p-2">
                <button 
                  onClick={() => dodajIzostanak(u.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                >
                  Dodaj izostanak
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
