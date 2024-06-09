using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Web_API.Data;
using Web_API.Models;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : Controller
    {
        private readonly DatabaseContext _databaseContext;

        public TransactionsController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTransactions(Guid idUser)
        {
            var transactions = await _databaseContext.Transactions.Where(t => t.UserId == idUser).ToListAsync();

            return Ok(transactions);
        }

        [HttpGet("ids/")]
        public async Task<IActionResult> GetAllTransactionsId(Guid idUser)
        {
            var transactionsIds = await _databaseContext.Transactions.Where(t => t.UserId == idUser).OrderByDescending(e => e.Date).Select(a => a.Id).ToListAsync();

            return Ok(transactionsIds);
        }

        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> GetAllTransactionsIdsByText([FromQuery] string text,
                                                                     [FromQuery] DateTime dateStart,
                                                                     [FromQuery] DateTime dateEnd,
                                                                     Guid idUser)
        {
            if (text == null)
            {
                text = "";
            }
            text = text.ToLower();

            var categoryId = await _databaseContext.Categories.Where(c => c.Name.ToLower().Contains(text)).Select(c => c.Id).FirstOrDefaultAsync();

            var transactionsquery = _databaseContext.Transactions.Where(
                n => n.UserId == idUser
                    && (n.Change.ToString().Contains(text)
                    || n.Note.ToLower().Contains(text)
                    || n.CategoryId == (categoryId)));

            if (dateStart != DateTime.MinValue)
            {
                transactionsquery = transactionsquery.Where(n => n.Date >= dateStart);
            }

            if (dateEnd != DateTime.MinValue)
            {
                transactionsquery = transactionsquery.Where(n => n.Date <= dateEnd.AddDays(1));
            }

            var transactionsIds = await transactionsquery.OrderByDescending(e => e.Date).Select(t => t.Id).ToListAsync();

            if (transactionsIds == null)
            {
                return NotFound();
            }

            return Ok(transactionsIds);
        }

        [HttpPost]
        public async Task<IActionResult> AddTransaction([FromBody] Transaction transactionRequest)
        {
            var user = await _databaseContext.Users.FindAsync(transactionRequest.UserId);

            if (user == null)
            {
                return NotFound();
            }

            transactionRequest.Id = Guid.NewGuid();

            DateTime currentTime = DateTime.Now;

            transactionRequest.Date = new DateTime(
                transactionRequest.Date.Year,
                transactionRequest.Date.Month,
                transactionRequest.Date.Day,
                currentTime.Hour,
                currentTime.Minute,
                currentTime.Second
            );

            if (transactionRequest.TypeId == new Guid("67e156e9-aee4-44ea-a016-f628f7a954eb"))
            {
                user.Balance -= transactionRequest.Change;
            }
            else
            {
                user.Balance += transactionRequest.Change;
            }
            transactionRequest.Balance = user.Balance;

            await _databaseContext.Transactions.AddAsync(transactionRequest);
            await _databaseContext.SaveChangesAsync();

            return Ok(transactionRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetTransaction([FromRoute] Guid id)
        {
            var transaction = await _databaseContext.Transactions.FirstOrDefaultAsync(x => x.Id == id);

            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateTransaction([FromRoute] Guid id, Transaction transactionRequest)
        {
            var transaction = await _databaseContext.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            var user = await _databaseContext.Users.FindAsync(transactionRequest.UserId);

            if (user == null)
            {
                return NotFound();
            }

            if (transaction.TypeId == new Guid("67e156e9-aee4-44ea-a016-f628f7a954eb"))
            {
                user.Balance += transaction.Change;
            }
            else
            {
                user.Balance -= transaction.Change;
            }

            if (transactionRequest.TypeId == new Guid("67e156e9-aee4-44ea-a016-f628f7a954eb"))
            {
                user.Balance -= transactionRequest.Change;
            }
            else
            {
                user.Balance += transactionRequest.Change;
            }

            transaction.Change = transactionRequest.Change;
            transaction.Note = transactionRequest.Note;
            transaction.Date = transactionRequest.Date;
            transaction.Balance = transactionRequest.Balance;
            transaction.UserId = transactionRequest.UserId;
            //transaction.Users = transactionRequest.Users;
            transaction.TypeId = transactionRequest.TypeId;
            //transaction.Types = transactionRequest.Types;
            transaction.CategoryId = transactionRequest.CategoryId;
            //transaction.Categories = transactionRequest.Categories;

            await _databaseContext.SaveChangesAsync();

            return Ok(transaction);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteTransaction([FromRoute] Guid id)
        {
            var transaction = await _databaseContext.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            var user = await _databaseContext.Users.FindAsync(transaction.UserId);

            if (user == null)
            {
                return NotFound();
            }

            if (transaction.TypeId == new Guid("67e156e9-aee4-44ea-a016-f628f7a954eb"))
            {
                user.Balance += transaction.Change;
            }
            else
            {
                user.Balance -= transaction.Change;
            }


            _databaseContext.Transactions.Remove(transaction);
            await _databaseContext.SaveChangesAsync();

            return Ok();
        }
    }
}
