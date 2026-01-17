export interface RawWorkshop {
  id: string;
  created_at: string;
  class_name: string;
  teacher: string;
  venue: string;
  description: string;
  course_type: string;
  image_url: string;
  date: string;
  start_time: string;
  end_time: string;
  price: number;
  is_on_sale: boolean;
  max_places_available: number;
  bookings: [{ count: number }];
}

export interface Workshop extends RawWorkshop {
  places_remaining: number;
  is_sold_out: boolean;
}
