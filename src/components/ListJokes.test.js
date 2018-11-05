import React from "react";
import { shallow, render, mount } from "enzyme";

import ListJokes from "./ListJokes";

it("calls handleFavouriteClick", () => {
  const spy = jest.fn();
  const props = {
    onFavouriteClick: spy,
    onRatingClick: jest.fn,
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
    favourites: [],
    ratings: []
  };
  const list = shallow(<ListJokes {...props} />);
  list
    .find(".list-jokes__icon")
    .first()
    .simulate("click");
  expect(spy).toHaveBeenCalled();
});
