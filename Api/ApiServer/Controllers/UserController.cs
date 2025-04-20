using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SilkLMS.Api.Models;

namespace SilkLMS.Api.Controllers;
[Authorize(Policy = "Admin")]
[Produces("application/json")]
[Route("api/[controller]")]
public class UserController(UserManager<User> userManager) : Controller
{

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await userManager.Users.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }
        
        return Ok(user);
    }
    
    [HttpPost]
    public async Task<IActionResult> Post(User user)
    {
        try
        {
            await userManager.CreateAsync(user);
        }
        catch (Exception e)
        {
            return BadRequest();
        }
        
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put([FromRoute] string id, [FromBody] User user)
    {
        if (id != user.Id)
        {
            return BadRequest();
        }
        try
        {
            await userManager.UpdateAsync(user);
        }
        catch (Exception e)
        {
            return BadRequest();
        }

        return Ok();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {

        }
        catch (Exception e)
        {
            return BadRequest();
        }

        return Ok();
    }

}
