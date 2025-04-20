using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace SilkLMS.Api.Models;

public class User: IdentityUser
{
    public string Fullname { get; set; }
    public bool CanDelete { get; set; } = true;

}