'use client';

import { useEffect, useState } from 'react';

import { subscribeToMailingList } from '@/actions/mailingList';

import cn from '@/utils/style/cn';

import Button from '../ui/Button';
import Text from '../ui/Text';

interface MailingListFormProps {
  location?: 'body' | 'footer';
}

export default function MailingListForm({
  location = 'body',
}: MailingListFormProps) {
  const [subscribeMessage, setSubscribeMessage] = useState('');

  // Clear message after 3 seconds
  useEffect(() => {
    if (subscribeMessage) {
      const timer = setTimeout(() => {
        setSubscribeMessage('');
      }, 3000);

      // Cleanup timer if component unmounts or message changes
      return () => clearTimeout(timer);
    }
  }, [subscribeMessage]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const result = await subscribeToMailingList(formData);

    if (result && 'error' in result) {
      // Handle error
      setSubscribeMessage('Sorry, please try again.');
    } else {
      // Handle success
      setSubscribeMessage('Thank you for subscribing');

      if (e.currentTarget) {
        e.currentTarget.reset();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${cn(location == 'footer' ? 'h-8 text-sm' : 'h-10 text-base', 'm-0 flex justify-center bg-transparent p-0 shadow-none')}`}
    >
      {subscribeMessage && <Text variant="small">{subscribeMessage}</Text>}

      <div className="flex flex-col space-x-2 sm:flex-row">
        <input
          className="sm:my-0"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <Button className="sm:my-0" type="submit">
          Subscribe
        </Button>
      </div>
    </form>
  );
}
