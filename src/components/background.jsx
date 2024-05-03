import React from "react";

function Background({ children }) {
  return (
    <div>
      <div className="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Background;
