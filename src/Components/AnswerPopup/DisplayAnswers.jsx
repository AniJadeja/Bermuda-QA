import React, { useState } from 'react';
import AnswerPopup from './AnswerPopup';

const DisplayAnswers = () => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [answers, setAnswers] = useState([
    { id: 1, content: 'This is answer 1', votes: 1 },
    { id: 2, content: 'This is answer 2', votes: 2 },
    // ... more answers
  ]);

  const handlePostAnswer = () => {
    // Logic for posting a new answer
    console.log('Posting a new answer');
  };

  return (
    <div>
      <button onClick={() => setShowAnswers(true)}>Show Answers</button>
      {showAnswers && (
        <AnswerPopup
          onClose={() => setShowAnswers(false)}
          answers={answers}
          onPostAnswer={handlePostAnswer}
        />
      )}
    </div>
  );
};

export default DisplayAnswers;