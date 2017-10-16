import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { CATEGORIES_ICONS } from '../settings.js';

function getCategoryIcon(catName) {
	return catName in CATEGORIES_ICONS ? CATEGORIES_ICONS[catName] : "pe-7s-smile";
}

class ListCategories extends React.Component {
	static propTypes = {
		onCategoryClick: PropTypes.func.isRequired,
		activeCategory: PropTypes.string,
		items: PropTypes.array.isRequired,
	}

	static defaultProps = {
		activeCategory: ""
	}

	constructor() {
		super();
		this.state = {
			selected: ""
		};
	}

	componentDidMount() {
		this.setState({
			selected: this.props.activeCategory
		});
	}

	handleItemClick = e => {
		const category = this.state.selected === e.target.textContent ? "" : e.target.textContent;
		this.setState({
			selected: category
		});
		if(this.props.onCategoryClick)
			this.props.onCategoryClick(category);
	}

	render() {
		if(!this.props.items)
			return;
		const items = this.props.items.map((item, index) => {
			return (
				<li className={classNames("list-categories__item", this.props.activeCategory === item ? "active" : "")} onClick={this.handleItemClick} key={index}>
					<Link className="list-categories__link" to={'/'}>
						<i className={classNames('list-categories__icon', getCategoryIcon(item))}></i>
						{item}
					</Link>
				</li>
			);
		});
		return (
			<ul className="list-categories">{items}</ul>
		)
	}
};

export default ListCategories;