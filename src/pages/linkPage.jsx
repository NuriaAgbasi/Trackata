import "../index.css";
const Linkepage = ({ children, onSelect, isSelected }) => {
  return (
    <div className="flex">
      <button className={isSelected ? "active" : undefined} onClick={onSelect}>
        {children}
      </button>
    </div>
  );
};

export default Linkepage;
