// customerService.ts
import axios from 'axios';
import { Employee } from '../models/Employee';


const API_URL = 'http://localhost:5131/api/employees';

export const getEmployees = async (): Promise<Employee[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};
