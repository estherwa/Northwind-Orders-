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
        public DbSet<Customer> Customers { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(c => c.CustomerID); // Assuming CustomerID is the primary key
                
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
