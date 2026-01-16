import Account from '@/app/account/page';
import '@testing-library/jest-dom';

const mockGetUser = jest.fn();
const mockRedirect = jest.fn();
jest.mock('next/navigation', () => ({
  redirect: (path: string) => mockRedirect(path),
}));

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
      id: 'test-workshop-id',
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
    expect(bookings[0].workshop.id).toBe('test-workshop-id');
  });
});
