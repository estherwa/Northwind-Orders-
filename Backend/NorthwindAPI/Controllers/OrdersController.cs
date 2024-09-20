using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NorthwindAPI.Data;
using NorthwindAPI.Models;

namespace NorthwindAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public OrdersController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: api/Orders
      [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
             var orders = await _context.Orders.ToListAsync(); 
            return Ok(orders);
        }

        
    }
}






