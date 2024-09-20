// Data/NorthwindContext.cs
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
        public DbSet<Customer> Customers { get; set; } // Add Customers DbSet

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // You can configure the entity properties here if needed
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(c => c.CustomerID); // Assuming CustomerID is the primary key
                // Additional configurations if necessary
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
