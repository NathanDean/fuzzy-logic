import { useState } from 'react';

import Card from '@/components/cards/Card';
import CardImage from '@/components/cards/CardImage';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import dayjs from 'dayjs';

import { Workshop } from '@/utils/types/Workshop';

interface WorkshopDetailsCardProps {
  workshop: Workshop;
  onBookNow: (id: string) => void;
  className?: string;
}

export default function WorkshopDetailsCard({
  workshop,
  onBookNow,
  className = '',
}: WorkshopDetailsCardProps) {
  const isSoldOut = workshop.max_places_available - workshop.bookings <= 0;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookNow = async () => {
    setIsSubmitting(true);
    await onBookNow(workshop.id);
    setIsSubmitting(false);
  };

  return (
    // <Card className="md:min-h-[70vh]">
    <Card className={className}>
      <div className="flex flex-col lg:flex-row h-full">
        {/* Image */}

        <div className="h-96 lg:w-1/2 lg:h-auto relative">
          <CardImage
            src={`/workshops/${workshop.image_url}`}
            alt="Workshop image"
            showFullInfo={true}
          />
        </div>

        {/* Text content */}
        <div className="p-6 flex flex-col flex-grow lg:w-1/2">
          <div className="flex-grow space-y-1">
            {/* Workshop name */}
            <Heading variant="h2">{workshop.class_name}</Heading>

            <Heading variant="h3">with {workshop.teacher}</Heading>

            <Heading variant="h4">{workshop.course_type}</Heading>

            {/* Date/time */}
            <Heading variant="h4">
              Begins{' '}
              {dayjs(`${workshop.date} ${workshop.start_time}`).format(
                'ha on ddd D MMM'
              )}{' '}
              at {workshop.venue}
            </Heading>

            {/* Venue */}
            <Heading variant="h4">£{workshop.price}</Heading>

            {/* Description */}
            {workshop.description
              .split('\n')
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) => (
                <Text key={index} variant="medium">
                  {paragraph}
                </Text>
              ))}
          </div>

          {/* Buttons */}
          <div className="flex sm:flex-row gap-3 mt-4">
            {/* Book now */}

            <Button
              onClick={handleBookNow}
              disabled={isSoldOut || isSubmitting}
            >
              <Text as="span">
                {isSoldOut
                  ? 'Sold out'
                  : isSubmitting
                    ? 'Please wait...'
                    : 'Book now'}
              </Text>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
