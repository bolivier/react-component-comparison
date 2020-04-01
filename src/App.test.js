import React from "react";
import { ClassVersion } from "./ClassVersion";
import { DirectFn } from "./DirectFn";
import { IdiomaticFn } from "./IdiomaticFn";
import { render, getByLabelText, fireEvent } from "@testing-library/react";

describe("Todo component tests", () => {
  [ClassVersion, DirectFn, IdiomaticFn].map(Todo => {
    describe(`Testing: ${Todo.name}`, () => {
      it("should show a list of (default) todos", () => {
        const { getByText } = render(<Todo />);
        expect(getByText(/get some milk/i)).toBeInTheDocument();
      });

      it("should show an add todos button with a working input", () => {
        const { getByLabelText, getByText } = render(<Todo />);
        expect(getByLabelText(/todo label/i)).toBeInTheDocument();
        const value = "some new label";
        fireEvent.change(getByLabelText(/todo label/i), { target: { value } });
        fireEvent.click(getByText(/add todo/i));
        expect(getByLabelText(/todo label/i).value).toEqual("");
        expect(getByText(value)).toBeInTheDocument();
      });

      it('should be able to delete todos', () => {
        const { queryByText } = render(<Todo />);
        fireEvent.click(queryByText(/get some milk/i))
        expect(queryByText(/get some milk/i)).not.toBeInTheDocument();
      });
    });
  });
});
