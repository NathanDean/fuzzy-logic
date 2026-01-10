import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

export default function Success() {
  return (
    <div className="flex flex-col items-center space-y-1">
      <Heading>Booking completed</Heading>

      <Text>{"Thanks for booking with us.  We're excited to see you."}</Text>

      <Text>You can view your upcoming bookings on your Account page.</Text>
    </div>
  );
}
