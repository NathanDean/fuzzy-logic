import Workshops from '@/app/(main)/workshops/page';
import '@testing-library/jest-dom';

import { WorkshopWithRemainingPlaces } from '@/utils/types/Workshop';

// AuthContext mock
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    isLoggedIn: true,

    user: { id: 'test-user-id' },
  }),
}));

// Supabase client mock
jest.mock('@/utils/supabase/serverClient', () => ({
  createClient: jest.fn().mockResolvedValue({
    from: () => ({
      select: () => ({
        gte: () => ({
          eq: () => ({
            order: () =>
              Promise.resolve({
                data: [
                  {
                    id: '1',
                    created_at: '2025-04-01T12:00:00Z',
                    class_name: 'Intro to Testing',
                    teacher: 'Mark Corrigan',
                    course_type: '2 week course, Saturday afternoons',
                    date: '2026-01-16',
                    start_time: '18:00:00',
                    end_time: '21:00:00',
                    venue: 'Test Theatre',
                    price: 100,
                    max_places_available: 12,
                    description: 'A workshop about testing.',
                    image_url: 'an_honourable_man.png',
                    on_sale: true,
                    bookings: [{ count: 10 }],
                  },
                  {
                    id: '2',
                    created_at: '2025-04-01T12:00:00Z',
                    class_name: 'Advanced Testing',
                    teacher: 'Alan Johnson',
                    course_type: '8 week course, Tuesday evenings',
                    date: '2026-01-16',
                    start_time: '18:00:00',
                    end_time: '21:00:00',
                    venue: 'The New Test Theatre',
                    price: 100,
                    max_places_available: 12,
                    description: 'Slorem slipsum.',
                    image_url: 'fwonkfort.jpg',
                    on_sale: true,
                    bookings: [{ count: 12 }],
                  },
                ],

                error: null,
              }),
          }),
        }),
      }),
    }),
  }),
}));

// Mock client wrapper component
jest.mock('@/app/(main)/workshops/WorkshopsClientWrapper', () => {
  return function MockedWrapper({
    workshops,
  }: {
    workshops: WorkshopWithRemainingPlaces[];
  }) {
    return workshops; // Return props for testing
  };
});

it('passes correct workshops data to client wrapper', async () => {
  const component = await Workshops();
  const clientWrapper = component.props.children;
  const workshops = clientWrapper.props.workshops;

  // Test the props passed to the client wrapper
  expect(workshops[0]).toHaveProperty('class_name', 'Intro to Testing');
  expect(workshops[0]).toHaveProperty('teacher', 'Mark Corrigan');
  expect(workshops[0]).toHaveProperty(
    'course_type',
    '2 week course, Saturday afternoons'
  );
  expect(workshops[0]).toHaveProperty('venue', 'Test Theatre');
  expect(workshops[0]).toHaveProperty('start_time', '18:00:00');
  expect(workshops[0]).toHaveProperty('end_time', '21:00:00');
  expect(workshops[0]).toHaveProperty('price', 100);
  expect(workshops[0]).toHaveProperty(
    'description',
    'A workshop about testing.'
  );
  expect(workshops[0]).toHaveProperty('max_places_available', 12);
  expect(workshops[0]).toHaveProperty('bookings', [{ count: 10 }]);

  expect(workshops[1]).toHaveProperty('class_name', 'Advanced Testing');
  expect(workshops[1]).toHaveProperty('teacher', 'Alan Johnson');
  expect(workshops[1]).toHaveProperty(
    'course_type',
    '8 week course, Tuesday evenings'
  );
  expect(workshops[1]).toHaveProperty('venue', 'The New Test Theatre');
  expect(workshops[1]).toHaveProperty('start_time', '18:00:00');
  expect(workshops[1]).toHaveProperty('end_time', '21:00:00');
  expect(workshops[1]).toHaveProperty('price', 100);
  expect(workshops[1]).toHaveProperty('description', 'Slorem slipsum.');
  expect(workshops[1]).toHaveProperty('max_places_available', 12);
  expect(workshops[1]).toHaveProperty('bookings', [{ count: 12 }]);
});

describe('Workshops', () => {
  it('calculates places_remaining correctly', async () => {
    const component = await Workshops();
    const clientWrapper = component.props.children;
    const workshops = clientWrapper.props.workshops;

    expect(workshops[0].places_remaining).toBe(2);
    expect(workshops[1].places_remaining).toBe(0);
  });
});
