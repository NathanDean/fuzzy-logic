'use client';

import { useEffect, useState } from 'react';

import { subscribeToMailingList } from '@/actions/mailingList';

import cn from '@/utils/style/cn';

import Button from '../ui/Button';
import Text from '../ui/Text';

interface MailingListFormProps {
  isInFooter?: boolean;
}

export default function MailingListForm({
  isInFooter = false,
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
      className={`${isInFooter && 'text-sm'} m-0 bg-transparent p-0 shadow-none`}
    >
      {subscribeMessage && <Text variant="small">{subscribeMessage}</Text>}
      <div className="flex w-full flex-col items-stretch space-y-2 sm:w-auto sm:flex-row sm:space-y-0 sm:space-x-2">
        <input
          className={`${isInFooter && 'h-8'} my-0`}
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <Button
          className={`${cn(isInFooter && 'h-8', 'sm:my-0')}`}
          type="submit"
        >
          <Text
            className={`${cn(isInFooter && 'h-8', 'flex items-center sm:my-0')}`}
            variant={isInFooter ? 'small' : 'medium'}
            as="span"
          >
            Subscribe
          </Text>
        </Button>
      </div>
    </form>
  );
}
