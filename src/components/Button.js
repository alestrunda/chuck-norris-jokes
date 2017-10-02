import React from 'react';
import PropTypes from 'prop-types';

const Button = ({cssClass, onClick, text}) => {
	return (
		<button className={cssClass} onClick={onClick}>{text}</button>
	)
};

Button.propTypes = {
	cssClass: PropTypes.string,
	onClick: PropTypes.func,
	text: PropTypes.string.isRequired,
};

export default Button;