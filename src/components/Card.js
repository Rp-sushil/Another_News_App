import React, { useState, useEffect } from "react";

export default function Card({ props, idx, lan, searchMode }) {
  const [Likes, setLikes] = useState(0);
  const [isloading, setIsloading] = useState(true);
  const [hiddenCard, hideCard] = useState(0);
  useEffect(() => {
    if (props) {
      setIsloading(false);
      let storedLikes = localStorage.getItem(String(lan + idx + "l"));
      if (storedLikes && !searchMode) setLikes(parseInt(storedLikes));
      else setLikes(0);
      let deleteFlag = localStorage.getItem(String(lan + idx + "d"));
      if (deleteFlag !== undefined && !searchMode)
        hideCard(parseInt(deleteFlag));
      else hideCard(0);
    }
  }, [props]);
  const incrementLikes = () => {
    localStorage.setItem(String(lan + idx + "l"), Likes + 1);
    setLikes((Likes) => Likes + 1);
  };

  const toggleCardStatus = () => {
    let f = hiddenCard ? 0 : 1;
    localStorage.setItem(String(lan + idx + "d"), f);
    hideCard((hiddenCard) => !hiddenCard);
  };

  const getDate = (date) => {
    const event = new Date(date);
    return event.toLocaleDateString("en-US");
  };
  const getTime = (date) => {
    const event = new Date(date);
    return event.toLocaleTimeString("en-us");
  };
  const getCard = (props) => {
    if (hiddenCard)
      return (
        <>
          <p>You hide this card</p>
          <button onClick={toggleCardStatus} id={lan + idx + "d"}>
            Undo
          </button>
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
          <span hidden={searchMode}>{Likes}</span>
          <span>{"  "}</span>
          <button
            onClick={incrementLikes}
            hidden={searchMode}
            id={lan + idx + "l"}
          >
            Like
          </button>
          <button
            onClick={toggleCardStatus}
            hidden={searchMode}
            id={lan + idx + "d"}
          >
            Hide
          </button>
        </>
      );
  };
  return (
    <div className="card">{!isloading ? getCard(props) : <p>Loading</p>}</div>
  );
}
