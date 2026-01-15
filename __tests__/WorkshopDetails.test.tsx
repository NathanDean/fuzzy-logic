import WorkshopDetails from '@/app/(main)/workshops/[workshopId]/page';
import '@testing-library/jest-dom';

import { WorkshopWithRemainingPlaces } from '@/utils/types/Workshop';

jest.mock('@/utils/supabase/serverClient', () => ({
  createClient: jest.fn().mockResolvedValue({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          limit: jest.fn(() => ({
            single: jest.fn().mockResolvedValue({
              data: {
                id: 1,
                created_at: '2025-04-01T12:00:00Z',
                class_name: 'Intro to Testing',
                date: '2025-04-18',
                start_time: '18:00:00',
                end_time: '21:00:00',
                venue: 'Test Theatre',
                price: 100,
                max_places_available: 12,
                description: 'A workshop about testing',
                bookings: [{ count: 2 }],
              },

              error: null,
            }),
          })),
        })),
      })),
    })),
  }),
}));

// Mock client wrapper component
jest.mock(
  '@/app/(main)/workshops/[workshopId]/WorkshopDetailsClientWrapper',
  () => {
    return function MockedWrapper({
      workshop,
    }: {
      workshop: WorkshopWithRemainingPlaces;
    }) {
      return workshop; // Return props for testing
    };
  }
);

describe('WorkshopDetails', () => {
  it('passes correct workshop data to client wrapper', async () => {
    const params = Promise.resolve({ workshopId: '001' });
    const component = await WorkshopDetails({ params });
    const clientWrapper = component.props.children;
    const workshop = clientWrapper.props.workshop;

    // Test the props passed to the client wrapper
    expect(workshop).toHaveProperty('class_name', 'Intro to Testing');
    expect(workshop).toHaveProperty('venue', 'Test Theatre');
    expect(workshop).toHaveProperty('price', 100);
    expect(workshop).toHaveProperty('description', 'A workshop about testing');
    expect(workshop).toHaveProperty('venue', 'Test Theatre');
    expect(workshop).toHaveProperty('start_time', '18:00:00');
    expect(workshop).toHaveProperty('end_time', '21:00:00');
    expect(workshop).toHaveProperty('max_places_available', 12);
    expect(workshop).toHaveProperty('bookings', [{ count: 2 }]);
  });

  it('calculates places_remaining correctly', async () => {
    const params = Promise.resolve({ workshopId: '001' });
    const component = await WorkshopDetails({ params });
    const clientWrapper = component.props.children;
    const workshop = clientWrapper.props.workshop;
    expect(workshop).toHaveProperty('places_remaining', 10);
  });
});
