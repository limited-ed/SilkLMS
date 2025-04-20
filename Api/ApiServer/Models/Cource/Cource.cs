using SilkLMS.Api.Models.Parts;

namespace SilkLMS.Api.Models;

public class Cource
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Theme { get; set; }
    public List<PartItem> PartItems { get; set; }
    public List<User> Users { get; set; }
}