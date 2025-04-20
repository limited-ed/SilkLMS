using System.Security.Claims;
using SilkLMS.Api.Models.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SilkLMS.Api.Authorization;
using SilkLMS.Api.Models;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;



namespace SilkLMS.Api.Test.Integration;



public class CategoriesTest : IClassFixture<ApiWebApplicationFactory<Program>>
{

    private readonly HttpClient _client;
    private const string RequestUri = "/api/category";

    public CategoriesTest(ApiWebApplicationFactory<Program> factory)
    {
        var factory1 = factory;
        _client = factory1.CreateClient();


        var identity = new ClaimsIdentity();
        identity.AddClaim(new Claim("Id", "1"));
        identity.AddClaim(new Claim("Login", "Admin"));
        identity.AddClaim(new Claim(ClaimTypes.Role, "Admin"));

        var config = factory1.Services.GetService<IConfiguration>();
        var jwtKey = config.GetSection("JWTKey").Get<JWTKey>();
        var jwtUtils = new JwtUtils(jwtKey);

         var token = jwtUtils.GenerateJwtToken(identity);
         _client.DefaultRequestHeaders.Authorization =
             new AuthenticationHeaderValue(scheme: "Bearer", parameter: token);
    }

    [Fact]
    public async Task Categories_GetAll()
    {

        var response = await _client.GetAsync(RequestUri);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var responseStr = await response.Content.ReadAsStringAsync();
        var res = JsonSerializer.Deserialize<Category[]>(responseStr,
            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        Assert.NotNull(res);
    }
}