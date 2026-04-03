'use client';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {LayoutDashboard, BookOpen, Users, GraduationCap, ClipboardList, ChevronDown, ShieldCheck} from 'lucide-react';
import {supabase} from '@/lib/supabase';

export function Sidebar() {
  const [openSection, setOpenSection] = useState<string | null>('dnevnik');
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const getRole = async () => {
      const {data: {user}} = await supabase.auth.getUser();
      if (user) {
        const {data} = await supabase.from('korisnici').select('uloga').eq('id', user.id).single();
        if (data) setRole(data.uloga);
      }
    };
    getRole();
  }, []);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-4 font-bold text-xl text-blue-600">e-Dnevnik</div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <Link href="/" className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded">
          <LayoutDashboard size={20} /> Početna
        </Link>
        
        {role === 'admin' && (
          <Link href="/admin" className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded text-red-600">
            <ShieldCheck size={20} /> Admin Panel
          </Link>
        )}
        
        <div>
          <button 
            onClick={() => setOpenSection(openSection === 'dnevnik' ? null : 'dnevnik')}
            className="flex items-center justify-between w-full p-2 hover:bg-blue-50 rounded"
          >
            <span className="flex items-center gap-2"><BookOpen size={20} /> Dnevnik rada</span>
            <ChevronDown size={16} />
          </button>
          {openSection === 'dnevnik' && (
            <div className="pl-8 space-y-1 mt-1 text-sm text-gray-600">
              <Link href="/dnevnik/provjere" className="block p-1 hover:text-blue-600">Pisane provjere</Link>
              <Link href="/dnevnik/lektira" className="block p-1 hover:text-blue-600">Lektira</Link>
              <Link href="/dnevnik/raspored" className="block p-1 hover:text-blue-600">Raspored</Link>
              <Link href="/dnevnik/sati" className="block p-1 hover:text-blue-600">Održani sati</Link>
            </div>
          )}
        </div>

        <Link href="/imenik" className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded">
          <Users size={20} /> Imenik
        </Link>
        <Link href="/ocjene" className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded">
          <GraduationCap size={20} /> Ocjene
        </Link>
        <Link href="/izostanci" className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded">
          <ClipboardList size={20} /> Izostanci
        </Link>
        <div className="mt-auto p-4">
          <button 
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-2 p-2 hover:bg-red-50 text-red-600 rounded w-full"
          >
            Odjava
          </button>
        </div>
      </nav>
    </aside>
  );
}
