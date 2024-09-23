using Microsoft.EntityFrameworkCore;
using NorthwindAPI.Models;

namespace NorthwindAPI.Data
{
    public class NorthwindContext : DbContext
    {
        public NorthwindContext(DbContextOptions<NorthwindContext> options)
            : base(options)
        {
        }

        public DbSet<Order> Orders { get; set; }
        public DbSet<Customer> Customers { get; set; } 
        public DbSet<Employee> Employees { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; } // Corrected case

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(c => c.CustomerID);
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.ToTable("Order Details"); // Correct table name
                entity.HasKey(od => new { od.OrderID, od.ProductID }); // Composite key
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
