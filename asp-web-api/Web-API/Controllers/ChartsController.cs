using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_API.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChartsController : Controller
    {
        private readonly DatabaseContext _databaseContext;

        public ChartsController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet]
        [Route("line/balance")]
        public async Task<IActionResult> GetBalanceChart([FromQuery] DateTime dateStart, [FromQuery] DateTime dateEnd, Guid idUser)
        {
            var query = _databaseContext.Transactions.Where(t => t.UserId == idUser);

            if (dateStart != DateTime.MinValue)
            {
                query = query.Where(n => n.Date >= dateStart);
            }

            if (dateEnd != DateTime.MinValue)
            {
                query = query.Where(n => n.Date <= dateEnd.AddDays(1));
            }

            var transactions = await query.OrderByDescending(e => e.Date).ToListAsync();

            var groupedTransactions = transactions
                .GroupBy(t => t.Date.Date)
                .Select(group => new
                {
                    Date = group.Key,
                    LastBalance = group.OrderByDescending(t => t.Date).FirstOrDefault().Balance
                })
                .OrderBy(e => e.Date)
                .ToList();

            var result = new List<object>();

            var series = groupedTransactions.Select(group => new
            {
                name = group.Date.ToString("yyyy-MM-dd"),
                value = group.LastBalance
            }).ToList();

            result.Add(new
            {
                name = "Your balance",
                series
            });

            return Ok(result);
        }

        [HttpGet]
        [Route("pie/expense")]
        public async Task<IActionResult> GetExpenseChart([FromQuery] DateTime dateStart, [FromQuery] DateTime dateEnd, Guid idUser)
        {
            var query = _databaseContext.Transactions.Where(t => t.UserId == idUser && t.TypeId == new Guid("67e156e9-aee4-44ea-a016-f628f7a954eb"));

            if (dateStart != DateTime.MinValue)
            {
                query = query.Where(n => n.Date >= dateStart);
            }

            if (dateEnd != DateTime.MinValue)
            {
                query = query.Where(n => n.Date <= dateEnd.AddDays(1));
            }

            var transactions = await query.OrderByDescending(e => e.Date).ToListAsync();

            var categories = await _databaseContext.Categories.ToListAsync();

            var result = transactions
                .GroupBy(t => t.CategoryId)
                .Select(group => new
                {
                    name = categories.FirstOrDefault(c => c.Id == group.Key).Name,
                    value = group.Sum(t => t.Change)
                })
                .Where(item => item.name != null)
                .ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("pie/income")]
        public async Task<IActionResult> GetIncomeChart([FromQuery] DateTime dateStart, [FromQuery] DateTime dateEnd, Guid idUser)
        {
            var query = _databaseContext.Transactions.Where(t => t.UserId == idUser && t.TypeId != new Guid("67e156e9-aee4-44ea-a016-f628f7a954eb"));

            if (dateStart != DateTime.MinValue)
            {
                query = query.Where(n => n.Date >= dateStart);
            }

            if (dateEnd != DateTime.MinValue)
            {
                query = query.Where(n => n.Date <= dateEnd.AddDays(1));
            }

            var transactions = await query.OrderByDescending(e => e.Date).ToListAsync();

            var categories = await _databaseContext.Categories.ToListAsync();

            var result = transactions
                .GroupBy(t => t.CategoryId)
                .Select(group => new
                {
                    name = categories.FirstOrDefault(c => c.Id == group.Key).Name,
                    value = group.Sum(t => t.Change)
                })
                .Where(item => item.name != null)
                .ToList();

            return Ok(result);
        }
    }
}
