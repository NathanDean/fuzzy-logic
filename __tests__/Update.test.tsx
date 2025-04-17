import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UpdatePassword from "../src/app/update/page";

const mockUpdate = jest.fn();

jest.mock("../src/app/login/actions", () => ({

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
        expect(screen.getByRole("button", {name: /update password/i})).toBeInTheDocument();

    });

    it("submits form with correct values when clicking reset password", () => {

        render(<UpdatePassword />);
        
        fireEvent.change(screen.getByLabelText("New password:"), {

            target: { value: "TEST1234" }

        });

        fireEvent.change(screen.getByLabelText("Confirm new password:"), {

            target: { value: "TEST1234" }

        });

        fireEvent.click(screen.getByRole("button", { name: /update password/i }));

        expect(mockUpdate).toHaveBeenCalledTimes(1);
        expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({

            password: "TEST1234",
            confirmPassword: "TEST1234"

        }))

    })

})