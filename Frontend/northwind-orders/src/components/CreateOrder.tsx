import React, { useEffect, useReducer } from 'react';
import { getCustomers } from '../services/customerService.ts';
import { getEmployees } from '../services/employeeService.ts';
import { getShippers } from '../services/Shipper.ts';
import { useParams, useNavigate } from 'react-router-dom';
import './CreateOrder.css';

const initialState = {
    customers: [],
    employees: [],
    shippers: [],
    products: [],
    orderDetails: [],
    form: {
        customerID: '',
        employeeID: '',
        orderDate: '',
        requiredDate: '',
        shipperID: '',
        orderDetails: []
    },
    successMessage: '',
    errorMessage: ''
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, [action.field]: action.data };
        case 'UPDATE_FORM':
            return { ...state, form: { ...state.form, [action.field]: action.value } };
        case 'ADD_ORDER_DETAIL':
            return { ...state, orderDetails: [...state.orderDetails, action.data] };
        case 'SET_MESSAGE':
            return { ...state, [action.messageType]: action.message };
        default:
            return state;
    }
}

const CreateOrder: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const customersData = await getCustomers();
                const employeesData = await getEmployees();
               const shippersData = await getShippers();
                //const productsData = await getProducts();

                dispatch({ type: 'SET_DATA', field: 'customers', data: customersData });
                dispatch({ type: 'SET_DATA', field: 'employees', data: employeesData });
                dispatch({ type: 'SET_DATA', field: 'shippers', data: shippersData  });
                dispatch({ type: 'SET_DATA', field: 'products', data: "" });
            } catch (error) {
                dispatch({ type: 'SET_MESSAGE', messageType: 'errorMessage', message: 'Error loading data' });
            }
        };

        fetchData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5131/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerID: state.form.customerID,
                    employeeID: state.form.employeeID,
                    orderDate: state.form.orderDate,
                    requiredDate: state.form.requiredDate,
                    shipperID: state.form.shipperID,
                        "freight": 12.34,
                        "shipName": "Ship To Name",
                        "shipAddress": "123 Shipping St",
                        "shipCity": "Shipping City",
                        "shipRegion": "Shipping Region",
                        "shipPostalCode": "12345",
                        "shipCountry": "Shipping"
                    
                   
                })
            });

            if (response.ok) {
                dispatch({ type: 'SET_MESSAGE', messageType: 'successMessage', message: 'Order successfully created!' });
                navigate('/');
            } else {
                const errorData = await response.json();
                dispatch({ type: 'SET_MESSAGE', messageType: 'errorMessage', message: errorData.message || 'Error creating order' });
            }
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', messageType: 'errorMessage', message: 'Failed to create order. Please try again later.' });
        }
    };

    

    const handleAddOrderDetail = () => {
        dispatch({ type: 'ADD_ORDER_DETAIL', data: { productID: '', quantity: 0, unitPrice: 0 } });
    };

    return (
        <div className="create-order">
              <h1 >Create New Order</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer</label>
                    <select value={state.form.customerID} onChange={(e) => dispatch({ type: 'UPDATE_FORM', field: 'customerID', value: e.target.value })}>
                        <option value="">Select Customer</option>
                        {state.customers.map((customer) => (
                            <option key={customer.customerID} value={customer.customerID}>{customer.companyName}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Employee</label>
                    <select value={state.form.employeeID} onChange={(e) => dispatch({ type: 'UPDATE_FORM', field: 'employeeID', value: e.target.value })}>
                        <option value="">Select Employee</option>
                        {state.employees.map((employee) => (
                            <option key={employee.employeeID} value={employee.employeeID}>{employee.firstName} {employee.lastName}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Order Date</label>
                    <input type="date" value={state.form.orderDate} onChange={(e) => dispatch({ type: 'UPDATE_FORM', field: 'orderDate', value: e.target.value })} />
                </div>

                <div className="form-group">
                    <label>Required Date</label>
                    <input type="date" value={state.form.requiredDate} onChange={(e) => dispatch({ type: 'UPDATE_FORM', field: 'requiredDate', value: e.target.value })} />
                </div>

                <div className="form-group">
                    <label>Shipper</label>
                    <select value={state.form.shipperID} onChange={(e) => dispatch({ type: 'UPDATE_FORM', field: 'shipperID', value: e.target.value })}>
                        <option value="">Select Shipper</option>
                        {state?.shippers?.map((shipper) => (
                            <option key={shipper.shipperID} value={shipper.shipperID}>{shipper.companyName}</option>
                        ))}
                    </select>
                </div>

                

                <div className="order-details-section">
                   
                    {state?.orderDetails?.map((detail, index) => (
                        <div key={index} className="form-group order-detail">
                            <label>Product</label>
                            <select>
                                <option value="">Select Product</option>
                                {state?.products?.map((product) => (
                                    <option key={product.productID} value={product.productID}>{product.productName}</option>
                                ))}
                            </select>

                            <label>Quantity</label>
                            <input type="number" />

                            <label>Unit Price</label>
                            <input type="text" readOnly />
                        </div>
                    ))}
                   
                </div>

                <button type="submit" className="submit-button">Submit</button>
            </form>

            {state.successMessage && <div className="success-message">{state.successMessage}</div>}
            {state.errorMessage && <div className="error-message">{state.errorMessage}</div>}
        </div>
    );
};

export default CreateOrder;
