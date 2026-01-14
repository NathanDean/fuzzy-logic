import type Workshop from './Workshop';

export default interface Booking {
  id: string;
  created_at: string;
  workshop_id: string;
  user_id: string;
  status: string;
  session_id: string;
  workshop: Workshop;
}
