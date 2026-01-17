import { Booking } from '@/types/Booking';

export const mockBookingData: Booking[] = [
  {
    id: 'test-booking-id',
    created_at: '2025-05-10 22:37:58.966912+00',
    workshop_id: 'test-workshop-id',
    user_id: 'test-user-id',
    status: 'confirmed',
    session_id: 'test-session-id',
    workshop_details: {
      id: 'test-workshop-id',
      class_name: 'Intro to Testing',
      date: '2026-01-16',
      start_time: '18:00:00',
      venue: 'Test Theatre',
    },
  },
];
