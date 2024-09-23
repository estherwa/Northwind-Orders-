using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NorthwindAPI.Data;
using NorthwindAPI.Models;

namespace NorthwindAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public EmployeesController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: api/employees
      [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
             var employees = await _context.Employees.ToListAsync(); 
            return Ok(employees);
        }

        
    }
}






