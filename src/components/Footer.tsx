import MailingListForm from './MailingListForm';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex justify-between py-4 px-4">
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

      <div className="hidden sm:flex items-end">
        <MailingListForm />
      </div>
    </footer>
  );
}
