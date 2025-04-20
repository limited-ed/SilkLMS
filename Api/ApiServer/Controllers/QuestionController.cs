using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SilkLMS.Api.Models;

namespace SilkLMS.Api;


[Authorize(Policy = "Admin")]
[Produces("application/json")]
[Route("api/[controller]")]
public class QuestionController : Controller
{
    private DataContext _context;
    public QuestionController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        return Ok(await _context.Questions.Include(i => i.Answers.OrderBy(o => o.Id)).ToListAsync());
    }

    [HttpGet("{id}")]
    [Authorize()]
    public async Task<ActionResult> Get(int id)
    {
        var quest = await _context.Questions.Include(i => i.Answers.OrderBy(o => o.Id)).FirstOrDefaultAsync(f => f.Id == id);
        if (quest is not null)
        {
            return Ok(quest);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] Question question)
    {
        if (question.Id != 0 || question.Answers is null || question.Answers.Count == 0)
        {
            return BadRequest();
        }

        _context.AttachRange(question.Answers);
        _context.Questions.Add(question);
        await _context.SaveChangesAsync();
        return CreatedAtAction("post", question);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Put(int id, [FromBody] Question question)
    {
        if (!_context.Questions.Any(a => a.Id == id))
        {
            return BadRequest();
        }

        var answers = await _context.Answers.Where(w => w.QuestionId == id).ToListAsync();
        foreach( var answer in question.Answers)
        {
            if( answer.Id==0)
            {
                _context.Attach(answer);
            }
            var a=answers.FirstOrDefault(f => f.Id==answer.Id);
            if (a is not null)
            {
                _context.Entry(a).State=EntityState.Detached;
                _context.Entry(answer).State = EntityState.Modified;
            }
        }
        foreach(var answer in answers)
        {
            if (!question.Answers.Any(a => a.Id == answer.Id))
            {
                _context.Entry(answer).State = EntityState.Deleted;
            }
        }
         
        _context.Entry(question).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var quest = await _context.Questions.Include(i => i.Answers).FirstOrDefaultAsync(f => f.Id == id);
        if (quest is null)
        {
            return BadRequest();
        }
        foreach (var answer in quest.Answers)
        {
            _context.Entry(answer).State = EntityState.Deleted;
        }
        _context.Questions.Remove(quest);
        await _context.SaveChangesAsync();
        return Ok();
    }
}
