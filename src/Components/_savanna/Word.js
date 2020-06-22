import React, { useEffect } from 'react';
import './savanna.css';
import PropTypes from 'prop-types';

const Word = (props) => {
  const { word } = props;
  useEffect(() => {
    const timerId = setTimeout(() => props.fail(), 3000);
    return () => clearTimeout(timerId);
  });
  return (<div className="savanna-game-field__question"><h1>{word}</h1></div>);
};
Word.propTypes = {
  word: PropTypes.string.isRequired,
  fail: PropTypes.func.isRequired,
};

export default Word;
