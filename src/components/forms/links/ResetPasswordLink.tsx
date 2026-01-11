import Link from 'next/link';

import Text from '@/components/ui/Text';

export default function ResetPasswordLink() {
  return (
    <Link href="/reset">
      <Text as="span">Forgotten your password?</Text>
    </Link>
  );
}
