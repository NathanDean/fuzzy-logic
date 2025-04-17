import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import "@testing-library/jest-dom";

jest.mock("@/utils/supabase/client", () => ({

    createClient: jest.fn(() => ({

        auth: {

            getUser: jest.fn().mockResolvedValue({

                data: {

                    user: {

                        id: "test-user-id",
                        email: "test@test.com"

                    }

                }

            }),

            onAuthStateChange: jest.fn().mockReturnValue({

                data: {

                    subscription: {

                        unsubscribe: jest.fn()

                    }

                }

            }),

            signOut: jest.fn().mockResolvedValue({})
            
        }

    }))

}));

const TestComponent = () => {

    const { user, isLoading, isLoggedIn, signOut } = useAuth();

    return (

        <div>

            <div data-testid = "loading-state">{isLoading.toString()}</div>

            <div data-testid = "logged-in-state">{isLoggedIn.toString()}</div>

            <div data-testid = "user-email">{user?.email || "no user"}</div>

            <button data-testid = "sign-out-button" onClick = {signOut}>Sign out</button>

        </div>

    )

}

describe("AuthContext", () => {

    it("provides correct initial auth state to components", () => {

        render(

            <AuthProvider>

                <TestComponent />

            </AuthProvider>
            
        );

        expect(screen.getByTestId("loading-state").textContent).toBe("true");
        expect(screen.getByTestId("logged-in-state").textContent).toBe("false");
        expect(screen.getByTestId("user-email").textContent).toBe("no user");

    })

    it("updates state correctly after authentication", async () => {

        render(

            <AuthProvider>

                <TestComponent />

            </AuthProvider>
            
        );

        await act(async () => {

            await new Promise(resolve => setTimeout(resolve, 0));

        });

        expect(screen.getByTestId("loading-state").textContent).toBe("false");
        expect(screen.getByTestId("logged-in-state").textContent).toBe("true");
        expect(screen.getByTestId("user-email").textContent).toBe("test@test.com");


    });

    it("updates state correctly after sign out", async () => {

        render(

            <AuthProvider>

                <TestComponent />

            </AuthProvider>
            
        );

        await act(async () => {

            await new Promise(resolve => setTimeout(resolve, 0));

        });

        expect(screen.getByTestId("logged-in-state").textContent).toBe("true");

        await act(async () => {

            screen.getByTestId("sign-out-button").click();

        })

        expect(screen.getByTestId("logged-in-state").textContent).toBe("false");
        expect(screen.getByTestId("user-email").textContent).toBe("no user");

    })

});