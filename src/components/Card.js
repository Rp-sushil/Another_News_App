import React, { useState, useEffect } from "react";

export default function Card({ props }) {
  const [Likes, setLikes] = useState(0);
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    if (props) setIsloading(false);
  }, [props]);
  const [hiddenCard, hideCard] = useState(false);
  const getDate = (date) => {
    const event = new Date(date);
    return event.toLocaleDateString("en-US");
  };
  const getTime = (date) => {
    const event = new Date(date);
    return event.toLocaleTimeString("en-us");
  };
  const getCardBack = () => {
    hideCard(false);
  };
  const getCard = (props) => {
    if (hiddenCard)
      return (
        <>
          <p>You hide this card</p>
          <button onClick={getCardBack}>Undo</button>
        </>
      );
    else
      return (
        <>
          <h3>{props.title}</h3>
          <a href={props.url}>
            <img src={props.image} alt={props.image} />
          </a>
          <span>{props.author}</span>
          <span>{getDate(props.publishedAt) + "    "}</span>
          <span>{getTime(props.publishedAt) + "    "}</span>
          <span>{Likes}</span>
          <span>{"  "}</span>
          <button onClick={() => setLikes(Likes + 1)}>Like</button>
          <button onClick={() => hideCard(true)}>Hide</button>
        </>
      );
  };
  return (
    <div className="card">{!isloading ? getCard(props) : <p>Loading</p>}</div>
  );
}
