import type { RawWorkshop, Workshop } from '@/types/Workshop';

export function formatWorkshop(workshop: RawWorkshop): Workshop {
  const places_remaining =
    workshop.max_places_available - (workshop.bookings?.[0]?.count || 0);

  return {
    ...workshop,
    places_remaining: places_remaining,
    is_sold_out: places_remaining > 0 ? false : true,
  };
}
