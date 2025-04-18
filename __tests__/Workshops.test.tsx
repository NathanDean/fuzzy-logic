import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react"
import Workshops from "@/app/workshops/page";

jest.mock("@/utils/supabase/supabaseClient", () => ({

        from: jest.fn(() => ({

            select: jest.fn().mockResolvedValue({

                data: [

                    {

                        id: 1,
                        created_at: "2025-04-01T12:00:00Z",
                        class_name: "Intro to Testing",
                        date: "2025-04-18",
                        start_time: "18:00:00",
                        end_time: "21:00:00",
                        venue: "Test Theatre"

                    },
                    {

                        id: 2,
                        created_at: "2025-04-01T12:00:00Z",
                        class_name: "Advanced Testing",
                        date: "2025-04-19",
                        start_time: "18:00:00",
                        end_time: "21:00:00",
                        venue: "The New Test Theatre"

                    }

                ],

                error: null

            })

        }))

    }

))

describe("Workshops", () => {

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
        expect(screen.getByText("Test Theatre")).toBeInTheDocument();
        expect(screen.getByText("6pm on Fri 18th Apr")).toBeInTheDocument();
        expect(screen.getByText("Advanced Testing")).toBeInTheDocument();
        expect(screen.getByText("The New Test Theatre")).toBeInTheDocument();
        expect(screen.getByText("6pm on Sat 19th Apr")).toBeInTheDocument();

        const bookNowLinks = screen.getAllByRole("button", {name: "Book now"});
        expect(bookNowLinks).toHaveLength(2);

        const moreInfoLinks = screen.getAllByRole("link", {name: "More info"});
        expect(moreInfoLinks).toHaveLength(2);

    });

});