import Card from '@/components/cards/Card';
import Heading from '@/components/ui/Heading';
import ListItem from '@/components/ui/ListItem';
import Text from '@/components/ui/Text';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import type { Booking } from '@/utils/types/Booking';
import type { User } from '@/utils/types/User';

dayjs.extend(advancedFormat);

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
                booking.workshop_details ? (
                  <ListItem key={booking.id}>
                    {booking.workshop_details.class_name} -{' '}
                    {dayjs(
                      `${booking.workshop_details.date} ${booking.workshop_details.start_time}`
                    ).format('ha on ddd Do MMM')}{' '}
                    at {booking.workshop_details.venue}
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
