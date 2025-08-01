import MailingListForm from './MailingListForm';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex justify-between py-4 px-4 text-sm">
      <div className="flex items-center space-x-4">
        <Link
          href="/privacy"
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          Privacy Policy
        </Link>

        <Link
          href="/cookies"
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          Cookie Notice
        </Link>
      </div>

      <div className="hidden lg:flex md:flex-row items-center space-x-2 space-y-2 md:space-y-0">
        <h3 className="leading-4">Subscribe to our mailing list:</h3>
        <MailingListForm isInFooter={true} />
      </div>
    </footer>
  );
}
