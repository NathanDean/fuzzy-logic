'use client';

import { useState, useEffect } from 'react';
import { subscribeToMailingList } from '@/app/actions/mailingList';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const result = await subscribeToMailingList(formData);

    if (result?.error) {
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
      className={`${isInFooter && 'text-sm'} m-0 p-0 shadow-none`}
    >
      {subscribeMessage && <p>{subscribeMessage}</p>}
      <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0">
        <input
          className={`${isInFooter && 'h-8'} my-0`}
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <button
          className={`${isInFooter && 'h-8 text-sm'} btn btn-primary my-0 `}
          type="submit"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}
