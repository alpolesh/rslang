import React from 'react';
import PropTypes from 'prop-types';
import { List, Divider } from 'antd';
import speechRecognition from '../../../utls/Speakit/Sound/Sound';

const Result = (props) => {
  const {
    showCorrectAnswer,
    showErrorAnswer,
  } = props;

  return (
    <div>
      <Divider orientation="left">
        {`Ошибки: ${showErrorAnswer.size}`}
      </Divider>
      <List
        size="small"
        bordered
        dataSource={Array.from(showErrorAnswer)}
        renderItem={(item) => <List.Item className="speakit__statistiks_list" onClick={() => { speechRecognition(item.split(' ')[0]); }}>{item}</List.Item>}
      />
      <Divider orientation="left">
        {`Правильные ответы: ${showCorrectAnswer.size}`}
      </Divider>
      <List
        size="small"
        bordered
        dataSource={Array.from(showCorrectAnswer)}
        renderItem={(item) => <List.Item className="speakit__statistiks_list" onClick={() => { speechRecognition(item.split(' ')[0]); }}>{item}</List.Item>}
      />
    </div>
  );
};

Result.prototype = {
  showCorrectAnswer: PropTypes.objectOf(PropTypes.any).isRequired,
  showErrorAnswer: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Result;
