import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ResetPassword from "../src/app/reset/page";

const mockReset = jest.fn();

jest.mock("@/utils/auth/actions", () => ({

    resetPassword: (formData: FormData) => {

        mockReset(Object.fromEntries(formData));

        return Promise.resolve();

    }

}));

describe("Reset", () => {

    it("renders reset form correctly", () => {

        render(<ResetPassword />);

        expect(screen.getByLabelText("Email:")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /reset password/i})).toBeInTheDocument();

    });

    it("submits form with correct values when clicking reset password", () => {

        render(<ResetPassword />);
        
        fireEvent.change(screen.getByLabelText("Email:"), {

            target: { value: "test@test.com" }

        });

        fireEvent.click(screen.getByRole("button", { name: /reset password/i }));

        expect(mockReset).toHaveBeenCalledTimes(1);
        expect(mockReset).toHaveBeenCalledWith(expect.objectContaining({

            email: "test@test.com",
            "cf-turnstile-response": "mock-turnstile-token"

        }))

    })

})