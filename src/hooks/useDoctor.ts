import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Doctor, PageSections } from '../lib/supabase';

export function useDoctor(doctorId: string) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const { data, error } = await supabase
          .from('Doctor')
          .select('*')
          .eq('id', doctorId)
          .single();

        if (error) throw error;
        setDoctor(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch doctor'));
      } finally {
        setLoading(false);
      }
    }

    fetchDoctor();
  }, [doctorId]);

  const updatePageSections = async (pageSections: PageSections) => {
    try {
      const { error } = await supabase
        .from('Doctor')
        .update({ page_sections: pageSections })
        .eq('id', doctorId);

      if (error) throw error;

      setDoctor(prev => prev ? { ...prev, page_sections: pageSections } : null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update page sections'));
      return false;
    }
  };

  return {
    doctor,
    loading,
    error,
    updatePageSections,
  };
}