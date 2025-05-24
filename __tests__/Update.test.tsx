import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UpdatePassword from "../src/app/update/page";

const mockUpdate = jest.fn();

jest.mock("@/utils/auth/actions", () => ({

    updatePassword: (formData: FormData) => {

        mockUpdate(Object.fromEntries(formData));

        return Promise.resolve();

    }

}));

describe("Update", () => {

    it("renders reset form correctly", () => {

        render(<UpdatePassword />);

        expect(screen.getByLabelText("New password:")).toBeInTheDocument();
        expect(screen.getByLabelText("Confirm new password:")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Update password" })).toBeInTheDocument();

    });

    it("disables submit button when user enters weak password", () => {

        render(<UpdatePassword />);

        expect(screen.getByRole("button", { name: "Update password" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Update password" })).toBeDisabled();

        fireEvent.change(screen.getByLabelText("New password:"), {

            target: { value: "p@ssword" }

        });

        fireEvent.change(screen.getByLabelText("Confirm new password:"), {

            target: { value: "p@ssword" }

        });
        
        expect(screen.getByRole("button", { name: "Update password" })).toBeDisabled();

    })

    it("enables submit button when user enters strong password", () => {

        render(<UpdatePassword />);

        expect(screen.getByRole("button", { name: "Update password" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Update password" })).toBeDisabled();

        fireEvent.change(screen.getByLabelText("New password:"), {

            target: { value: "LeapH!meNev3rMind" }

        });

        fireEvent.change(screen.getByLabelText("Confirm new password:"), {

            target: { value: "LeapH!meNev3rMind" }

        });
        
        expect(screen.getByRole("button", { name: "Update password" })).toBeEnabled();

    })

    it("submits form with correct values when user clicks reset password", () => {

        render(<UpdatePassword />);
        
        fireEvent.change(screen.getByLabelText("New password:"), {

            target: { value: "LeapH!meNev3rMind" }

        });

        fireEvent.change(screen.getByLabelText("Confirm new password:"), {

            target: { value: "LeapH!meNev3rMind" }

        });

        fireEvent.click(screen.getByRole("button"), { name: "Update password" });

        expect(mockUpdate).toHaveBeenCalledTimes(1);
        expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({

            password: "LeapH!meNev3rMind",
            confirmPassword: "LeapH!meNev3rMind"

        }))

    })

})