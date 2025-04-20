using System.Collections;
using AutoFixture;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MockQueryable.Moq;
using Moq;
using SilkLMS.Api.Controllers;
using SilkLMS.Api.Models;

namespace SilkLMS.Api.Test.Unit;

public class UserControllerTest
{
    private readonly Mock<UserManager<User>> _userManagerMoq;
    private readonly UserController _userController;
    private List<User> _users = new List<User>();

    public UserControllerTest()
    {
        _userManagerMoq = new Mock<UserManager<User>>();
        _userManagerMoq.Setup(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
            .Callback<User, string>((u, p) => { _users.Add(u); }).Returns(Task.FromResult(IdentityResult.Success));
        _userManagerMoq.Setup(x => x.Users).Returns(_users.AsQueryable());
        _userController = new UserController(_userManagerMoq.Object);
    }

    [Fact]
    public async void UserController_GetAllUsers_ShouldReturnAllUsers()
    {
        var _userManager = _userManagerMoq.Object;
        await _userManager.CreateAsync(
            new() { Id = Guid.NewGuid().ToString(), Email = "no.no.com", UserName = "admin" }, "Qq-12345");
        var result = await _userController.GetAll();
        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async void UserController_GetUserById_ShouldReturnUser()
    {
    }
}