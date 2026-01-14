export interface Workshop {
  id: string;
  created_at: string;
  class_name: string;
  date: string;
  start_time: string;
  end_time: string;
  venue: string;
  description: string;
  price: number;
  max_places_available: number;
  course_type: string;
  image_url: string;
  teacher: string;
  on_sale: boolean;
}

export interface WorkshopWithRemainingPlaces extends Workshop {
  places_remaining: number;
}
