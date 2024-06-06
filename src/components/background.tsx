import React, { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

function Background({ children }: BackgroundProps) {
  return (
    <div>
      <div className="area">
        <ul className="circles">
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
      <div className="text-black">{children}</div>
    </div>
  );
}

export default Background;
