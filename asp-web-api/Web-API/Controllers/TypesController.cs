using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_API.Data;
using Web_API.Models;
using Type = Web_API.Models.Type;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TypesController : Controller
    {
        private readonly DatabaseContext _databaseContext;

        public TypesController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTypes()
        {
            var types = await _databaseContext.Types.ToListAsync();

            return Ok(types);
        }

        [HttpPost]
        public async Task<IActionResult> AddType([FromBody] Type typeRequest)
        {
            typeRequest.Id = Guid.NewGuid();

            await _databaseContext.Types.AddAsync(typeRequest);
            await _databaseContext.SaveChangesAsync();

            return Ok(typeRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetType([FromRoute] Guid id)
        {
            var type = await _databaseContext.Types.FirstOrDefaultAsync(x => x.Id == id);

            if (type == null)
            {
                return NotFound();
            }

            return Ok(type);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateType([FromRoute] Guid id, Type typeRequest)
        {
            var type = await _databaseContext.Types.FindAsync(id);

            if (type == null)
            {
                return NotFound();
            }

            type.Name = typeRequest.Name;
            //type.Transactions = typeRequest.Transactions;

            await _databaseContext.SaveChangesAsync();

            return Ok(type);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteType([FromRoute] Guid id)
        {
            var type = await _databaseContext.Types.FindAsync(id);

            if (type == null)
            {
                return NotFound();
            }

            _databaseContext.Types.Remove(type);
            await _databaseContext.SaveChangesAsync();

            return Ok();
        }
    }
}
