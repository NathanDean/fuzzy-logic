import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { render, screen, act, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom";

jest.mock("@/contexts/AuthContext", () => ({

    useAuth: jest.fn()

}));

describe("Header", () => {

    beforeEach(() => {

        jest.clearAllMocks();

    });

    it("renders correctly when user is logged out", () => {

        (useAuth as jest.Mock).mockImplementation(() => ({

            isLoggedIn: false

        }));

        render(<Header />);

        expect(screen.getByRole("link", { name: "fuzzy logic"})).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Workshops"})).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "About"})).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Login"})).toBeInTheDocument();

    });

    it("renders correctly when user is logged in", () => {

        (useAuth as jest.Mock).mockImplementation(() => ({

            isLoggedIn: true,
            signOut: jest.fn()

        }));

        render(<Header />);

        expect(screen.getByRole("link", { name: "fuzzy logic"})).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Workshops"})).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "About"})).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Account"})).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Logout"})).toBeInTheDocument();

    });

    it("signs user out when logout button is clicked", async () => {

        let isUserLoggedIn = true;

        const mockSignOut = jest.fn().mockImplementation(async () => {

            isUserLoggedIn = false;

            (useAuth as jest.Mock).mockImplementation(() => ({

                isLoggedIn: isUserLoggedIn,
                signOut: mockSignOut
    
            }));

        });

        (useAuth as jest.Mock).mockImplementation(() => ({

            isLoggedIn: isUserLoggedIn,
            signOut: mockSignOut

        }));

        const { rerender } = render(<Header />);

        expect(screen.getByRole("link", { name: "Account"})).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();

        await act(async () => {

            fireEvent.click(screen.getByRole("button", { name: "Logout" }));

        });

        rerender(<Header />);

        expect(screen.queryByRole("link", { name: "Account"})).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Logout" })).not.toBeInTheDocument();

    });

    it("toggles mobile menu when user clicks menu button", async () => {

        render(<Header />);

        const toggleButton = screen.getByRole("button", { name: "Toggle menu"});

        expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();

        fireEvent.click(toggleButton);

        expect(screen.queryByTestId("mobile-menu")).toBeInTheDocument();

        fireEvent.click(toggleButton);

        // Wait for animation to complete
        await waitFor(() => {

            expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();

        }, { timeout: 1000 });

    });

});