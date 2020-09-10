import React from "react";
import { ClassVersion } from "./ClassVersion";
import { DirectFn } from "./DirectFn";
import { IdiomaticFn } from "./IdiomaticFn";
import {
  render,
  fireEvent,
  wait,
  screen,
  queryByText,
} from "@testing-library/react";

describe("Todo component tests", () => {
  [ClassVersion, DirectFn, IdiomaticFn].map(Todo => {
    describe(`Testing: ${Todo.name}`, () => {
      it("should show a list of (default) todos", async () => {
        render(<Todo />);
        expect(screen.queryByText(/get some milk/i)).not.toBeInTheDocument();
        await wait();
        expect(screen.queryByText(/get some milk/i)).toBeInTheDocument();
      });

      it("should show an add todos button with a working input", () => {
        render(<Todo />);
        expect(screen.getByLabelText(/todo label/i)).toBeInTheDocument();
        const value = "some new label";
        fireEvent.change(screen.getByLabelText(/todo label/i), {
          target: { value },
        });
        fireEvent.click(screen.getByText(/add todo/i));
        expect(screen.getByLabelText(/todo label/i).value).toEqual("");
        expect(screen.getByText(value)).toBeInTheDocument();
      });
    });
  });
});
