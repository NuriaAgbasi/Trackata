import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

const EditPopup = ({
  editedName,
  editedStock,
  editedPrice,
  restockAmount,
  closeEditPopup,
  handleRestock,
  setEditedStock,
  setEditedPrice,
  setRestockAmount,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="w-full px-4">
        <div className="grid h-screen place-items-center">
          <Card className="max-w-xl w-full">
            <CardBody>
              <Button className="close" onClick={closeEditPopup}>
                &times;
              </Button>
              <Typography
                color="blue-gray"
                className="mb-6 mt-10 ml-56"
                variant="h4"
              >
                Restock
              </Typography>
              <Input
                type="text"
                value={editedName}
                label="Stock Name"
                className=""
                disabled
              />
              <br />
              <Input
                type="text"
                value={editedStock}
                onChange={(e) => setEditedStock(e.target.value)}
                label="Current Stock"
                disabled
              />
              <br />
              <Input
                type="text"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
                label="Price"
              />
              <br />
              <Input
                type="number"
                id="restockAmount"
                label="Restock Amount"
                className="border rounded p-2"
                value={restockAmount}
                onChange={(e) => setRestockAmount(e.target.value)}
              />
              <Button className="m-5 ml-60" onClick={() => handleRestock()}>
                Update
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
