'use client';
import {useState, useEffect} from 'react';
import {supabase} from '@/lib/supabase';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function RazrediPage() {
  const [razredi, setRazredi] = useState<any[]>([]);
  const [naziv, setNaziv] = useState('');

  useEffect(() => {
    fetchRazredi();
  }, []);

  const fetchRazredi = async () => {
    const {data} = await supabase.from('razredi').select('*');
    if (data) setRazredi(data);
  };

  const addRazred = async () => {
    if (!naziv) return;
    await supabase.from('razredi').insert({naziv});
    setNaziv('');
    fetchRazredi();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upravljanje razredima</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input value={naziv} onChange={(e) => setNaziv(e.target.value)} placeholder="Naziv razreda (npr. 1.a)" />
          <Button onClick={addRazred}>Dodaj</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Naziv</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {razredi.map(r => (
              <TableRow key={r.id}>
                <TableCell>{r.naziv}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
