import React from "react";
import { ClassVersion } from "./ClassVersion";
import { DirectFn } from "./DirectFn";
import { IdiomaticFn } from "./IdiomaticFn";
import { render, getByLabelText, fireEvent, wait } from "@testing-library/react";

describe("Todo component tests", () => {
  [ClassVersion, DirectFn, IdiomaticFn].map(Todo => {
    describe(`Testing: ${Todo.name}`, () => {
      it("should show a list of (default) todos", async () => {
        const { queryByText } = render(<Todo />);
        expect(queryByText(/get some milk/i)).not.toBeInTheDocument();
        await wait();
        expect(queryByText(/get some milk/i)).toBeInTheDocument();
      });

      it("should show an add todos button with a working input", () => {
        const { getByLabelText, getByText, debug } = render(<Todo />);
        expect(getByLabelText(/todo label/i)).toBeInTheDocument();
        const value = "some new label";
        fireEvent.change(getByLabelText(/todo label/i), { target: { value } });
        fireEvent.click(getByText(/add todo/i));
        expect(getByLabelText(/todo label/i).value).toEqual("");
        expect(getByText(value)).toBeInTheDocument();
      });

      it("should be able to delete todos", async () => {
        const { queryByText, getByText, getByLabelText } = render(<Todo />);
        await wait();
        fireEvent.click(queryByText(/get some milk/i));
        expect(queryByText(/get some milk/i)).not.toBeInTheDocument();

        const valueToRemove = "label 1";
        const valueToRemain = "label 2";
        fireEvent.change(getByLabelText(/todo label/i), { target: { value: valueToRemove } });
        fireEvent.click(getByText(/add todo/i));
        expect(queryByText(valueToRemove)).toBeInTheDocument();

        fireEvent.change(getByLabelText(/todo label/i), { target: { value: valueToRemain } });
        fireEvent.click(getByText(/add todo/i));
        expect(queryByText(valueToRemain)).toBeInTheDocument();

        fireEvent.click(getByText(valueToRemove));
        expect(queryByText(valueToRemove)).not.toBeInTheDocument();
        expect(queryByText(valueToRemain)).toBeInTheDocument();
      });
    });
  });
});
