import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "../Input";

describe("Input", () => {
  it("renders label and input with correct autocomplete for password", () => {
    const register = {
      name: "password",
      onChange: async () => true,
      onBlur: async () => true,
      ref: () => {},
    };

    render(
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        register={register}
      />
    );

    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("Enter your password");
    expect(input).toHaveAttribute("autocomplete", "current-password");
  });
});
