// customerService.ts
import axios from 'axios';
import { Employee } from '../models/Employee';
import { OrderDetail } from '../models/OrderDetail';


const API_URL = 'http://localhost:5131/api/orderdetails';

export const getOrderDetails = async (): Promise<OrderDetail[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};
