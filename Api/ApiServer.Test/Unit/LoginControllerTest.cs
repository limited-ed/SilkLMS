using AutoFixture;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MockQueryable.Moq;
using Moq;
using SilkLMS.Api.Authorization;
using SilkLMS.Api.Controllers;
using SilkLMS.Api.Models;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace SilkLMS.Api.Test.Unit;

public class LoginControllerTest
{
    private readonly Mock<SignInManager<User>> _signInContext;
    private readonly JwtUtils _jwtUtils;

    public LoginControllerTest()
    {
        var fixture = new Fixture();
        _signInContext = new Mock<SignInManager<User>>();
        _signInContext
            .Setup(s => s.PasswordSignInAsync(It.IsAny<User>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>()))
            .Returns(Task.FromResult(SignInResult.Success));
        var jwtKey = fixture.Create<JWTKey>();
        _jwtUtils = new JwtUtils(jwtKey);
    }

    [Fact]
    public void LoginController_Success_Login()
    {
        var userData = new UserModel() { Email = "test", Password = "test" };
        var controller = new LoginController(_jwtUtils, _signInContext.Object);
        var result = controller.Token(userData);
        Assert.IsType<JsonResult>(result);
    }

    [Fact]
    public void LoginController_Fail_Login()
    {
        var userData = new UserModel() { Email = "test", Password = "sssssssss" };
        var controller = new LoginController(_jwtUtils, _signInContext.Object);
        var result = controller.Token(userData);
        Assert.IsType<UnauthorizedResult>(result);
    }
}