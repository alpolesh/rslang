import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import backgroundPlaySound from '../../../assets/img/play_sound.png';
import './Card.css';

const Card = (props) => {
  const { currentWord, isChosed, isSound } = props;
  const rsLangData = 'https://raw.githubusercontent.com/kli2m/rslang-data/master';
  const srcAudio = `${rsLangData}/${currentWord.audio}`;
  const backgroundImage = `${rsLangData}/${currentWord.image}`;
  const styleRight = isChosed.isChosed && isChosed.isRight
    ? 'audiochallenge__card_image right'
    : 'audiochallenge__card_image wrong';
  const stylePlayVoice = {
    backgroundImage: `url(${backgroundPlaySound})`,
    backgroundSize: 'context',
  };
  const styleViewPicture = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
  };

  const playVoice = (e) => {
    const audio = new Audio(e.target.dataset.url);
    audio.play();
  };

  if (isChosed.isChosed) {
    return (
      <div className="audiochallenge__card">
        <Tooltip placement="top" title="Сlick to listen again" color="cyan">
          <input
            type="button"
            className={styleRight}
            style={styleViewPicture}
            onClick={playVoice}
            data-url={srcAudio}
          />
        </Tooltip>
        <p>{currentWord.transcription}</p>
        <p>{currentWord.word}</p>
      </div>
    );
  }
  return (
    <div className="audiochallenge__card">
      <Tooltip placement="top" title="Сlick to listen again" color="cyan">
        <input
          type="button"
          className="audiochallenge__card_speaker"
          style={stylePlayVoice}
          onClick={playVoice}
          data-url={srcAudio}
        />
        {isSound && (
            /* eslint-disable-next-line */
            <audio src={srcAudio} autoPlay />
        )}
      </Tooltip>
    </div>
  );
};

Card.propTypes = {
  currentWord: PropTypes.shape({
    audio: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    transcription: PropTypes.string.isRequired,
    word: PropTypes.string.isRequired,
  }).isRequired,
  isChosed: PropTypes.shape({
    isChosed: PropTypes.bool.isRequired,
    isRight: PropTypes.bool.isRequired,
  }).isRequired,
  isSound: PropTypes.bool.isRequired,
};

export default Card;
