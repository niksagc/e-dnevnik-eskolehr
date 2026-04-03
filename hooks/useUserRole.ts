import {useEffect, useState} from 'react';
import {supabase} from '@/lib/supabase';

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      const {data: {user}} = await supabase.auth.getUser();
      if (user) {
        const {data} = await supabase
          .from('korisnici')
          .select('uloga')
          .eq('id', user.id)
          .single();
        if (data) setRole(data.uloga);
      }
      setLoading(false);
    };
    getRole();
  }, []);

  return {role, loading};
}
