import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

function InventoryForm({ onAddItem, handleClosePopup }) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleAddItem = () => {
    if (!name || !stock || !price) {
      setError("Please input all fields");
      return;
    }
    if (isNaN(stock) || isNaN(price)) {
      setError("Please enter valid numbers for stock and price");
      return;
    }

    const newItem = {
      name: name,
      stock: parseInt(stock),
      price: parseFloat(price)
    };

    onAddItem(newItem);
    setName("");
    setStock("");
    setPrice("");
    setError("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-full px-4">
        <div className="grid h-screen place-items-center">
          <Card className="max-w-xl w-full">
            <CardBody>
              <Button className=" bg-red-600 close" onClick={handleClosePopup}>
                &times;
              </Button>
              <Typography
                color="blue-gray"
                className="mb-6 mt-10 ml-40"
                variant="h4"
              >
                Create A New Item
              </Typography>
              <Input
                type="text"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <Input
                type="text"
                label="Number of stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <br />
              <Input
                type="text"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <br />
              <Button
                onClick={handleAddItem}
                className=" ml-56 bg-green-500 mr-2"
              >
                Add Item
              </Button>
              {error && <p className="text-red-500">{error}</p>}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default InventoryForm;
