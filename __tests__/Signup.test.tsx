import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SignUpPage from "../src/app/signup/page";

const mockSignUp = jest.fn();

jest.mock("../src/app/login/actions", () => ({

    signup: (formData: FormData) => {

        mockSignUp(Object.fromEntries(formData));

        return Promise.resolve();

    }

}));

describe("SignUp", () => {

    it("renders login form correctly", () => {

        render(<SignUpPage />);

        expect(screen.getByLabelText("First name:")).toBeInTheDocument();
        expect(screen.getByLabelText("Last name:")).toBeInTheDocument();
        expect(screen.getByLabelText("Email:")).toBeInTheDocument();
        expect(screen.getByLabelText("Password:")).toBeInTheDocument();
        expect(screen.getByLabelText("Confirm password:")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /sign up/i})).toBeInTheDocument();

    });

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

            target: { value: "TEST1234" }

        });

        fireEvent.change(screen.getByLabelText("Confirm password:"), {

            target: { value: "TEST1234" }

        });

        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

        expect(mockSignUp).toHaveBeenCalledTimes(1);
        expect(mockSignUp).toHaveBeenCalledWith(expect.objectContaining({

            firstName: "Mark",
            lastName: "Corrigan",
            email: "test@test.com",
            password: "TEST1234",
            confirmPassword: "TEST1234",
            "cf-turnstile-response": "mock-turnstile-token"

        }))

    })

})