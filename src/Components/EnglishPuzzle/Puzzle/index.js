import React, { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Sentences from '../Sentences';

const Puzzle = ({
  data,
  numberSentence,
  switchNoAnswer,
  switchCheck,
  compareWords,
  rows,
  setRows,
  trueAnswer,
  checkBtns,
  sentence,
  right,
}) => {
  const onDragEnd = (result, value, setValue) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if ((numberSentence + 1 === parseInt(destination.droppableId, 10)
      && numberSentence + 1 !== parseInt(source.droppableId, 10))
      || (numberSentence + 1 === parseInt(source.droppableId, 10)
      && parseInt(destination.droppableId, 10) === 11)
    ) {
      const destColumn = value[destination.droppableId];
      const sourceColumn = value[source.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setValue({
        ...value,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else if (source.droppableId === destination.droppableId) {
      const column = value[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setValue({
        ...value,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  useEffect(() => {
    if (rows[11].items.length === 0 && checkBtns !== 'noAnswer') {
      switchNoAnswer(true);
      if (rows[numberSentence + 1].items.length > 0) {
        switchCheck(true);
      }
      const answer = [];
      const obj = rows[numberSentence + 1].items;
      const correct = data[numberSentence].textExample.replace(/(<(\/?[^>]+)>)/g, '').split(' ');
      Object.entries(obj).map(([, text]) => answer.push(text.content));
      compareWords({ true: correct, false: answer });
    }
  }, [rows, checkBtns, data, compareWords, numberSentence, switchCheck, switchNoAnswer]);

  return (
    <div
      className="english-puzzle"
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, rows, setRows)}
      >
        {Object.entries(rows).map(([columnId, column]) => (
          <Sentences
            columnId={columnId}
            column={column}
            trueAnswer={trueAnswer}
            key={columnId}
            rows={rows}
            numberSentence={numberSentence}
            setRows={setRows}
            sentence={sentence}
            right={right}
          />
        ))}
      </DragDropContext>
    </div>
  );
};

Puzzle.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  numberSentence: PropTypes.number.isRequired,
  switchNoAnswer: PropTypes.func.isRequired,
  switchCheck: PropTypes.func.isRequired,
  compareWords: PropTypes.func.isRequired,
  rows: PropTypes.objectOf(PropTypes.any).isRequired,
  setRows: PropTypes.func.isRequired,
  trueAnswer: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkBtns: PropTypes.string.isRequired,
  sentence: PropTypes.string.isRequired,
  right: PropTypes.bool.isRequired,
};

export default Puzzle;
