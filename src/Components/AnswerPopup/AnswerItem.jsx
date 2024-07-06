import React from 'react';


const AnswerItem = ({ id, content, votes, onUpvote, onDownvote , pname, date}) => {
  return (
    <div className="answer-item">
      
      <h4 id='pname'>{pname}</h4>
      <p>{content}</p>
      <p id='date'>Date: {date}</p>
      <div className="vote-buttons">
        <button onClick={() => onUpvote(id)} className="vote-button up">▲</button>
        <span className="vote-count">{votes}</span>
        <button onClick={() => onDownvote(id)} className="vote-button down">▼</button>
      </div>
    </div>
  );
};


export default AnswerItem;