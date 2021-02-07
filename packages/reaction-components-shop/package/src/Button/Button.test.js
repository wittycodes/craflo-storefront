import React from "react";
import { render } from "../tests/index.js";
import Button from "./Button";

test("basic snapshot - only default props", () => {
  const { asFragment } = render(<Button className="myBtn">Submit</Button>);
  expect(asFragment()).toMatchSnapshot();
});

test("error button snapshot", () => {
  const { asFragment } = render(<Button className="myBtn" color="error" variant="contained">Delete</Button>);
  expect(asFragment()).toMatchSnapshot();
});

test("error button snapshot", () => {
  const { asFragment } = render(<Button className="myBtn" color="error" variant="outlined">Delete</Button>);
  expect(asFragment()).toMatchSnapshot();
});

test("isWaiting button snapshot", () => {
  const { asFragment, getByText } = render(<Button className="myBtn" isWaiting>Upload</Button>);
  expect(getByText("Upload")).toBeDisabled();
  expect(asFragment()).toMatchSnapshot();
});
