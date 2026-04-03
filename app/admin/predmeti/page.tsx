'use client';
import {useState, useEffect} from 'react';
import {supabase} from '@/lib/supabase';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function PredmetiPage() {
  const [predmeti, setPredmeti] = useState<any[]>([]);
  const [naziv, setNaziv] = useState('');

  useEffect(() => {
    fetchPredmeti();
  }, []);

  const fetchPredmeti = async () => {
    const {data} = await supabase.from('predmeti').select('*');
    if (data) setPredmeti(data);
  };

  const addPredmet = async () => {
    if (!naziv) return;
    await supabase.from('predmeti').insert({naziv});
    setNaziv('');
    fetchPredmeti();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upravljanje predmetima</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input value={naziv} onChange={(e) => setNaziv(e.target.value)} placeholder="Naziv predmeta" />
          <Button onClick={addPredmet}>Dodaj</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Naziv</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {predmeti.map(p => (
              <TableRow key={p.id}>
                <TableCell>{p.naziv}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
