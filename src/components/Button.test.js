import React from "react";
import { shallow, render, mount } from "enzyme";

import Button from "./Button";

it("renders button's text", () => {
  const props = {
    text: "lorem ipsum"
  };
  const button = mount(<Button {...props} />);
  expect(button.html()).toBe("<button>" + props.text + "</button>");
});
