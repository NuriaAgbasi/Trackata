import React, { useState } from "react";
import "./counter.css";
import Price from "./price";

function Counter() {
  const [count, setCount] = useState(0);
  const [editable, setEditable] = useState(false);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleCountClick = () => {
    setEditable(true);
  };

  const handleCountChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      setCount(newValue);
    }
  };

  const handleCountBlur = () => {
    setEditable(false);
  };

  return (
    <div className="pcm">
      {editable ? (
        <input
          type="number"
          value={count}
          onChange={handleCountChange}
          onBlur={handleCountBlur}
          autoFocus
          className="input-number"
        />
      ) : (
        <span onClick={handleCountClick} className="count">
          {count}
        </span>
      )}
      <button onClick={handleIncrement} className="plus">
        +
      </button>
      <button onClick={handleDecrement} className="minus">
        -
      </button>
      <Price
        name="Capital"
        id="Capital-price-label"
        input="Capital-price-input"
      />
      <Price name="Sell" id="Sell-price-label" input="Sell-price-input" />
    </div>
  );
}

export default Counter;
