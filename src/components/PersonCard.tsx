import Card from './Card';
import CardImage from './CardImage';

interface Person {
  id: number;
  created_at: string;
  image_url: string | null;
  name: string;
  bio: string;
}

interface PersonCardProps {
  person: Person;
}

export default function PersonCard({ person }: PersonCardProps) {
  return (
    <Card key={person.id} className="w-full h-full md:min-h-[70vh]">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Image */}
        <div className="h-96 lg:w-1/2 lg:h-auto relative">
          <CardImage
            src={person.image_url || 'default-team-member-image.jpg'}
            alt={person.name}
            showFullInfo={true}
          />
        </div>

        <div className="lg:w-1/2 flex flex-col flex-grow p-6">
          {/* Name */}
          <h2 className="card-heading">{person.name}</h2>

          {/* Bio */}
          <p className="py-1 detail-text">{person.bio}</p>
        </div>
      </div>
    </Card>
  );
}
