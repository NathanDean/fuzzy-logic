import Link from 'next/link';

import MailingListForm from '../forms/MailingListForm';
import Text from '../ui/Text';

export default function Footer() {
  return (
    <footer className="absolute right-0 bottom-0 left-0 z-10 flex w-full justify-between px-4 py-4">
      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
        <Link href="/privacy">
          <Text variant="small" as="span">
            Privacy Policy
          </Text>
        </Link>

        <Link href="/cookies">
          <Text variant="small" as="span">
            Cookie Notice
          </Text>
        </Link>
      </div>

      <div className="hidden items-center space-y-2 space-x-2 md:flex-row md:space-y-0 lg:flex">
        <Text variant="small" className="leading-4">
          Subscribe to our mailing list:
        </Text>
        <MailingListForm isInFooter={true} />
      </div>
    </footer>
  );
}
