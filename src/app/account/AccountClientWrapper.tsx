import Card from '@/components/cards/Card';
import Heading from '@/components/ui/Heading';
import ListItem from '@/components/ui/ListItem';
import Text from '@/components/ui/Text';
import type { Booking } from '@/types/Booking';
import type { RawStudent } from '@/types/Student';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

interface AccountClientWrapperProps {
  student: RawStudent;
  bookings: Booking[];
}

export default function AccountClientWrapper({
  student,
  bookings,
}: AccountClientWrapperProps) {
  const metadata = student?.user_metadata;

  return (
    <>
      <Card className="space-y-1 p-6">
        <Heading variant="h1">Account</Heading>

        <div className="space-y-1">
          <Text>
            Name: {metadata?.first_name} {metadata?.last_name}
          </Text>
          <Text>Email: {student?.email}</Text>
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
