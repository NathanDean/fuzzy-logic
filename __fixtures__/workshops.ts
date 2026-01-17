import {
  formatWorkshop,
  type RawWorkshop,
  type Workshop,
} from '@/utils/types/Workshop';

const mockRawWorkshopsData: RawWorkshop[] = [
  {
    id: '1',
    created_at: '2025-04-01T12:00:00Z',
    class_name: 'Intro to Testing',
    teacher: 'Mark Corrigan',
    venue: 'Test Theatre',
    description: 'A workshop about testing.',
    course_type: '2 week course, Saturday afternoons',
    image_url: 'an_honourable_man.png',
    date: '2026-01-16',
    start_time: '18:00:00',
    end_time: '21:00:00',
    price: 100,
    is_on_sale: true,
    max_places_available: 12,
    bookings: [{ count: 10 }],
  },
  {
    id: '2',
    created_at: '2025-04-01T12:00:00Z',
    class_name: 'Advanced Testing',
    teacher: 'Alan Johnson',
    venue: 'The New Test Theatre',
    description: 'Slorem slipsum.',
    course_type: '8 week course, Tuesday evenings',
    image_url: 'fwonkfort.jpg',
    date: '2026-01-16',
    start_time: '18:00:00',
    end_time: '21:00:00',
    price: 100,
    is_on_sale: true,
    max_places_available: 12,
    bookings: [{ count: 12 }],
  },
];

export const mockWorkshopsData: Workshop[] = mockRawWorkshopsData.map(
  (workshop) => formatWorkshop(workshop)
);
