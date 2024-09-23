export interface Employee {
    employeeID: number;
    lastName: string;
    firstName: string;
    title: string;
    titleOfCourtesy: string;
    birthDate: Date; // Use Date type
    hireDate: Date; // Use Date type
    address: string;
    city: string;
    region?: string; // Optional
    postalCode: string;
    country: string;
    homePhone: string;
    extension: string;
    photo?: string; // Optional, if stored as string
    notes?: string; // Optional
    reportsTo?: number; // Optional
    photoPath?: string; // Optional
}
