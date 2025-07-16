'use client';

import { useState, useEffect } from 'react';
import { subscribeToMailingList } from '@/app/actions/mailingList';

export default function MailingListForm() {
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
    <form onSubmit={handleSubmit} className="m-0 p-0 shadow-none text-sm">
      {subscribeMessage && <p>{subscribeMessage}</p>}
      <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0">
        <input
          className="sm:my-0 sm:h-8"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <button
          className="btn btn-primary sm:my-0 text-sm sm:h-8"
          type="submit"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}
