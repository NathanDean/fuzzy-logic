import dayjs from 'dayjs';

import Card from './Card';
import CardImage from './CardImage';

import { Workshop } from '@/utils/types/Workshop';

import { useState } from 'react';

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
    <Card className="w-full h-full md:min-h-[70vh] " imageHeight={imageHeight}>
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
            <h2 className="card-heading">{workshop.class_name}</h2>

            <h3 className="card-subheading">with {workshop.teacher}</h3>

            <h4 className="info-heading">{workshop.course_type}</h4>

            {/* Date/time */}
            <h4 className="info-heading">
              Begins{' '}
              {dayjs(`${workshop.date} ${workshop.start_time}`).format(
                'ha on ddd D MMM'
              )}{' '}
              at {workshop.venue}
            </h4>

            {/* Venue */}
            <h4 className="info-heading">£{workshop.price}</h4>

            {/* Description */}
            {workshop.description
              .split('\n')
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) => (
                <p key={index} className="detail-text">
                  {paragraph}
                </p>
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
              {isSoldOut
                ? 'Sold out'
                : isSubmitting
                  ? 'Please wait...'
                  : 'Book now'}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
