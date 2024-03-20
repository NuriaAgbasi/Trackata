import "./counter.css";

const Price = ({ name, id, input }) => {
  return (
    <div className="price-container">
      <p className={id}>
        {name}
        <br />
        Price
      </p>
      <input type="text" placeholder="$00" className={input} />
    </div>
  );
};

export default Price;
