import DisplayMessageContainer from '@/components/containers/DisplayMessageContainer';
import Main from '@/components/Main';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

export default function Success() {
  return (
    <Main>
      <DisplayMessageContainer>
        <Heading variant="h1">Booking completed</Heading>

        <Text>{"Thanks for booking with us.  We're excited to see you."}</Text>

        <Text>You can view your upcoming bookings on your Account page.</Text>
      </DisplayMessageContainer>
    </Main>
  );
}
