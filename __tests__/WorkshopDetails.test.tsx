import "@testing-library/jest-dom";
import WorkshopDetails from "@/app/workshops/[workshopId]/page";

jest.mock("@/utils/supabase/server", () => ({

    createClient: jest.fn().mockResolvedValue({

        from: jest.fn(() => ({

            select: jest.fn(() => ({
    
                eq: jest.fn(() => ({
    
                    single: jest.fn().mockResolvedValue({
    
                        data: {
    
                            id: 1,
                            created_at: "2025-04-01T12:00:00Z",
                            class_name: "Intro to Testing",
                            date: "2025-04-18",
                            start_time: "18:00:00",
                            end_time: "21:00:00",
                            venue: "Test Theatre",
                            description: "A workshop about testing"
    
                        },
    
                        error: null
    
                    })
    
                }))
                
            }))
    
        }))

    })

}))

describe("WorkshopDetails", () => {

    it("displays correct workshop details", async () => {

        // Different approach to other tests as usual approach to async/await doesn't work in server components
        const params = Promise.resolve({ workshopId: "001" });
        const component = await WorkshopDetails({params});

        const stringifiedComponent = JSON.stringify(component);

        expect(stringifiedComponent).toContain("Intro to Testing");
        expect(stringifiedComponent).toContain("6pm on Fri 18th Apr");
        expect(stringifiedComponent).toContain("Test Theatre");
        expect(stringifiedComponent).toContain("Book now");
        expect(stringifiedComponent).toContain("A workshop about testing");

    })

})