import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

const SalesPopup = ({
  itemName,
  currentStock,
  handleSales,
  closeSalesPopup,
}) => {
  const [salesAmount, setSalesAmount] = React.useState("");

  const handleSalesSubmit = () => {
    const amount = parseInt(salesAmount);
    if (!isNaN(amount) && amount <= currentStock) {
      handleSales(amount);
      closeSalesPopup();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="w-full px-4">
        <div className="grid h-screen place-items-center">
          <Card className="max-w-xl w-full">
            <CardBody>
              <Button className="close" onClick={closeSalesPopup}>
                &times;
              </Button>
              <Typography
                color="blue-gray"
                className="mb-6 mt-10 ml-56"
                variant="h4"
              >
                Sales
              </Typography>
              <Input
                type="text"
                value={itemName}
                label="Item Name"
                className=""
                disabled
              />
              <br />
              <Input
                type="text"
                value={currentStock}
                label="Current Stock"
                className=""
                disabled
              />
              <br />
              <Input
                type="number"
                id="salesAmount"
                label="Sales Amount"
                className="border rounded p-2"
                value={salesAmount}
                onChange={(e) => setSalesAmount(e.target.value)}
              />
              <Button className="m-5 ml-60" onClick={handleSalesSubmit}>
                Confirm Sales
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalesPopup;
