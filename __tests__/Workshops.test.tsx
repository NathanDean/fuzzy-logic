import "@testing-library/jest-dom";
import { render, screen, act, fireEvent } from "@testing-library/react"
import Workshops from "@/app/workshops/page";

// AuthContext mock
jest.mock("@/contexts/AuthContext", () => ({

    useAuth: () => ({
    
        isLoggedIn: true,
    
        user: { id: "test-user-id" }
    
    })

}));

// Supabase client mock
jest.mock("@/utils/supabase/supabaseClient", () => ({

        from: jest.fn(() => ({

            select: jest.fn().mockResolvedValue({

                data: [

                    {

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
                        description: "Lorem ipsum",
                        bookings: [{ count: 10 }]

                    },
                    {

                        id: "2",
                        created_at: "2025-04-01T12:00:00Z",
                        class_name: "Advanced Testing",
                        teacher: "Alan Johnson",
                        course_type: "8 week course, Tuesday evenings",
                        date: "2025-04-19",
                        start_time: "18:00:00",
                        end_time: "21:00:00",
                        venue: "The New Test Theatre",
                        price: 100,
                        max_places_available: 12,
                        description: "Slorem slipsum",
                        bookings: [{ count: 12 }]

                    }

                ],

                error: null

            })

        }))

    }

))

// Stripe createCheckoutSession mock
jest.mock("@/app/actions/stripe", () => ({

    createCheckoutSession: jest.fn().mockResolvedValue({ url: "https://stripe.com/checkout" })

}));

const mockCreateCheckoutSession = require("@/app/actions/stripe").createCheckoutSession;

describe("Workshops", () => {

    beforeEach(() => {
       
        jest.clearAllMocks();
    
    });

    it("initially displays loading state", () => {

        render(<Workshops />);

        expect(screen.getByText("loading...")).toBeInTheDocument();

    });

    it("displays workshops after loading from Supabase", async () => {

        render(<Workshops />);

        await act(async () => {

            await new Promise(resolve => setTimeout(resolve, 0));

        });

        expect(screen.getByText("Intro to Testing")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "with Mark Corrigan"})).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Begins 6pm on Fri 18 Apr at Test Theatre"})).toBeInTheDocument();
        expect(screen.getByText("Advanced Testing")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "with Alan Johnson"})).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Begins 6pm on Sat 19 Apr at The New Test Theatre"})).toBeInTheDocument();

        const bookingButton = screen.getAllByRole("button");
        expect(bookingButton).toHaveLength(2);

        const moreInfoLinks = screen.getAllByRole("link", {name: "More info"});
        expect(moreInfoLinks).toHaveLength(2);

    });

    it("enables Book Now button when workshop.bookings < workshop.places_available", async () => {

        render(<Workshops />);

        await act(async () => {

            await new Promise(resolve => setTimeout(resolve, 0))

        })

        expect(screen.getByRole("button", { name: "Book now" })).toBeEnabled();
        expect(screen.getByRole("button", { name: "Sold out" })).toBeDisabled();


    });

    it("calls createCheckoutSession with correct details when user clicks Book Now button", async () => {

        render(<Workshops />);

        await act(async() => {

            await new Promise(resolve => setTimeout(resolve, 0))

        });

        const bookNowButton = screen.getAllByRole("button", { name: "Book now" })[0];
        fireEvent.click(bookNowButton);
        
        expect(mockCreateCheckoutSession).toHaveBeenCalledWith("1", "test-user-id");

    })

});