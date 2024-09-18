import React from 'react';
import OrderList from './components/OrderList.tsx';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1 className="app-heading">Order Management System</h1>
      <OrderList />
    </div>
  );
};

export default App;
