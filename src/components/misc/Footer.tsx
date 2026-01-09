import Link from 'next/link';
import MailingListForm from './MailingListForm';
import Text from '../ui/Text';

export default function Footer() {
  return (
    <footer className="w-full flex justify-between py-4 px-4">
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

      <div className="hidden lg:flex md:flex-row items-center space-x-2 space-y-2 md:space-y-0">
        <Text variant="small" className="leading-4">
          Subscribe to our mailing list:
        </Text>
        <MailingListForm isInFooter={true} />
      </div>
    </footer>
  );
}
