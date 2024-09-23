import { Shipper } from "../models/Shipper.ts";




const apiUrl = 'http://localhost:5131/api/Shippers'; // 

export const getShippers = async (): Promise<Shipper[]> => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch shippers');
    }
    return response.json();
};
