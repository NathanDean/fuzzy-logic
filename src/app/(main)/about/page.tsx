import PersonCard from '@/app/(main)/about/_components/PersonCard';
import CardGrid from '@/components/cards/CardGrid';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

import { createClient } from '@/utils/supabase/serverClient';

interface Person {
  id: number;
  created_at: string;
  image_url: string | null;
  name: string;
  bio: string;
}

async function fetchPeople(): Promise<Person[]> {
  const supabase = await createClient();
  const { data } = await supabase.from('team').select('*').order('id');

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
  const coreTeam = people.slice(0, 1);
  const guestArtists = people.slice(1);

  return (
    <div className="-mt-15 sm:-mt-30 -mb-13 sm:-mb-16">
      <section className="min-h-screen flex flex-col justify-center items-start space-y-2">
        <Text>{`Fuzzy Logic is an improv company.`}</Text>

        <Text>
          {`We run workshops designed to help improvisers find their artistic voice and develop the technical skills to express it more clearly.`}
        </Text>

        <Text>
          {`Our work explores the ways improv can give to and learn from other artforms, and experiments with new ideas of what improv can do and be.`}
        </Text>
        <div className="w-full flex flex-row items-stretch justify-center space-x-2">
          <Button href="#people">
            <Text as="span">{`Who is Fuzzy Logic?`}</Text>
          </Button>
          <Button href="#story">
            <Text as="span">{`What's our story?`}</Text>
          </Button>
        </div>
      </section>

      <section
        id="people"
        className="min-h-screen flex flex-col justify-center items-center space-y-8 scroll-mt-20"
      >
        <Heading variant="h2">Core team</Heading>
        <CardGrid cardWidth="lg" imageHeight="lg" cols={1}>
          {coreTeam.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </CardGrid>

        <Heading variant="h2">Artists we work with</Heading>
        <CardGrid cardWidth="lg" imageHeight="lg" cols={1}>
          {guestArtists.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </CardGrid>
      </section>

      <section
        id="story"
        className="min-h-screen flex flex-col justify-center items-start space-y-2"
      >
        <Text>
          {`Fuzzy Logic was founded in 2025 by Nathan Dean, following a decade's experience in the world of artist and artform development at Arts Council England and talent agency Avalon.`}
        </Text>
        <Text>
          {`We ran our first workshops in July 2025. We also produce the sketch series scenesAboutLeaving and the twoprov show A Very Capable Boy, with more shows to come in future.`}
        </Text>
      </section>
    </div>
  );
}
