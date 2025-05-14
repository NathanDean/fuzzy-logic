import "@testing-library/jest-dom";
import WorkshopDetails from "@/app/workshops/[workshopId]/page";

interface Workshop {

    id: string,
    created_at: string,
    class_name: string,
    date: string,
    start_time: string,
    end_time: string,
    venue: string,
    price: number,
    max_places_available: number,
    description: string,
    bookings: number

}

jest.mock("@/utils/supabase/server", () => ({

    createClient: jest.fn().mockResolvedValue({

        from: jest.fn(() => ({

            select: jest.fn(() => ({
    
                eq: jest.fn(() => ({

                    limit: jest.fn(() => ({

                        single: jest.fn().mockResolvedValue({
        
                            data: {
        
                                id: 1,
                                created_at: "2025-04-01T12:00:00Z",
                                class_name: "Intro to Testing",
                                date: "2025-04-18",
                                start_time: "18:00:00",
                                end_time: "21:00:00",
                                venue: "Test Theatre",
                                price: 100,
                                max_places_available: 12,
                                description: "A workshop about testing",
                                bookings: [{ count: 2 }]
        
                            },
        
                            error: null
        
                        })

                    }))
    
                }))
                
            }))
    
        }))

    })

}))

// Mock client wrapper component
jest.mock("@/app/workshops/[workshopId]/WorkshopDetailsClientWrapper", () => {
  
    return function MockedWrapper({ workshop }: { workshop: Workshop }) {
  
        return workshop; // Just return the props for testing
  
    };

});

describe("WorkshopDetails", () => {

  it("passes correct workshop data to client wrapper", async () => {

    const params = Promise.resolve({ workshopId: "001" });
    const component = await WorkshopDetails({ params });
    
    // Test the props passed to the client wrapper
    const props = component.props;
    expect(props).toHaveProperty("workshop");
    expect(props.workshop).toHaveProperty("class_name", "Intro to Testing");
    expect(props.workshop).toHaveProperty("venue", "Test Theatre");
    expect(props.workshop).toHaveProperty("price", 100);
    expect(props.workshop).toHaveProperty("description", "A workshop about testing");
    expect(props.workshop).toHaveProperty("max_places_available", 12)
    expect(props.workshop).toHaveProperty("bookings", 2);
  
});

})