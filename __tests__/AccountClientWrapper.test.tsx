import AccountClientWrapper from '@/app/account/AccountClientWrapper';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

const mockUserData = {
  id: 'test-user-id',
  email: 'm.corrigan@jlb-credit.com',
  user_metadata: {
    first_name: 'Mark',
    last_name: 'Corrigan',
  },
};

const mockBookingData = [
  {
    id: 'test-booking-id',
    created_at: '2025-05-10 22:37:58.966912+00',
    workshop_id: 'test-workshop-id',
    user_id: 'test-user-id',
    status: 'confirmed',
    session_id: 'test-session-id',
    workshop: {
      id: '1',
      created_at: '2025-04-01T12:00:00Z',
      class_name: 'Intro to Testing',
      teacher: 'Mark Corrigan',
      course_type: '2 week course, Saturday afternoons',
      date: new Date().toISOString().split('T')[0],
      start_time: '18:00:00',
      end_time: '21:00:00',
      venue: 'Test Theatre',
      price: 100,
      max_places_available: 12,
      description: 'A workshop about testing.',
      image_url: 'an_honourable_man.png',
      on_sale: true,
    },
  },
];

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
