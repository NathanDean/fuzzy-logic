import Card from '@/components/cards/Card';
import CardImage from '@/components/cards/CardImage';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

interface Person {
  id: number;
  created_at: string;
  image_url: string | null;
  name: string;
  bio: string;
}

interface PersonCardProps {
  person: Person;
  className?: string;
}

export default function PersonCard({ person, className }: PersonCardProps) {
  return (
    <Card key={person.id} className={className}>
      <div className="flex flex-col lg:flex-row h-full">
        {/* Image */}
        <div className="h-96 lg:w-1/2 lg:h-auto relative">
          <CardImage
            src={
              `/people/${person.image_url}` ||
              '/people/default-team-member-image.jpg'
            }
            alt={person.name}
            showFullInfo={true}
          />
        </div>

        <div className="lg:w-1/2 flex flex-col flex-grow p-6 space-y-2">
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
