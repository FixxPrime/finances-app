using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_API.Data;
using Web_API.Models;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly DatabaseContext _databaseContext;

        public AuthController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet]
        public async Task<IActionResult> Login(string login, string password)
        {
            var idUser = await _databaseContext.Users
                        .Where(u => u.Email == login && u.Password == password)
                        .Select(u => u.Id)
                        .FirstOrDefaultAsync();

            if (idUser == Guid.Empty)
            {
                return NotFound();
            }

            return Ok(idUser);
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] User userRequest)
        {
            userRequest.Id = Guid.NewGuid();
            userRequest.Date_Registration = DateTime.Now;
            userRequest.Balance = 0;

            await _databaseContext.Users.AddAsync(userRequest);
            await _databaseContext.SaveChangesAsync();

            return Ok(userRequest.Id);
        }
    }
}
