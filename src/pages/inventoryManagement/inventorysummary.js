import React from "react";

function InventorySummary({ items }) {
    const totalStock = items.reduce((acc, item) => acc + item.stock, 0);
    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

    return (
        <tr>
            <td className="p-4">
                <strong>{totalStock}</strong>
            </td>
            <td className="p-4">
                <strong>{totalPrice}</strong>
            </td>
        </tr>
    );
}

export default InventorySummary;
