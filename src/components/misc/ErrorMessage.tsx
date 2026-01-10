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
    <div className="flex flex-col items-center space-y-1">
      <Heading>Sorry, something went wrong.</Heading>

      <Text>{capitalised_type} error.</Text>
      <Text>
        Please try again, if the problem continues please get in touch.
      </Text>

      <Button onClick={onClick}>
        <Text as="span">Try again</Text>
      </Button>
    </div>
  );
}
