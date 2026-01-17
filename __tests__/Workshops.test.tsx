import Workshops from '@/app/(main)/workshops/page';
import '@testing-library/jest-dom';

import { Workshop } from '@/utils/types/Workshop';

import { mockWorkshopsData } from '../__fixtures__/workshops';

// Supabase client mock
jest.mock('@/lib/supabase/serverClient', () => ({
  createClient: jest.fn().mockResolvedValue({
    from: () => ({
      select: () => ({
        gte: () => ({
          eq: () => ({
            order: () =>
              Promise.resolve({
                data: mockWorkshopsData,
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
  return function MockedWrapper({ workshops }: { workshops: Workshop[] }) {
    return workshops; // Return props for testing
  };
});

describe('Workshops', () => {
  it('passes correct workshops data to client wrapper', async () => {
    // Get props
    const component = await Workshops();
    const clientWrapper = component.props.children;
    const workshops = clientWrapper.props.workshops;

    // Test props
    expect(workshops[0]).toHaveProperty('id', '1');
    expect(workshops[0]).toHaveProperty('created_at', '2025-04-01T12:00:00Z');
    expect(workshops[0]).toHaveProperty('class_name', 'Intro to Testing');
    expect(workshops[0]).toHaveProperty('teacher', 'Mark Corrigan');
    expect(workshops[0]).toHaveProperty('venue', 'Test Theatre');
    expect(workshops[0]).toHaveProperty(
      'description',
      'A workshop about testing.'
    );
    expect(workshops[0]).toHaveProperty(
      'course_type',
      '2 week course, Saturday afternoons'
    );
    expect(workshops[0]).toHaveProperty('image_url', 'an_honourable_man.png');
    expect(workshops[0]).toHaveProperty('date', '2026-01-16');
    expect(workshops[0]).toHaveProperty('start_time', '18:00:00');
    expect(workshops[0]).toHaveProperty('end_time', '21:00:00');
    expect(workshops[0]).toHaveProperty('price', 100);
    expect(workshops[0]).toHaveProperty('is_on_sale', true);
    expect(workshops[0]).toHaveProperty('max_places_available', 12);
    expect(workshops[0]).toHaveProperty('bookings', [{ count: 10 }]);
    expect(workshops[0]).toHaveProperty('places_remaining', 2);
    expect(workshops[0]).toHaveProperty('is_sold_out', false);

    expect(workshops[1]).toHaveProperty('id', '2');
    expect(workshops[1]).toHaveProperty('created_at', '2025-04-01T12:00:00Z');
    expect(workshops[1]).toHaveProperty('class_name', 'Advanced Testing');
    expect(workshops[1]).toHaveProperty('teacher', 'Alan Johnson');
    expect(workshops[1]).toHaveProperty('venue', 'The New Test Theatre');
    expect(workshops[1]).toHaveProperty('description', 'Slorem slipsum.');
    expect(workshops[1]).toHaveProperty(
      'course_type',
      '8 week course, Tuesday evenings'
    );
    expect(workshops[1]).toHaveProperty('image_url', 'fwonkfort.jpg');
    expect(workshops[1]).toHaveProperty('date', '2026-01-16');
    expect(workshops[1]).toHaveProperty('start_time', '18:00:00');
    expect(workshops[1]).toHaveProperty('end_time', '21:00:00');
    expect(workshops[1]).toHaveProperty('price', 100);
    expect(workshops[1]).toHaveProperty('is_on_sale', true);
    expect(workshops[1]).toHaveProperty('max_places_available', 12);
    expect(workshops[1]).toHaveProperty('bookings', [{ count: 12 }]);
    expect(workshops[1]).toHaveProperty('places_remaining', 0);
    expect(workshops[1]).toHaveProperty('is_sold_out', true);
  });
});
