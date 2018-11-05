import React from "react";
import PropTypes from "prop-types";

class Search extends React.Component {
  static propTypes = {
    onSearchTrigger: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
  };

  static defaultProps = {
    placeholder: "Search for..."
  };

  constructor() {
    super();
    this.state = {
      val: ""
    };
  }

  handleChange = e => {
    this.setState({ val: e.target.value });
    if (this.props.onChange) this.props.onChange(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearchTrigger(this.state.val);
  };

  render() {
    return (
      <form className="form-search" onSubmit={this.handleSubmit}>
        <input
          className="form-search__text input-text input-text--right-big"
          onChange={this.handleChange}
          type="text"
          placeholder={this.props.placeholder}
          value={this.state.val}
        />
        <input className="form-search__submit" type="submit" value="" />
        <i className="form-search__icon fa fa-search" />
      </form>
    );
  }
}

export default Search;
