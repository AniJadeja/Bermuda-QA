import React, { useEffect, useState } from "react";
import { getMyVote } from "../../Features/GetMyVote/myVoteController";
import { useAuthStore } from "../../Features/Authentication/AuthStore";


const AnswerItem = ({
  id,
  content,
  votes,
  onUpvote,
  onDownvote,
  pname,
  date,
  user,
}) => {
  const [isUpVoted, setIsUpVoted] = useState();
  const [isDownVoted, setIsDownVoted] = useState();
  const {email} = useAuthStore();
  useEffect(() => {
    (async () => {
      const myVote = await getMyVote(email, id);
      if (myVote) {
        console.log("User already voted..")
        setIsUpVoted(true);
      } else {
        setIsUpVoted(false);
      }
    })();
  });

  const handleButtonVote = (buttonType) => {
    console.log("BUtton type ", buttonType)
    buttonType == "up" ? onUpvote(id) : onDownvote(id);
  };

  return (
    <div className="answer-item">
      <h4 id="pname">{pname}</h4>
      <p>{content}</p>
      <p id="date">Date: {date}</p>
      <div className="vote-buttons">
        <button
          onClick={isUpVoted ? null : () => handleButtonVote("up")}
          className="vote-button up"
        >
          <img
            src="/assets/Popup/thumb_icon.svg"
            width={30}
            style={isUpVoted ? styles.greenButton : styles.normalUpButton}
          />
        </button>
        <span className="vote-count">{votes}</span>
        <button
          onClick={isDownVoted ? null : () => handleButtonVote("down")}
          className="vote-button down"
        >
          {" "}
          <img
            src="/assets/Popup/thumb_icon.svg"
            width={30}
            style={isDownVoted ? styles.redButton : styles.normalDownButton}
          />
        </button>
      </div>
    </div>
  );
};

const styles = {
  greenButton: {
    filter:
      "invert(93%) sepia(11%) saturate(459%) hue-rotate(79deg) brightness(100%) contrast(94%)",
  },
  redButton: {
    transform: "rotate(180deg) scaleX(-1)",
    filter:
      "invert(80%) sepia(13%) saturate(473%) hue-rotate(314deg) brightness(98%) contrast(99%)",
  },
  normalUpButton: {
    filter:
      "invert(60%) sepia(9%) saturate(0%) hue-rotate(150deg) brightness(90%) contrast(81%)",
  },
  normalDownButton: {
    transform: "rotate(180deg) scaleX(-1)",
    filter:
      "invert(60%) sepia(9%) saturate(0%) hue-rotate(150deg) brightness(90%) contrast(81%)",
  },
};

export default AnswerItem;
