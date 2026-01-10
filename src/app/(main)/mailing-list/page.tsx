import MailingListForm from '@/components/forms/MailingListForm';
import Text from '@/components/ui/Text';

export default function MailingList() {
  return (
    <div className="space-y-2">
      <Text>
        Please enter your email address below to subscribe to our mailing list
        for news and announcements.
      </Text>
      <MailingListForm />
    </div>
  );
}
