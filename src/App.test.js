import React from "react";
import { BrowserRouter } from "react-router-dom";
import { shallow, render, mount } from "enzyme";

import App from "./App";
import ListCategories from "./components/ListCategories";
import ListJokes from "./components/ListJokes";
import Note from "./components/Note";
import Search from "./components/Search";

let mountedApp;
const theApp = () => {
  if (!mountedApp) {
    mountedApp = mount(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ).children();
  }
  return mountedApp;
};

//make sure to reset shared variables before ever test
beforeEach(() => {
  mountedApp = undefined;
});

it("renders without crashing", () => {
  theApp();
});

describe("components rendering", () => {
  it("renders component ListCategories", () => {
    expect(theApp().find(ListCategories).length).toBe(1);
  });

  it("renders component Note", () => {
    expect(theApp().find(Note).length).toBe(1);
  });

  it("renders component ListJokes", () => {
    expect(theApp().find(ListJokes).length).toBe(1);
  });

  it("renders component Search", () => {
    expect(theApp().find(Search).length).toBe(1);
  });
});
