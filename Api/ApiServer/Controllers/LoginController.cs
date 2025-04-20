using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using SilkLMS.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SilkLMS.Api.Authorization;
using SilkLMS.Api.Models.Auth;

namespace SilkLMS.Api.Controllers;

public class UserModel
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public class RefreshModel
{
    public string RefreshToken { get; set; }
}

public class LoginController(JwtUtils jwtUtils, SignInManager<User> signInManager) : Controller
{
    [HttpPost]
    [Route("/login")]
    public async Task<IActionResult> Token([FromBody] UserModel userModel)
    {
        var user = await signInManager.UserManager.FindByEmailAsync(userModel.Email);
        if (user != null)
        {
            var result = await signInManager.PasswordSignInAsync(user, userModel.Password, false, false);

            if (result.Succeeded)
            {
                return Json(new AuthenticateResponse { Token = await jwtUtils.GenerateJwtToken(user) });
            }
        }
        return Unauthorized();
    }
}