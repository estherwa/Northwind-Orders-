import React from 'react';
import { Order } from '../types/Order';

interface OrderRowProps {
  order: Order;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
  return (
    <tr>
      <td>{order.employeeName}</td>
      <td>{order.customerName}</td>
      <td>{order.shipName}</td>
      <td>{order.orderDate}</td>
      <td>{order.totalPrice}</td>
    </tr>
  );
};

export default OrderRow;