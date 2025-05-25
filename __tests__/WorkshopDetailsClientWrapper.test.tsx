import "@testing-library/jest-dom";
import { render, screen, act, fireEvent } from "@testing-library/react"
import WorkshopDetailsClientWrapper from "@/app/workshops/[workshopId]/WorkshopDetailsClientWrapper";

// AuthContext mock
jest.mock("@/contexts/AuthContext", () => ({

    useAuth: () => ({
    
        isLoggedIn: true,
    
        user: { id: "test-user-id" }
    
    })

}));

// Stripe createCheckoutSession mock
jest.mock("@/app/actions/stripe", () => ({

    createCheckoutSession: jest.fn().mockResolvedValue({ url: "https://stripe.com/checkout" })

}));

const mockCreateCheckoutSession = require("@/app/actions/stripe").createCheckoutSession;

// Workshop details
const workshopDetails = {

    id: "1",
    created_at: "2025-04-01T12:00:00Z",
    class_name: "Intro to Testing",
    teacher: "Mark Corrigan",
    course_type: "2 week course, Saturday afternoons",
    date: "2025-04-18",
    start_time: "18:00:00",
    end_time: "21:00:00",
    venue: "Test Theatre",
    price: 100,
    max_places_available: 12,
    image_url: "test-image.jpg",
    description: "Lorem ipsum",
    bookings: 10 

}

describe("WorkshopDetailsClientWrapper", () => {

    beforeEach(() => {
       
        jest.clearAllMocks();
    
    });

    it("displays workshop with correct details", () => {

        render (<WorkshopDetailsClientWrapper workshop = {workshopDetails} />)

        expect(screen.getByText("Intro to Testing")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "with Mark Corrigan"})).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "2 week course, Saturday afternoons"})).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Begins 6pm on Fri 18 Apr at Test Theatre"})).toBeInTheDocument();
        expect(screen.getByText("Lorem ipsum")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Book now" })).toBeInTheDocument();

    })

    it("calls createCheckoutSession with correct details when user clicks Book Now button", async () => {

        render(<WorkshopDetailsClientWrapper workshop = {workshopDetails} />);

        await act(async() => {

            await new Promise(resolve => setTimeout(resolve, 0))

        });

        const bookNowButton = screen.getAllByRole("button", { name: "Book now" })[0];
        fireEvent.click(bookNowButton);
        
        expect(mockCreateCheckoutSession).toHaveBeenCalledWith("1", "test-user-id");

    })


})