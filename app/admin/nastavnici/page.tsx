'use client';
import {useState, useEffect} from 'react';
import {supabase} from '@/lib/supabase';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function NastavniciPage() {
  const [nastavnici, setNastavnici] = useState<any[]>([]);
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');

  useEffect(() => {
    fetchNastavnici();
  }, []);

  const fetchNastavnici = async () => {
    const {data} = await supabase.from('nastavnici').select('*');
    if (data) setNastavnici(data);
  };

  const addNastavnik = async () => {
    if (!ime || !prezime) return;
    await supabase.from('nastavnici').insert({ime, prezime});
    setIme('');
    setPrezime('');
    fetchNastavnici();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upravljanje nastavnicima</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input value={ime} onChange={(e) => setIme(e.target.value)} placeholder="Ime" />
          <Input value={prezime} onChange={(e) => setPrezime(e.target.value)} placeholder="Prezime" />
          <Button onClick={addNastavnik}>Dodaj</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ime</TableHead>
              <TableHead>Prezime</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nastavnici.map(n => (
              <TableRow key={n.id}>
                <TableCell>{n.ime}</TableCell>
                <TableCell>{n.prezime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
