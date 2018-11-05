import React from "react";
import { shallow } from "enzyme";

import ListCategories from "./ListCategories";

it("calls handleItemClick on item click", () => {
  const spy = jest.fn();
  const event = { target: { textContent: "" } };
  const props = {
    items: [
      {
        category: ["fashion"],
        icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id: "0wdewlp2tz-mt_upesvrjw",
        url: "http://api.chucknorris.io/jokes/0wdewlp2tz-mt_upesvrjw",
        value:
          "Chuck Norris does not follow fashion trends, they …and kicks their ass. Nobody follows Chuck Norris."
      }
    ],
    onCategoryClick: spy
  };
  const wrapper = shallow(<ListCategories {...props} />);
  wrapper
    .find("li")
    .first()
    .simulate("click", event);
  expect(spy).toHaveBeenCalled();
});

it("sets selected category on item click", () => {
  const category = "fashion";
  const event = {
    target: {
      textContent: category
    }
  };
  const props = {
    items: [
      {
        category: [category],
        icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id: "0wdewlp2tz-mt_upesvrjw",
        url: "http://api.chucknorris.io/jokes/0wdewlp2tz-mt_upesvrjw",
        value:
          "Chuck Norris does not follow fashion trends, they …and kicks their ass. Nobody follows Chuck Norris."
      }
    ],
    onCategoryClick: jest.fn
  };
  const wrapper = shallow(<ListCategories {...props} />);
  wrapper
    .find("li")
    .first()
    .simulate("click", event);
  expect(wrapper.state("selected")).toBe(category);
});
