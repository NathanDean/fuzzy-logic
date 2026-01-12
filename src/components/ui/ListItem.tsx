import Text from './Text';

export default function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <Text as="span">{children}</Text>
    </li>
  );
}
