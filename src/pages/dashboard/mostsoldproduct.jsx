import React from "react";
import Salesstate from "../sales/salesstate";
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Title,
} from "@tremor/react";

function MostSoldProduct() {
  const { getTopFourProfitableProducts } = Salesstate();
  const topFourProfitableProducts = getTopFourProfitableProducts();

  return (
    <>
      <Card className="mx-auto max-w-md">
        <Title className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          Top Four Most Profitable Products
        </Title>
        <Table className="mt-2">
          <TableHead>
            <TableRow>
              <TableCell className="dark:text-white border border-gray-300">
                Product
              </TableCell>
              <TableCell className="dark:text-white border border-gray-300">
                Profit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topFourProfitableProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="dark:text-white border border-gray-300">
                  {product.product}
                </TableCell>
                <TableCell className="dark:text-white border border-gray-300">
                  N{product.profit}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

export default MostSoldProduct;
