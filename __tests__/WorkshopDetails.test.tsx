import WorkshopDetails from '@/app/(main)/workshops/[workshopId]/page';
import '@testing-library/jest-dom';

import { Workshop } from '@/utils/types/Workshop';

import { mockWorkshopsData } from '../__fixtures__/workshops';

jest.mock('@/utils/supabase/serverClient', () => ({
  createClient: jest.fn().mockResolvedValue({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          limit: jest.fn(() => ({
            single: jest.fn().mockResolvedValue({
              data: mockWorkshopsData[0],
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
    return function MockedWrapper({ workshop }: { workshop: Workshop }) {
      return workshop; // Return props for testing
    };
  }
);

describe('WorkshopDetails', () => {
  it('passes correct workshop data to client wrapper', async () => {
    // Get props
    const params = Promise.resolve({ workshopId: '001' });
    const component = await WorkshopDetails({ params });
    const clientWrapper = component.props.children;
    const workshop = clientWrapper.props.workshop;

    // Test props
    expect(workshop).toHaveProperty('id', '1');
    expect(workshop).toHaveProperty('created_at', '2025-04-01T12:00:00Z');
    expect(workshop).toHaveProperty('class_name', 'Intro to Testing');
    expect(workshop).toHaveProperty('teacher', 'Mark Corrigan');
    expect(workshop).toHaveProperty('venue', 'Test Theatre');
    expect(workshop).toHaveProperty('description', 'A workshop about testing.');
    expect(workshop).toHaveProperty(
      'course_type',
      '2 week course, Saturday afternoons'
    );
    expect(workshop).toHaveProperty('image_url', 'an_honourable_man.png');
    expect(workshop).toHaveProperty('date', '2026-01-16');
    expect(workshop).toHaveProperty('start_time', '18:00:00');
    expect(workshop).toHaveProperty('end_time', '21:00:00');
    expect(workshop).toHaveProperty('price', 100);
    expect(workshop).toHaveProperty('is_on_sale', true);
    expect(workshop).toHaveProperty('max_places_available', 12);
    expect(workshop).toHaveProperty('bookings', [{ count: 10 }]);
    expect(workshop).toHaveProperty('places_remaining', 2);
    expect(workshop).toHaveProperty('is_sold_out', false);
  });
});
