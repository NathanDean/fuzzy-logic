import DisplayMessageContainer from '../containers/DisplayMessageContainer';
import Main from '../Main';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Text from '../ui/Text';

interface ErrorMessageProps {
  onClick: () => void;
  type: string;
}

export default function ErrorMessage({ onClick, type }: ErrorMessageProps) {
  const capitalised_type = type[0].toUpperCase() + type.substring(1);

  return (
    <Main>
      <DisplayMessageContainer>
        {' '}
        <Heading variant="h1">Sorry, something went wrong.</Heading>
        <Text>{capitalised_type} error.</Text>
        <Text>
          Please try again, if the problem continues please get in touch.
        </Text>
        <Button onClick={onClick}>
          <Text as="span">Try again</Text>
        </Button>
      </DisplayMessageContainer>
    </Main>
  );
}
