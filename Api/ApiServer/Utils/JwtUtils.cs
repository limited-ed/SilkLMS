using Microsoft.AspNetCore.Identity;
using SilkLMS.Api.Models;

namespace SilkLMS.Api.Authorization;

using Api.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


public class JWTKey
{
    public string ValidAudience { get; set; }
    public string ValidIssuer { get; set; }
    public string TokenExpiryTimeInHour { get; set; }
    public string Secret { get; set; }
}

public class JwtUtils
{
    private readonly JWTKey _jwtKey;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    
    public JwtUtils(IOptions<JWTKey> jwtKey, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
    {
        _jwtKey = jwtKey.Value;
        if (string.IsNullOrEmpty(_jwtKey.Secret))
            throw new Exception("JWT secret not configured");
        
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public JwtUtils(JWTKey jwtKey)
    {
        _jwtKey = jwtKey;

        if (string.IsNullOrEmpty(_jwtKey.Secret))
            throw new Exception("JWT secret not configured");
    }
    
    
    public  async  Task<string> GenerateJwtToken(User user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        var claims = new Dictionary<string,object>()
        {
            { ClaimTypes.Name, user.UserName },
            { "fullName", user.Fullname },
            { "userId", user.Id },
            {"roles", string.Join(",", roles)}
        };

        return GenerateJwtToken(claims);
    }

    public string GenerateJwtToken(Dictionary<string,object> claims)
    {
        var identity = new ClaimsIdentity();
        foreach (var claim in claims)
        {
            identity.AddClaim(new Claim(claim.Key, claim.Value.ToString()));
        }

        return GenerateJwtToken(identity);
    }

    public string GenerateJwtToken(ClaimsIdentity identity)
    {
        // generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtKey.Secret!);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = identity,
            Audience = _jwtKey.ValidAudience,
            Issuer = _jwtKey.ValidIssuer,           
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Claims = identity.Claims.ToDictionary( t=> t.Type, v => v.Value as object)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }



    public int ValidateJwtToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtKey.Secret!);
        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

            // return user id from JWT token if validation successful
            return userId;
        }
        catch
        {
            // return null if validation fails
            return -1;
        }
    }
}