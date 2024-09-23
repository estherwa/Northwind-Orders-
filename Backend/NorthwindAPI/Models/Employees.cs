using System.ComponentModel.DataAnnotations;

namespace NorthwindAPI.Models
{
    public class Employee
    {

       public int EmployeeID { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Title { get; set; }
        public string TitleOfCourtesy { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime HireDate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string? Region { get; set; } // Nullable
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string HomePhone { get; set; }
        public string Extension { get; set; }
        public byte[]? Photo { get; set; } // Nullable// Nullable, if stored as string
        public string? Notes { get; set; } // Nullable
        public int? ReportsTo { get; set; } // Nullable
        public string? PhotoPath { get; set; } // Nullable
    }
}

