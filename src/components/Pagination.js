import React from "react";

export default function Pagination({ setCounter, counter }) {
  return (
    <div className="Pagination">
      <button onClick={() => setCounter(counter - 1)} disabled={counter === 0}>
        {"<"}
      </button>
      <span>{" | "}</span>
      <button onClick={() => setCounter(counter + 1)} disabled={counter === 2}>
        {">"}
      </button>
    </div>
  );
}
