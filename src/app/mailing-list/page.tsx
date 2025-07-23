import MailingListForm from '@/components/MailingListForm';

export default function MailingList() {
  return (
    <div className="space-y-2">
      <p className="large-text">
        Please enter your email address below to subscribe to our mailing list
        for news and announcements.
      </p>
      <MailingListForm />
    </div>
  );
}
