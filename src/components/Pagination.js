import React from "react";

export default function Pagination({ setCounter, counter }) {
  return (
    <div className="Pagination">
      <button
        onClick={() => setCounter(counter - 1)}
        disabled={counter === 0}
        id="Prev"
      >
        {"Prev"}
      </button>
      <span>{" | "}</span>
      <button
        onClick={() => setCounter(counter + 1)}
        disabled={counter === 2}
        id="Next"
      >
        {"Next"}
      </button>
    </div>
  );
}
