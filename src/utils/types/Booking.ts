import type { Workshop } from './Workshop';

export interface Booking {
  id: string;
  created_at: string;
  workshop_id: string;
  user_id: string;
  status: string;
  session_id: string;
}

export interface BookingWithWorkshopDetails extends Booking {
  workshop: Workshop;
}
