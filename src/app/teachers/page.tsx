'use client';

import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/supabaseClient';
import Loading from '@/components/misc/Loading';
import PersonCard from '@/app/about/_components/PersonCard';
import CardGrid from '@/components/cards/CardGrid';

interface Person {
  id: number;
  created_at: string;
  image_url: string;
  name: string;
  bio: string;
}

export default function Teachers() {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      setErrorMessage('');

      try {
        const { data, error } = await supabase.from('team').select('*');

        if (error) {
          throw error;
        }

        if (data) {
          setPeople(data);
        }
      } catch (error) {
        console.error('Error fetching people:', error);
        setErrorMessage(
          'Error fetching people.  Please try refreshing the page, or contact us if the problem continues.'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {errorMessage && <p className="error">{errorMessage}</p>}

          <CardGrid cardWidth="md" imageHeight="lg" cols={2}>
            {people.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </CardGrid>
        </>
      )}
    </>
  );
}
