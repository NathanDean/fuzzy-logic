import Link from 'next/link';

import Text from '../ui/Text';

export default function ResetPasswordLink() {
  return (
    <Link href="/reset">
      <Text as="span">Forgotten your password?</Text>
    </Link>
  );
}
