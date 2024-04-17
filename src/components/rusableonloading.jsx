import React, { useState, useEffect } from "react";

const ReusableOnloading = ({ content, children, time }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, time);

    return () => clearTimeout(timeoutId);
  }, [time]);

  return <div>{loading ? content : children}</div>;
};

export default ReusableOnloading;
