export interface Booking {
  id: string;
  created_at: string;
  workshop_id: string;
  user_id: string;
  status: string;
  session_id: string;
  workshop_details: {
    id: string;
    class_name: string;
    venue: string;
    date: string;
    start_time: string;
  };
}
