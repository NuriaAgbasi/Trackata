import React from "react";

function Background({ children }) {
  return (
    <div>
      <div id="bgcol" className="area">
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
      {children}
    </div>
  );
}

export default Background;
