import React, { useState, useEffect, useMemo } from "react";

const Typewriter: React.FC = () => {
  const words = useMemo(
    () => [
      "Hello, There!",
      "Welcome to Inventory Manager!",
      "Track your inventory efficiently.",
      "Organize your stock effortlessly.",
      "Calculate inventory monthly and yearly.",
      "Simplify your inventory management.",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      if (isDeleting) {
        setPosition((prevPosition) => prevPosition - 1);
        setCurrentWord((prevCurrentWord) =>
          prevCurrentWord.substring(0, position - 1)
        );
        if (position === 0) {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      } else {
        setPosition((prevPosition) => prevPosition + 1);
        setCurrentWord((prevCurrentWord) =>
          words[index].substring(0, position + 1)
        );
        if (position === words[index].length) {
          setIsDeleting(true);
        }
      }
    };

    const timeout = setTimeout(type, 100);

    return () => clearTimeout(timeout);
  }, [index, position, currentWord, isDeleting, words]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 id="typewriter" className="text-4xl text-white font-bold">
        {currentWord}
        <span className="blink">|</span>
      </h1>
    </div>
  );
};

export default Typewriter;
