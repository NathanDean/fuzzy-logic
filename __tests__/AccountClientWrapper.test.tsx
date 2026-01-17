import AccountClientWrapper from '@/app/account/AccountClientWrapper';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

import { mockBookingData } from '../__fixtures__/Booking';

const mockUserData = {
  id: 'test-user-id',
  email: 'm.corrigan@jlb-credit.com',
  user_metadata: {
    first_name: 'Mark',
    last_name: 'Corrigan',
  },
};

describe('AccountClientWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  render(
    <AccountClientWrapper user={mockUserData} bookings={mockBookingData} />
  );

  it('displays user data correctly', async () => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Name: Mark Corrigan')).toBeInTheDocument();
    expect(
      screen.getByText('Email: m.corrigan@jlb-credit.com')
    ).toBeInTheDocument();
    expect(screen.getByText('Upcoming workshops:')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
