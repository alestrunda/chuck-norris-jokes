import React from "react";
import { shallow, render, mount } from "enzyme";

import Note from "./Note";

it("renders note's text", () => {
  const props = {
    text: "lorem ipsum"
  };
  const button = mount(<Note {...props} />);
  expect(button.html()).toBe('<p class="note-app">' + props.text + "</p>");
});
