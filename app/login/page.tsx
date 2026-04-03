'use client';
import {useState} from 'react';
import {supabase} from '@/lib/supabase';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const {error} = await supabase.auth.signInWithPassword({email, password});
    if (error) alert(error.message);
    else router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Prijava u e-Dnevnik</h1>
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Lozinka" className="w-full p-2 mb-4 border rounded" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Prijava</button>
      </form>
    </div>
  );
}
