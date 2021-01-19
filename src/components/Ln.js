import React from "react";

export default function Ln({ changeLn }) {
  return (
    <div className="Ln_Nav">
      <button onClick={() => changeLn(1)}>L1</button>
      <button onClick={() => changeLn(2)}>L2</button>
      <button onClick={() => changeLn(3)}>L3</button>
    </div>
  );
}
