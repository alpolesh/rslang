import React, { useState, useEffect } from 'react';
import Cards from '../../Components/Speakit/Cards';
import Image from '../../Components/Speakit/Image';
import Buttons from '../../Components/Speakit/Buttons/Buttons';
import { getWordsSpeakit } from '../../Services/getWordsSpeakit';

const Speakit = () => {
  const [result, setResult] = useState([]);
  const [inactive, setInactive] = useState(false);
  const [picture, setPicture] = useState('');
  const [letter, setLetter] = useState('');
  const [voice, setVoice] = useState('');
  const [nextGame, setNextGame] = useState({ group: 0, page: 0 });
  const [correct, setCorrect] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    if (result.length) {
      setPicture(result[0].image);
      setLetter(result[0].wordTranslate);
      result.forEach((value) => {
        setError((prev) => prev.concat(`${value.word} ${value.transcription} ${value.wordTranslate}`));
      });
    }
  }, [result]);

  useEffect(() => {
    const wrongWords = error;
    const currentWord = correct[correct.length - 1];
    const currentIndex = wrongWords.indexOf(currentWord);
    wrongWords.splice(currentIndex, 1);
    setError(wrongWords);
  }, [correct]);

  useEffect(() => {
    getWordsSpeakit(nextGame.group, nextGame.page).then((value) => setResult(value));
  }, [nextGame.group, nextGame.page]);

  return (
    <div>
      <main className="speakit__main">
        <Image
          checkPronunciations={voice}
          currentLetter={letter}
          currentPicture={picture}
        />
        <Cards
          words={result}
          cardOff={inactive}
          checkPronunciations={voice}
          changeLetter={setLetter}
          changePicture={setPicture}
          addCorrect={setCorrect}
        />
        <Buttons
          voice={setVoice}
          offActive={setInactive}
          changeLetter={setLetter}
          currentGame={nextGame}
          switchGame={setNextGame}
          correctAnswer={correct}
          newResultGame={setCorrect}
          errorAnswer={error}
          newErrorGame={setError}
          words={result}
        />
      </main>
    </div>
  );
};

export default Speakit;
