import Link from 'next/link';

import Text from '@/components/ui/Text';

export default function SignUpLink() {
  return (
    <Link href="/signup">
      <Text as="span">New to Fuzzy Logic? Sign up here.</Text>
    </Link>
  );
}
