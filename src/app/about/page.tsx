import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import CardGrid from '@/components/CardGrid';
import PersonCard from '@/components/PersonCard';

interface Person {
  id: number;
  created_at: string;
  image_url: string;
  name: string;
  bio: string;
}

async function fetchPeople(): Promise<Person[]> {
  const supabase = await createClient();
  const { data } = await supabase.from('team').select('*');

  if (data) {
    return data;
  } else {
    throw new Error(
      'Error fetching people.  Please try refreshing the page, or contact us if the problem continues.'
    );
  }
}

export default async function About() {
  const people = await fetchPeople();

  return (
    <div className="-mt-30">
      <section className="sm:w-xl lg:w-3xl xl:w-4xl min-h-screen flex flex-col justify-center items-start space-y-2 large-text">
        <p>Fuzzy Logic is an improv company.</p>

        <p>
          We run workshops designed to help improvisers find their artistic
          voice and develop the technical skills to express it more clearly.
        </p>

        <p>
          Our work explores the ways improv can give to and learn from other
          artforms, and experiments with new ideas of what improv can do and be.
        </p>
        <Link className="btn btn-primary" href="/about/#people">
          Who is Fuzzy Logic?
        </Link>
      </section>

      <section
        id="people"
        className="min-h-screen flex flex-col justify-center items-center space-y-8 scroll-mt-30"
      >
        <h2 className="heading">Who is Fuzzy Logic?</h2>
        <CardGrid cardWidth="md" imageHeight="md" cols={2}>
          {people.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </CardGrid>
      </section>
    </div>
  );
}
