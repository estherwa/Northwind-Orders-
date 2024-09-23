import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderDetail } from '../models/OrderDetail';



const EditOrder: React.FC<any> = ({ }) => {
  const [order, setOrder] = useState<any | null>(null);
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    // Fetch the existing order details to pre-fill
    const fetchOrder = async () => {
      const response = await fetch(`/api/orders/${id}`);
      const data = await response.json();
      setOrder(data);
      setOrderDetails(data.orderDetails);
    };

    fetchOrder();
  }, []);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (order) {
      setOrder({ ...order, [name]: value });
    }
  };

  const handleOrderDetailChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index] = { ...updatedOrderDetails[index], [name]: value };
    setOrderDetails(updatedOrderDetails);
  };

  const addOrderDetail = () => {
    setOrderDetails([...orderDetails, { productID: 0, unitPrice: 0, quantity: 0, discount: 0 }]);
  };

  const removeOrderDetail = (index: number) => {
    const updatedOrderDetails = orderDetails.filter((_, i) => i !== index);
    setOrderDetails(updatedOrderDetails);
  };

  const handleSubmit = async () => {
    const response = await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...order, orderDetails }),
    });

    if (response.ok) {
      navigate('/');
    } else {
      alert('Error updating order');
    }
  };

  const handleConfirmDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (confirm: boolean) => {
    setOpenDialog(false);
    if (confirm) {
      handleSubmit();
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Order</h2>
      <form>
        <TextField
          label="Customer ID"
          name="customerID"
          value={order.customerID}
          onChange={handleFieldChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Employee ID"
          name="employeeID"
          value={order.employeeID}
          onChange={handleFieldChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Order Date"
          name="orderDate"
          type="date"
          value={order.orderDate}
          onChange={handleFieldChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Required Date"
          name="requiredDate"
          type="date"
          value={order.requiredDate}
          onChange={handleFieldChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        {/* Order Details */}
        {orderDetails.map((detail, index) => (
          <div key={index}>
            <TextField
              label="Product ID"
              name="productID"
              value={detail.productID}
              onChange={(e) => handleOrderDetailChange(index, e)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Unit Price"
              name="unitPrice"
              value={detail.unitPrice}
              onChange={(e) => handleOrderDetailChange(index, e)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quantity"
              name="quantity"
              value={detail.quantity}
              onChange={(e) => handleOrderDetailChange(index, e)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Discount"
              name="discount"
              value={detail.discount}
              onChange={(e) => handleOrderDetailChange(index, e)}
              fullWidth
              margin="normal"
            />
            <Button onClick={() => removeOrderDetail(index)} color="secondary">
              Remove Order Detail
            </Button>
          </div>
        ))}

        <Button onClick={addOrderDetail} color="primary">
          Add Order Detail
        </Button>

        <Button variant="contained" color="primary" onClick={handleConfirmDialog}>
          Save Changes
        </Button>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => handleCloseDialog(false)}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>Are you sure you want to save these changes?</DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleCloseDialog(true)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditOrder;
