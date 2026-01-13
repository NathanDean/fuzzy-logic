import Card from '@/components/cards/Card';
import Heading from '@/components/ui/Heading';
import ListItem from '@/components/ui/ListItem';
import Text from '@/components/ui/Text';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import type { Workshop } from '@/utils/types/Workshop';

dayjs.extend(advancedFormat);

interface User {
  id: string;
  email?: string;
  user_metadata: {
    first_name?: string;
    last_name?: string;
  };
}

interface Booking {
  id: string;
  created_at: string;
  workshop_id: string;
  user_id: string;
  status: string;
  session_id: string;
  workshop: Workshop;
}

interface AccountClientWrapperProps {
  user: User;
  bookings: Booking[];
}

export default function AccountClientWrapper({
  user,
  bookings,
}: AccountClientWrapperProps) {
  const metadata = user?.user_metadata;

  return (
    <>
      <Card className="space-y-1 p-6">
        <Heading variant="h1">Account</Heading>

        <div className="space-y-1">
          <Text>
            Name: {metadata?.first_name} {metadata?.last_name}
          </Text>
          <Text>Email: {user?.email}</Text>
          <Text>Upcoming workshops:</Text>
          <ul className="list-disc space-y-1 pl-5">
            {bookings.length > 0 ? (
              bookings.map((booking) =>
                booking.workshop ? (
                  <ListItem key={booking.id}>
                    {booking.workshop.class_name} -{' '}
                    {dayjs(
                      `${booking.workshop.date} ${booking.workshop.start_time}`
                    ).format('ha on ddd Do MMM')}{' '}
                    at {booking.workshop.venue}
                  </ListItem>
                ) : null
              )
            ) : (
              <ListItem>No bookings found</ListItem>
            )}
          </ul>
        </div>
      </Card>
    </>
  );
}
