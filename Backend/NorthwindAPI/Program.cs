using Microsoft.EntityFrameworkCore;
using NorthwindAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<NorthwindContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("NorthwindConnection")));

// Build the app
var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

app.Run();
