import { useState } from 'react';

import Card from '@/components/cards/Card';
import CardImage from '@/components/cards/CardImage';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import dayjs from 'dayjs';

import type { WorkshopWithRemainingPlaces } from '@/utils/types/Workshop';

interface WorkshopCardProps {
  workshop: WorkshopWithRemainingPlaces;
  onBookNow: (id: string) => void;
  className?: string;
}

export default function WorkshopCard({
  workshop,
  onBookNow,
  className = '',
}: WorkshopCardProps) {
  const isSoldOut = workshop.places_remaining <= 0;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookNow = async () => {
    setIsSubmitting(true);
    await onBookNow(workshop.id);
    setIsSubmitting(false);
  };

  return (
    <Card className={className}>
      <div className={`flex h-full flex-col`}>
        {/* Image */}

        <div className="relative">
          <CardImage
            src={`/workshops/${workshop.image_url}`}
            alt="Workshop image"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-grow flex-col p-6">
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
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-3 sm:flex-row">
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

            {/* More info */}

            <Button href={`workshops/${workshop.id}`}>
              <Text as="span">More info</Text>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
