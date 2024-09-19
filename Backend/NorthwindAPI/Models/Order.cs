// Models/Order.cs
namespace NorthwindAPI.Models
{
    public class Order
    {
        public int OrderID { get; set; }
        public string CustomerName { get; set; }
        public string EmployeeName { get; set; }
        public string ShipName { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
