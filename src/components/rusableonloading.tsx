import React, { useState, useEffect, ReactNode } from "react";

interface ReusableOnloadingProps {
  content: ReactNode;
  children: ReactNode;
  time: number;
}

const ReusableOnloading: React.FC<ReusableOnloadingProps> = ({
  content,
  children,
  time,
}) => {
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
