using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_API.Data;
using Web_API.Models;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoalsController : Controller
    {
        private readonly DatabaseContext _databaseContext;

        public GoalsController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGoals(Guid idUser)
        {
            var goals = await _databaseContext.Goals.Where(t => t.UserId == idUser).ToListAsync();

            return Ok(goals);
        }

        [HttpGet("ids/")]
        public async Task<IActionResult> GetAllGoalsId(Guid idUser)
        {
            var goalsIds = await _databaseContext.Goals.Where(t => t.UserId == idUser).Select(a => a.Id).ToListAsync();

            return Ok(goalsIds);
        }

        [HttpGet]
        [Route("{text}")]
        public async Task<IActionResult> GetAllGoalsIdsByText([FromRoute] string text, Guid idUser)
        {
            text = text.ToLower();

            var goalsIds = await _databaseContext.Goals.Where(
                n => n.UserId == idUser
                    && (n.Title.Contains(text)
                    || n.Note.Contains(text)
                    || n.GoalBalance.ToString().Contains(text))).Select(t => t.Id).ToListAsync();

            if (goalsIds == null)
            {
                return NotFound();
            }

            return Ok(goalsIds);
        }

        [HttpPost]
        public async Task<IActionResult> AddGoal([FromBody] Goal goalRequest)
        {
            goalRequest.Id = Guid.NewGuid();

            await _databaseContext.Goals.AddAsync(goalRequest);
            await _databaseContext.SaveChangesAsync();

            return Ok(goalRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetGoal([FromRoute] Guid id)
        {
            var goal = await _databaseContext.Goals.FirstOrDefaultAsync(x => x.Id == id);

            if (goal == null)
            {
                return NotFound();
            }

            return Ok(goal);
        }

        [HttpGet]
        [Route("percent/{id:Guid}")]
        public async Task<IActionResult> GetPercent([FromRoute] Guid id, Guid idUser)
        {
            var userBalance = await _databaseContext.Users
                                    .Where(u => u.Id == idUser)
                                    .Select(u => u.Balance)
                                    .FirstOrDefaultAsync();

            var goalBalance = await _databaseContext.Goals
                                    .Where(u => u.Id == id)
                                    .Select(u => u.GoalBalance)
                                    .FirstOrDefaultAsync();

            decimal res = Math.Round((userBalance / goalBalance) * 100, 2);

            return Ok(res);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateGoal([FromRoute] Guid id, Goal goalRequest)
        {
            var goal = await _databaseContext.Goals.FindAsync(id);

            if (goal == null)
            {
                return NotFound();
            }

            goal.GoalBalance = goalRequest.GoalBalance;
            goal.Title = goalRequest.Title;
            goal.Note = goalRequest.Note;
            goal.UserId = goalRequest.UserId;
            //goal.Users = goalRequest.Users;

            await _databaseContext.SaveChangesAsync();

            return Ok(goal);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteGoal([FromRoute] Guid id)
        {
            var goal = await _databaseContext.Goals.FindAsync(id);

            if (goal == null)
            {
                return NotFound();
            }

            _databaseContext.Goals.Remove(goal);
            await _databaseContext.SaveChangesAsync();

            return Ok();
        }
    }
}
