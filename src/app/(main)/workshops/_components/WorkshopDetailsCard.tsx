import { useState } from 'react';

import Card from '@/components/cards/Card';
import CardImage from '@/components/cards/CardImage';
import Text from '@/components/ui/Text';
import dayjs from 'dayjs';

import { Workshop } from '@/utils/types/Workshop';

interface WorkshopDetailsCardProps {
  workshop: Workshop;
  onBookNow: (id: string) => void;
  imageHeight?: 'sm' | 'md' | 'lg';
}

export default function WorkshopDetailsCard({
  workshop,
  onBookNow,
  imageHeight = 'lg',
}: WorkshopDetailsCardProps) {
  const isSoldOut = workshop.max_places_available - workshop.bookings <= 0;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookNow = async () => {
    setIsSubmitting(true);
    await onBookNow(workshop.id);
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full h-full md:min-h-[70vh]" imageHeight={imageHeight}>
      <div className="flex flex-col lg:flex-row h-full">
        {/* Image */}

        <div className="h-96 lg:w-1/2 lg:h-auto relative">
          <CardImage
            src={workshop.image_url}
            alt="Workshop image"
            showFullInfo={true}
          />
        </div>

        {/* Text content */}
        <div className="p-6 flex flex-col flex-grow lg:w-1/2">
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
          </div>
        </div>
      </div>
    </Card>
  );
}
