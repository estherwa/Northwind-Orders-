// src/components/OrderList.tsx
import React, { useState, useEffect } from 'react';
import { Order } from '../types/Order';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Button
} from '@mui/material';
import OrderRow from './OrderRow.tsx';
import Pagination from './Pagination.tsx';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Simulated fetching of orders
    const dummyOrders: Order[] = [
      // Dummy data here...
    ];
    setOrders(dummyOrders);
  }, []);

  useEffect(() => {
    const filtered = orders.filter(order =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const sortOrders = () => {
    const sorted = [...filteredOrders].sort((a, b) => {
      const dateA = new Date(a.orderDate).getTime();
      const dateB = new Date(b.orderDate).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setFilteredOrders(sorted);
  };

  const handleSortToggle = () => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    sortOrders();
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <TextField
        label="Search by customer or employee name"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Ship Name</TableCell>
              <TableCell>
                <Button onClick={handleSortToggle}>
                  Order Date {sortDirection === 'asc' ? '↑' : '↓'}
                </Button>
              </TableCell>
              <TableCell>Order Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default OrderList;
