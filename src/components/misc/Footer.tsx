import MailingListForm from './MailingListForm';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full flex justify-between py-4 px-4 text-sm">
      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
        <Link href="/privacy">Privacy Policy</Link>

        <Link href="/cookies">Cookie Notice</Link>
      </div>

      <div className="hidden lg:flex md:flex-row items-center space-x-2 space-y-2 md:space-y-0">
        <p className="leading-4">Subscribe to our mailing list:</p>
        <MailingListForm isInFooter={true} />
      </div>
    </footer>
  );
}
