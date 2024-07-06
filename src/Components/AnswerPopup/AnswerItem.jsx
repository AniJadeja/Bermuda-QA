import React from 'react';

const AnswerItem = ({ id, content, votes, onUpvote, onDownvote }) => {
  return (
    <div className="answer-item">
      <h6>{content}</h6>
      <div className="vote-buttons">
        <button onClick={() => onUpvote(id)} className="vote-button up">▲</button>
        <span className="vote-count">{votes}</span>
        <button onClick={() => onDownvote(id)} className="vote-button down">▼</button>
      </div>
    </div>
  );
};

export default AnswerItem;