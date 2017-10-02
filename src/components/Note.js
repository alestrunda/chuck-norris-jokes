import React from 'react';
import PropTypes from 'prop-types';

const Note = ({text}) => {
    return (
        <p className="note-app">{text}</p>
    );
};

Note.propTypes = {
    text: PropTypes.string
}

export default Note;