import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Container, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditOrder: React.FC<any> = () => {
  const [order, setOrder] = useState<any | null>(null);
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`http://localhost:5131/api/orders/${id}`);
      const data = await response.json();
      console.log({ data });
      setOrder(data);
      setOrderDetails(data.orderDetails);
    };

    fetchOrder();
  }, [id]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (order) {
      setOrder({ ...order, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const response = await fetch(`http://localhost:5131/api/orders/${id}`, {
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

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!order) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Edit Order
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer ID"
              name="customerID"
              value={order.customerID}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Employee ID"
              name="employeeID"
              value={order.employeeID}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Order Date"
              name="orderDate"
              type="date"
              value={order.orderDate.split('T')[0]}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Required Date"
              name="requiredDate"
              type="date"
              value={order.requiredDate.split('T')[0]}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ship Name"
              name="shipName"
              value={order.shipName}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" onClick={handleConfirmDialog} style={{ marginTop: '1rem', marginRight: '1rem' }}>
          Save Changes
        </Button>

        <Button variant="outlined" color="secondary" onClick={handleGoBack} style={{ marginTop: '1rem' }}>
          Go Back
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
    </Container>
  );
};

export default EditOrder;
