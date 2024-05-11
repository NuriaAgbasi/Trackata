import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

const EditPopup = ({ editedStock, editedPrice, onSave, onClose }) => {
  const [newStock, setNewStock] = useState(editedStock);
  const [newPrice, setNewPrice] = useState(editedPrice);

  const handleStockChange = (e) => {
    setNewStock(parseInt(e.target.value));
  };

  const handlePriceChange = (e) => {
    setNewPrice(parseFloat(e.target.value));
  };

  const handleSave = () => {
    onSave(newStock, newPrice);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="w-full px-4">
        <div className="grid h-screen place-items-center">
          <Card className="max-w-xl w-full">
            <CardBody>
              <Button className=" bg-red-600 close" onClick={onClose}>
                &times;
              </Button>
              <Typography
                color="blue-gray"
                className="mb-6 mt-10 ml-56"
                variant="h4"
              >
                Edit
              </Typography>

              <div>
                <Input
                  id="stock"
                  type="number"
                  label="Name"
                  value={newStock}
                  disabled
                  onChange={handleStockChange}
                />
              </div>
              <br />
              <div>
                <Input
                  label="Price"
                  id="price"
                  type="number"
                  value={newPrice}
                  onChange={handlePriceChange}
                />
              </div>
              <br />
              <div className="flex">
                <Button
                  onClick={handleSave}
                  className="ml-40 bg-green-500 mr-2"
                >
                  Save
                </Button>
                <Button onClick={onClose} className=" bg-orange-400 ml-2">
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
