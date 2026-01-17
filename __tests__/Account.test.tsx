import Account from '@/app/account/page';
import '@testing-library/jest-dom';

import { mockBookingData } from '../__fixtures__/Booking';
import { mockUserData } from '../__fixtures__/User';

const mockGetUser = jest.fn();
const mockRedirect = jest.fn();
jest.mock('next/navigation', () => ({
  redirect: (path: string) => mockRedirect(path),
}));

// Supabase client mock
jest.mock('@/utils/supabase/serverClient', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: mockGetUser,
    },
    from: jest.fn(() => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            gte: () => ({
              order: () => ({
                order: () => Promise.resolve({ data: mockBookingData }),
              }),
            }),
          }),
        }),
      }),
    })),
  })),
}));

describe('Account', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects user to login page when not logged in', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
    });

    try {
      await Account();
    } catch {}

    expect(mockRedirect).toHaveBeenCalledWith('/login');
  });

  it('passes correct user data to client wrapper when user is logged in', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUserData } });

    const component = await Account();
    const clientWrapper = component.props.children;
    const user = clientWrapper.props.user;
    const bookings = clientWrapper.props.bookings;

    expect(user.email).toBe('m.corrigan@jlb-credit.com');
    expect(user.user_metadata.first_name).toBe('Mark');
    expect(user.user_metadata.last_name).toBe('Corrigan');
    expect(bookings[0].id).toBe('test-booking-id');
    expect(bookings[0].workshop_details.id).toBe('test-workshop-id');
  });
});
