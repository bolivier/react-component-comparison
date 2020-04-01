import React from "react";
import { ClassVersion } from "./ClassVersion";
import { DirectFn } from "./DirectFn";
import { IdiomaticFn } from "./IdiomaticFn";
import { render, queryByText, fireEvent, wait } from "@testing-library/react";

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
        const { getByLabelText, getByText } = render(<Todo />);
        expect(getByLabelText(/todo label/i)).toBeInTheDocument();
        const value = "some new label";
        fireEvent.change(getByLabelText(/todo label/i), { target: { value } });
        fireEvent.click(getByText(/add todo/i));
        expect(getByLabelText(/todo label/i).value).toEqual("");
        expect(getByText(value)).toBeInTheDocument();
      });

      it("should be able to delete todos", async () => {
        const { queryByText: wrapperQueryByText, getByText, getByLabelText, queryByTestId } = render(<Todo />);
        await wait();
        fireEvent.click(queryByTestId("1"));
        expect(wrapperQueryByText(/get some milk/i)).not.toBeInTheDocument();

        const valueToRemove = "label 1";
        const valueToRemain = "label 2";
        fireEvent.change(getByLabelText(/todo label/i), { target: { value: valueToRemove } });
        fireEvent.click(getByText(/add todo/i));
        expect(wrapperQueryByText(valueToRemove)).toBeInTheDocument();

        fireEvent.change(getByLabelText(/todo label/i), { target: { value: valueToRemain } });
        fireEvent.click(getByText(/add todo/i));
        expect(wrapperQueryByText(valueToRemain)).toBeInTheDocument();

        fireEvent.click(queryByText(getByText(valueToRemove), /x/i));
        expect(wrapperQueryByText(valueToRemove)).not.toBeInTheDocument();
        expect(wrapperQueryByText(valueToRemain)).toBeInTheDocument();
      });
    });
  });
});
