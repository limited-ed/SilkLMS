using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SilkLMS.Api.Models;

namespace SilkLMS.Api.Controllers;

[Authorize(Policy = "Admin")]
[Produces("application/json")]
[Route("api/[controller]")]
public class CategoryController : Controller
{
    private DataContext _context;

    public CategoryController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _context.Categories.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var category = await _context.Categories.SingleOrDefaultAsync(f => f.Id == id);
        if (category != null)
        {
            return Ok(category);
        }

        return NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Category category)
    {
        try
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }
        catch (System.Exception)
        {
            return BadRequest();
        }

        return CreatedAtAction("post", category);

    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Category category)
    {
        var exiting = _context.Categories.Local.SingleOrDefault( s => s.Id==id);
        if (exiting is not null) 
        {
            _context.Entry(exiting).State = EntityState.Detached;
        }
        try
        {
            //_context.Entry(category).State = EntityState.Modified;
            _context.Update(category);
            await _context.SaveChangesAsync();
        }
        catch (System.Exception ex)
        {
            if (!_context.Categories.Any(a => a.Id == category.Id))
            {
                return NotFound();
            }
            else
            {
                return BadRequest(ex.Message);
            }
        }
        return Ok();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var category = await _context.Categories.SingleOrDefaultAsync(m => m.Id == id);
        if (category == null)
        {
            return NotFound();
        }
        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return Ok();
    }
}
