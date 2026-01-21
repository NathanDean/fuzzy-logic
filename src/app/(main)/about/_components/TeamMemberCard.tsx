import Card from '@/components/cards/Card';
import CardImage from '@/components/cards/CardImage';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import { TeamMember } from '@/types/TeamMember';

interface TeamMemberCardProps {
  person: TeamMember;
  className?: string;
}

export default function PersonCard({ person, className }: TeamMemberCardProps) {
  return (
    <Card key={person.id} className={className}>
      <div className="flex h-full flex-col lg:flex-row">
        {/* Image */}
        <div className="relative h-96 lg:h-auto lg:w-1/2">
          <CardImage
            src={
              `/people/${person.image_url}` ||
              '/people/default-team-member-image.jpg'
            }
            alt={person.name}
            showFullInfo={true}
          />
        </div>

        <div className="flex flex-grow flex-col space-y-2 p-6 lg:w-1/2">
          {/* Name */}
          <Heading variant="h2">{person.name}</Heading>

          {/* Bio */}
          {person.bio
            .split('\n')
            .filter((paragraph) => paragraph.trim())
            .map((paragraph, index) => (
              <Text key={index} variant="medium">
                {paragraph}
              </Text>
            ))}
        </div>
      </div>
    </Card>
  );
}
