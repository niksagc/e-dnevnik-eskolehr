'use client';
import {useEffect, useState} from 'react';
import {supabase} from '@/lib/supabase';

type Podaci = {
  ime: string;
  prezime: string;
  ocjene: {vrijednost: number, predmet: {naziv: string}}[];
  izostanci: {vrsta: string}[];
};

export default function UcenikDashboard() {
  const [podaci, setPodaci] = useState<Podaci | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodatke = async () => {
      const {data: {user}} = await supabase.auth.getUser();
      if (user) {
        const {data} = await supabase
          .from('ucenici')
          .select('ime, prezime, ocjene(vrijednost, predmet:predmeti(naziv)), izostanci(vrsta)')
          .eq('id', user.id) // Pretpostavka: id ucenika odgovara id-u korisnika
          .single();
        if (data) {
          // @ts-ignore
          setPodaci(data);
        }
      }
      setLoading(false);
    };
    fetchPodatke();
  }, []);

  if (loading) return <div>Učitavanje...</div>;
  if (!podaci) return <div>Nema podataka.</div>;

  const prosjek = podaci.ocjene.length > 0 
    ? (podaci.ocjene.reduce((acc, o) => acc + o.vrijednost, 0) / podaci.ocjene.length).toFixed(2)
    : 'N/A';

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dobrodošao, {podaci.ime} {podaci.prezime}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="font-bold">Prosjek ocjena</h2>
          <p className="text-3xl">{prosjek}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h2 className="font-bold">Ukupno izostanaka</h2>
          <p className="text-3xl">{podaci.izostanci.length}</p>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">Ocjene</h2>
      <ul className="bg-white p-4 rounded shadow">
        {podaci.ocjene.map((o, i) => (
          <li key={i} className="border-b p-2">{o.predmet?.naziv}: {o.vrijednost}</li>
        ))}
      </ul>
    </div>
  );
}
