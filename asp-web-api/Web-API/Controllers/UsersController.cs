using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_API.Data;
using Web_API.Models;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly DatabaseContext _databaseContext;

        public UsersController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _databaseContext.Users.ToListAsync();

            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] User userRequest)
        {
            userRequest.Id = Guid.NewGuid();

            await _databaseContext.Users.AddAsync(userRequest);
            await _databaseContext.SaveChangesAsync();

            return Ok(userRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            var user = await _databaseContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateUser([FromRoute] Guid id, User userRequest)
        {
            var user = await _databaseContext.Users.FindAsync(id);

            if(user == null)
            {
                return NotFound();
            }

            user.Email = userRequest.Email;
            user.Password = userRequest.Password;
            user.Name = userRequest.Name;
            user.Date_Registration = userRequest.Date_Registration;
            //user.Goals = userRequest.Goals;
            //user.Transactions = userRequest.Transactions;

            await _databaseContext.SaveChangesAsync();

            return Ok(user);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid id)
        {
            var user = await _databaseContext.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            
            _databaseContext.Users.Remove(user);
            await _databaseContext.SaveChangesAsync();

            return Ok();
        }
    }
}
