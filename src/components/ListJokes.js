import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import classNames from "classnames/bind";

const ratingOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" }
];

class ListJokes extends React.Component {
  static propTypes = {
    onFavouriteClick: PropTypes.func.isRequired,
    onRatingClick: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    favourites: PropTypes.array.isRequired,
    ratings: PropTypes.array.isRequired
  };

  handleFavouriteClick = item => {
    this.props.onFavouriteClick(item);
  };

  handleRatingChange = (item, value) => {
    this.props.onRatingClick(item, value);
  };

  isFavourite(item) {
    return this.props.favourites.find(el => el.id === item.id) ? true : false;
  }

  getRating(item) {
    const itemRating = this.props.ratings.find(el => el.id === item.id);
    return itemRating ? ratingOptions.find(option => option.value === itemRating.rating) : null;
  }

  render() {
    console.log('render');
    if (!this.props.items) return;
    const items = this.props.items.map((item, index) => {
      return (
        <li className="list-jokes__item" key={item.id}>
          <i
            className="list-jokes__icon fa fa-heart-o"
            onClick={() => this.handleFavouriteClick(item)}
          />
          <i
            className={classNames(
              "list-jokes__icon list-jokes__icon--active fa fa-heart",
              this.isFavourite(item) ? "active" : ""
            )}
            onClick={() => this.handleFavouriteClick(item)}
          />
          {item.value}
          <div className="list-jokes__select-wrapper">
            <Select
              className="list-jokes__select"
              placeholder="Select rating"
              name={`select-rating-${item.id}`}
              value={this.getRating(item)}
              options={ratingOptions}
              onChange={e =>
                this.handleRatingChange(item, e === null ? null : e.value)
              }
            />
          </div>
        </li>
      );
    });
    return <ul className="list-jokes">{items}</ul>;
  }
}

export default ListJokes;
