using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace SilkLMS.Api.Controllers;


[Authorize(Policy = "Admin")]
[Produces("application/json")]
[Route("api/[controller]")]
public class GroupController(DataContext context) : Controller
{
    [Authorize()]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await context.UsersGroups.ToListAsync());
    }

}
