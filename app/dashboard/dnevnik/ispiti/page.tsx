'use client';
import {useState, useEffect} from 'react';
import {supabase} from '@/lib/supabase';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function IspitiPage() {
  const [ispiti, setIspiti] = useState<any[]>([]);
  const [naziv, setNaziv] = useState('');
  const [datum, setDatum] = useState('');

  useEffect(() => {
    fetchIspiti();
  }, []);

  const fetchIspiti = async () => {
    const {data} = await supabase.from('ispiti').select('*');
    if (data) setIspiti(data);
  };

  const addIspit = async () => {
    if (!naziv || !datum) return;
    await supabase.from('ispiti').insert({naziv, datum});
    setNaziv('');
    setDatum('');
    fetchIspiti();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upravljanje ispitima</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input value={naziv} onChange={(e) => setNaziv(e.target.value)} placeholder="Naziv ispita" />
          <Input type="date" value={datum} onChange={(e) => setDatum(e.target.value)} />
          <Button onClick={addIspit}>Dodaj</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Naziv</TableHead>
              <TableHead>Datum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ispiti.map(i => (
              <TableRow key={i.id}>
                <TableCell>{i.naziv}</TableCell>
                <TableCell>{i.datum}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
