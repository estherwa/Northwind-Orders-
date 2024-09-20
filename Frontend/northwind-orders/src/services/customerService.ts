// customerService.ts
import axios from 'axios';
import { Customer } from '../models/Customer';

const API_URL = 'http://localhost:5131/api/customers';

export const getCustomers = async (): Promise<Customer[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};
