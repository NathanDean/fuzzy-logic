import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import Account from "@/app/account/page";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

jest.mock("@/contexts/AuthContext", () => ({
    
    useAuth: jest.fn()
  
}));

describe("Account", () => {

    beforeEach(() => {

        jest.clearAllMocks();

    });

    it("redirects user to login page when not logged in", async () => {

        (useAuth as jest.Mock).mockImplementation(() => ({

            isLoggedIn: false,
            isLoading: false,
            user: null

        }));

        const mockRouter = { push: jest.fn() };

        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        render(<Account />);

        await act(async () => {

            await new Promise(resolve => setTimeout(resolve, 0));

        });

        expect(mockRouter.push).toHaveBeenCalledWith("/login");

    });

    it("displays account page when user is logged in", async () => {

        const mockUser = {

            email: "m.corrigan@jlb-credit.com",
            user_metadata: {

                first_name: "Mark",
                last_name: "Corrigan"

            }

        };

        (useAuth as jest.Mock).mockImplementation(() => ({

            isLoggedIn: true,
            isLoading: false,
            user: mockUser

        }));

        const mockRouter = { push: jest.fn() };

        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        render(<Account />);

        await act(async () => {

            await new Promise(resolve => setTimeout(resolve, 0));

        })

        expect(mockRouter.push).not.toHaveBeenCalled();

        expect(screen.getByText("Account")).toBeInTheDocument();
        expect(screen.getByText("Name: Mark Corrigan")).toBeInTheDocument();
        expect(screen.getByText("Email: m.corrigan@jlb-credit.com")).toBeInTheDocument();

    });

    it("shows loading ui while auth is loading", () => {

        (useAuth as jest.Mock).mockImplementation(() => ({

            isLoggedIn: false,
            isLoading: true,
            user: null

        }));

        render(<Account />);

        expect(screen.getByText("loading...")).toBeInTheDocument();

    })

});