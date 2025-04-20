using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using SilkLMS.Api.Controllers;

namespace SilkLMS.Api.Test;

class LoginResponse
{
    public string Token { get; set; }
}

public class LoginIntegrationTests: IClassFixture<ApiWebApplicationFactory<Program>>
{
    private readonly ApiWebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public LoginIntegrationTests(ApiWebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = _factory.CreateClient();
    }

    [Fact]
    public async Task Login_Sucsessful()
    {
        var data = new UserModel() {Email = "Admin", Password = "1"};
        var content = JsonContent.Create(data);
        var response = await _client.PostAsync("/login", content);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);        
        var responseStr = await response.Content.ReadAsStringAsync();
        var res = JsonSerializer.Deserialize<LoginResponse>(responseStr, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        Assert.NotNull(res.Token);

    }
    
    [Fact]
    public async Task Login_Failed()
    {
        var data = new UserModel() {Email = "Admin", Password = "111111"};
        var content = JsonContent.Create(data);
        var response = await _client.PostAsync("/login", content);
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }
}