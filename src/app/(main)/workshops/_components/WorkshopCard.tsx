import { useState } from 'react';

import Link from 'next/link';

import Card from '@/components/cards/Card';
import CardImage from '@/components/cards/CardImage';
import Text from '@/components/ui/Text';
import dayjs from 'dayjs';

import { Workshop } from '@/utils/types/Workshop';

interface WorkshopCardProps {
  workshop: Workshop;
  onBookNow: (id: string) => void;
  imageHeight?: 'sm' | 'md' | 'lg';
}

export default function WorkshopCard({
  workshop,
  onBookNow,
  imageHeight = 'md',
}: WorkshopCardProps) {
  const isSoldOut = workshop.max_places_available - workshop.bookings <= 0;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookNow = async () => {
    setIsSubmitting(true);
    await onBookNow(workshop.id);
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full h-full" imageHeight={imageHeight}>
      <div className={`flex flex-col h-full`}>
        {/* Image */}

        <div className="relative">
          <CardImage
            src={`/workshops/${workshop.image_url}`}
            alt="Workshop image"
            imageHeight={imageHeight}
          />
        </div>

        {/* Text content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex-grow space-y-1">
            {/* Workshop name */}
            <h2>{workshop.class_name}</h2>

            <h3>with {workshop.teacher}</h3>

            <h4>{workshop.course_type}</h4>

            {/* Date/time */}
            <h4>
              Begins{' '}
              {dayjs(`${workshop.date} ${workshop.start_time}`).format(
                'ha on ddd D MMM'
              )}{' '}
              at {workshop.venue}
            </h4>

            {/* Venue */}
            <h4>£{workshop.price}</h4>
          </div>

          {/* Buttons */}
          <div className="flex sm:flex-row gap-3 mt-4">
            {/* Book now */}
            <button
              className={`btn ${isSoldOut || isSubmitting ? 'btn-disabled' : 'btn-primary'} rounded-md p-2 transition-all`}
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
            </button>

            {/* More info */}

            <Link href={`workshops/${workshop.id}`} className="btn btn-primary">
              <Text as="span">More info</Text>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
