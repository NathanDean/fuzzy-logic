import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../src/app/login/page";

const mockLogin = jest.fn();

jest.mock("../src/app/login/actions", () => ({

    login: (formData: FormData) => {

        mockLogin(Object.fromEntries(formData));

        return Promise.resolve();

    }

}));

describe("Login", () => {

    it("renders login form correctly", () => {

        render(<LoginPage />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /log in/i})).toBeInTheDocument();

    });

    it("submits form with correct values when clicking login", () => {

        render(<LoginPage />);

        fireEvent.change(screen.getByLabelText(/email/i), {

            target: { value: "test@test.com" }

        });

        fireEvent.change(screen.getByLabelText(/password/i), {

            target: { value: "TEST1234" }

        });

        fireEvent.click(screen.getByRole("button", { name: /log in/i }));

        expect(mockLogin).toHaveBeenCalledTimes(1);
        expect(mockLogin).toHaveBeenCalledWith(expect.objectContaining({

            email: "test@test.com",
            password: "TEST1234",
            "cf-turnstile-response": "mock-turnstile-token"

        }))

    })

})