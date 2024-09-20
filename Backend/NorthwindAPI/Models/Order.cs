// Models/Order.cs
namespace NorthwindAPI.Models
{
   public class Order
{
    public int OrderID { get; set; }
    public string? CustomerID { get; set; } // Nullable
    public int? EmployeeID { get; set; } // Nullable
    public DateTime OrderDate { get; set; }
    public DateTime? RequiredDate { get; set; } // Nullable
    public DateTime? ShippedDate { get; set; } // Nullable
    public int? ShipVia { get; set; } // Nullable
    public decimal Freight { get; set; }
    public string? ShipName { get; set; } // Nullable
    public string? ShipAddress { get; set; } // Nullable
    public string? ShipCity { get; set; } // Nullable
    public string? ShipRegion { get; set; } // Nullable
    public string? ShipPostalCode { get; set; } // Nullable
    public string? ShipCountry { get; set; } // Nullable
}

}



