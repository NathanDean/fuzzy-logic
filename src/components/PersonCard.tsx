import Card from './Card';
import CardImage from './CardImage';

interface Person {
  id: number;
  created_at: string;
  image_url: string;
  name: string;
  bio: string;
}

interface PersonCardProps {
  person: Person;
  imageHeight?: 'sm' | 'md' | 'lg';
}

export default function PersonCard({
  person,
  imageHeight = 'lg',
}: PersonCardProps) {
  return (
    <Card key={person.id}>
      {/* Image */}
      <CardImage
        src="default-team-member-image.jpg"
        alt={person.name}
        imageHeight={imageHeight}
      />

      <div className="p-6">
        {/* Name */}
        <h2 className="pb-1">{person.name}</h2>

        {/* Bio */}
        <p className="py-1 detail-text">{person.bio}</p>
      </div>
    </Card>
  );
}
