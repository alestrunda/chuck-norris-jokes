import React from 'react';
import PropTypes from 'prop-types';

class InputNumber extends React.Component {
	static propTypes = {
		max: PropTypes.number.isRequired,
		min: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
		onChange: PropTypes.func,
	}

	constructor() {
		super();
		this.state = {
			val: 0
		};
	}

	isValidVal(val) {
		if(!Number.isInteger(val) || val > this.props.max || val < this.props.min)
			return false;
		return true;
	}

	componentDidMount() {
		const val = parseInt(this.props.value, 10);
		if(this.isValidVal(val))
			this.setState({val: val});
		else
			this.setState({val: this.props.min});
	}

	handleChange = (e) => {
		const val = parseInt(e.target.value, 10);
		if(!this.isValidVal(val))
			return;
		this.setState({val});
		if(this.props.onChange)
			this.props.onChange(val);
	}

	render() {
		return (
			<input
				className="input-text input-text--tiny"
				onChange={this.handleChange}
				type="number"
				value={this.state.val}
				step="1"
				min={this.props.min}
				max={this.props.max}
			/>
		)
	}
};

export default InputNumber;