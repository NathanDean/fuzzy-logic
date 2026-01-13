import DisplayMessageContainer from '@/components/containers/DisplayMessageContainer';
import Main from '@/components/Main';
import Heading from '@/components/ui/Heading';

export default function Cancel() {
  return (
    <Main>
      <DisplayMessageContainer>
        <Heading variant="h1">Booking cancelled</Heading>
      </DisplayMessageContainer>
    </Main>
  );
}
