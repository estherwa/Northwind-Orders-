// App.tsx or Routes.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderList from './components/OrderList.tsx';
import CreateOrder from './components/CreateOrder.tsx';
import EditOrder from './components/EditOrder.tsx';
import ViewOrderDetails from './components/ViewOrderDetails.tsx';
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/edit-order/:id" element={<EditOrder />} />
        <Route path="/view-order/:id" element={<ViewOrderDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
