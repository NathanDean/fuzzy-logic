import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SignUpPage from "../src/app/signup/page";

const mockSignUp = jest.fn();

jest.mock("@/utils/auth/actions", () => ({

    signup: (formData: FormData) => {

        mockSignUp(Object.fromEntries(formData));

        return Promise.resolve();

    }

}));

describe("SignUp", () => {

    it("renders sign up form correctly", () => {

        render(<SignUpPage />);

        expect(screen.getByLabelText("First name:")).toBeInTheDocument();
        expect(screen.getByLabelText("Last name:")).toBeInTheDocument();
        expect(screen.getByLabelText("Email:")).toBeInTheDocument();
        expect(screen.getByLabelText("Password:")).toBeInTheDocument();
        expect(screen.getByLabelText("Confirm password:")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();

    });
    
    it("disables submit button when user enters weak password", () => {

        render(<SignUpPage />);

        expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Sign up" })).toBeDisabled();

        fireEvent.change(screen.getByLabelText("Password:"), {

            target: { value: "p@ssword" }

        });

        fireEvent.change(screen.getByLabelText("Confirm password:"), {

            target: { value: "p@ssword" }

        });
        
        expect(screen.getByRole("button", { name: "Sign up" })).toBeDisabled();

    })

    it("enables submit button when user enters strong password", () => {

        render(<SignUpPage />);

        expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Sign up" })).toBeDisabled();

        fireEvent.change(screen.getByLabelText("Password:"), {

            target: { value: "LeapH!meNev3rMind" }

        });

        fireEvent.change(screen.getByLabelText("Confirm password:"), {

            target: { value: "LeapH!meNev3rMind" }

        });
        
        expect(screen.getByRole("button", { name: "Sign up" })).toBeEnabled();

    })

    it("submits form with correct values when clicking sign up", () => {

        render(<SignUpPage />);

        fireEvent.change(screen.getByLabelText("First name:"), {

            target: { value: "Mark" }

        });

        fireEvent.change(screen.getByLabelText("Last name:"), {

            target: { value: "Corrigan" }

        });
        
        fireEvent.change(screen.getByLabelText("Email:"), {

            target: { value: "test@test.com" }

        });

        fireEvent.change(screen.getByLabelText("Password:"), {

            target: { value: "LeapH!meNev3rMind" }

        });

        fireEvent.change(screen.getByLabelText("Confirm password:"), {

            target: { value: "LeapH!meNev3rMind" }

        });

        fireEvent.click(screen.getByRole("button"));

        expect(mockSignUp).toHaveBeenCalledTimes(1);
        expect(mockSignUp).toHaveBeenCalledWith(expect.objectContaining({

            firstName: "Mark",
            lastName: "Corrigan",
            email: "test@test.com",
            password: "LeapH!meNev3rMind",
            confirmPassword: "LeapH!meNev3rMind",
            "cf-turnstile-response": "mock-turnstile-token"

        }))

    })

})