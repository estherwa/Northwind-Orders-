using System.ComponentModel.DataAnnotations;

namespace NorthwindAPI.Models
{
    public class OrderDetail
    {
        public int OrderID { get; set; } // Assuming it's an int
        public int ProductID { get; set; } // Assuming it's an int
        public decimal UnitPrice { get; set; } // Use decimal for currency
        public short Quantity { get; set; } // Use short for small integers
        public float Discount { get; set; } // Use float for percentages
    }
}
