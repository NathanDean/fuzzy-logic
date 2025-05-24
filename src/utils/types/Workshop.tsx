export interface Workshop {

    id: string,
    created_at: string,
    class_name: string,
    teacher: string,
    course_type: string,
    date: string,
    start_time: string,
    end_time: string,
    venue: string,
    price: number,
    max_places_available: number,
    image_url: string
    description: string,
    bookings: number

}