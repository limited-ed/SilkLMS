using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace SilkLMS.Api.Controllers;

[Authorize(Policy = "Admin")]
[Produces("application/json")]
[Route("api/[controller]")]
public class CourceController : Controller
{
   private DataContext _context;

   public CourceController(DataContext context)
   {
      _context = context;
   }

   [HttpGet]
   public async Task<IActionResult> Get()
   {
      return Ok(await _context.Cources.Include(i=>i.PartItems).ToListAsync());
   }
   
   
   
}