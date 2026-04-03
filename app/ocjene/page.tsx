'use client';
import {useEffect, useState} from 'react';
import {supabase} from '@/lib/supabase';

type Ucenik = {
  id: string;
  ime: string;
  prezime: string;
  ocjene: {id: string, vrijednost: number, vrsta: string}[];
};

export default function OcjenePage() {
  const [ucenici, setUcenici] = useState<Ucenik[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodatke = async () => {
      const {data} = await supabase
        .from('ucenici')
        .select('id, ime, prezime, ocjene(id, vrijednost, vrsta)');
      if (data) {
        // @ts-ignore
        setUcenici(data);
      }
      setLoading(false);
    };
    fetchPodatke();
  }, []);

  const dodajOcjenu = async (ucenikId: string) => {
    const vrijednost = prompt('Unesite ocjenu (1-5):');
    const vrsta = prompt('Unesite vrstu (pisani, usmeni, aktivnost):');
    if (vrijednost && vrsta) {
      await supabase.from('ocjene').insert({
        ucenik_id: ucenikId,
        vrijednost: parseInt(vrijednost),
        vrsta: vrsta
      });
      window.location.reload();
    }
  };

  if (loading) return <div>Učitavanje...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ocjene</h1>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Učenik</th>
            <th className="p-2 text-left">Ocjene</th>
            <th className="p-2 text-left">Akcije</th>
          </tr>
        </thead>
        <tbody>
          {ucenici.map(u => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.ime} {u.prezime}</td>
              <td className="p-2">{u.ocjene.map(o => o.vrijednost).join(', ')}</td>
              <td className="p-2">
                <button 
                  onClick={() => dodajOcjenu(u.id)}
                  className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                >
                  Dodaj ocjenu
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
