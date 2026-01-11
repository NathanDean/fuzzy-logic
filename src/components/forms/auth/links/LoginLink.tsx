import Link from 'next/link';

import Text from '@/components/ui/Text';

export default function LoginLink() {
  return (
    <Link href="/login">
      <Text as="span">Already have an account? Log in here.</Text>
    </Link>
  );
}
