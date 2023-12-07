

import React from 'react';
import QuizEditBar from '../QuizEditBar';
import QuizEditBottomBar from '../QuizEditBottomBar';

const Questions = (props) => {
  const mode = props.mode;
  return (
    <div>
      <QuizEditBar mode={mode}/>
      <QuizEditBottomBar mode={mode}/>
    </div>
  );
};

export default Questions;
