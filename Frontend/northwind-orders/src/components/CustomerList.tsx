// CustomerList.tsx
import React, { useEffect, useState } from 'react';
import { getCustomers } from '../services/customerService';
import { Customer } from '../models/Customer';


const CustomerList: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getCustomers();
                setCustomers(data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div>
            <h1>Customer List</h1>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.CustomerID}>{customer.CompanyName}</li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
