import React from "react";
import { shallow, render, mount } from "enzyme";

import Search from "./Search";

it("renders search field with placeholder", () => {
  const props = {
    onSearchTrigger: jest.fn,
    placeholder: "lorem ipsum"
  };
  const search = mount(<Search {...props} />);
  expect(search.find(".form-search__text").prop("placeholder")).toBe(
    props.placeholder
  );
});

it("renders submit", () => {
  const props = {
    onSearchTrigger: jest.fn
  };
  const search = mount(<Search {...props} />);
  expect(search.find(".form-search__submit").length).toBe(1);
});

it("calls handleSubmit on submit", () => {
  const spy = jest.fn();
  const props = {
    onSearchTrigger: spy
  };
  const wrapper = mount(<Search {...props} />);
  wrapper.find(".form-search").simulate("submit");
  expect(spy).toHaveBeenCalled();
});

it("call handleChange on text change", () => {
  const spy = jest.fn();
  const props = {
    onChange: spy,
    onSearchTrigger: jest.fn
  };
  const wrapper = mount(<Search {...props} />);
  wrapper.find(".form-search__text").simulate("change");
  expect(spy).toHaveBeenCalled();
});
