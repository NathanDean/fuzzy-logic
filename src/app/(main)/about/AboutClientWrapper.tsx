import CardGrid from '@/components/cards/CardGrid';
import CardContainer from '@/components/containers/CardContainer';
import TextContainer from '@/components/containers/TextContainer';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import { TeamMember } from '@/types/TeamMember';

import PersonCard from './_components/TeamMemberCard';

export default function AboutClientWrapper({ team }: { team: TeamMember[] }) {
  const coreTeam = team.slice(0, 1);
  const guestArtists = team.slice(1);

  return (
    <>
      <section className="flex min-h-screen items-center justify-center">
        <TextContainer>
          <Text>Fuzzy Logic is an improv company.</Text>
          <Text>
            We run workshops targeting specific technical skills that make up
            the craft of improv.
          </Text>
          <Text>
            Our students are active performers who are ambitious about
            developing their skills and exploring the artistic potential of
            improv.
          </Text>
          <div className="flex w-full flex-row items-stretch justify-center space-x-2">
            <Button href="#people">
              <Text as="span">{`Who we are`}</Text>
            </Button>
            <Button href="#story">
              <Text as="span">{`Our story`}</Text>
            </Button>
          </div>
        </TextContainer>
      </section>

      <section
        id="people"
        className="flex min-h-screen scroll-mt-20 flex-col items-center justify-center space-y-8"
      >
        <Heading variant="h2">Core team</Heading>
        <CardContainer>
          <CardGrid cols={1}>
            {coreTeam.map((teamMember) => (
              <PersonCard
                key={teamMember.id}
                person={teamMember}
                className="h-full w-full md:min-h-[70vh]"
              />
            ))}
          </CardGrid>
        </CardContainer>

        <Heading variant="h2">Artists we work with</Heading>
        <CardContainer>
          <CardGrid cols={1}>
            {guestArtists.map((teamMember) => (
              <PersonCard
                key={teamMember.id}
                person={teamMember}
                className="h-full w-full md:min-h-[70vh]"
              />
            ))}
          </CardGrid>
        </CardContainer>
      </section>

      <section
        id="story"
        className="flex min-h-screen items-center justify-center space-y-2"
      >
        <TextContainer>
          <Text>
            {`Fuzzy Logic was founded by Nathan Dean, following a decade's experience in the world of artist and artform development at Arts Council England and talent agency Avalon.`}
          </Text>
          <Text>
            {`We ran our first workshops in 2025. We also produce the twoprov show A Very Capable Boy and sketch series scenesAboutLeaving, and have plans to work with performers on other shows in future.`}
          </Text>
        </TextContainer>
      </section>
    </>
  );
}
