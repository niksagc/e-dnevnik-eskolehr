'use client';
import {useState, useEffect} from 'react';
import {supabase} from '@/lib/supabase';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function RasporedPage() {
  const [raspored, setRaspored] = useState<any[]>([]);
  const [predmet, setPredmet] = useState('');
  const [dan, setDan] = useState('');

  useEffect(() => {
    fetchRaspored();
  }, []);

  const fetchRaspored = async () => {
    const {data} = await supabase.from('raspored').select('*');
    if (data) setRaspored(data);
  };

  const addRaspored = async () => {
    if (!predmet || !dan) return;
    await supabase.from('raspored').insert({predmet, dan});
    setPredmet('');
    setDan('');
    fetchRaspored();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upravljanje rasporedom</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input value={predmet} onChange={(e) => setPredmet(e.target.value)} placeholder="Predmet" />
          <Input value={dan} onChange={(e) => setDan(e.target.value)} placeholder="Dan (npr. Ponedjeljak)" />
          <Button onClick={addRaspored}>Dodaj</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Predmet</TableHead>
              <TableHead>Dan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {raspored.map(r => (
              <TableRow key={r.id}>
                <TableCell>{r.predmet}</TableCell>
                <TableCell>{r.dan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
