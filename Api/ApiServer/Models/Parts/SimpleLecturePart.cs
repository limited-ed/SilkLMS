using System.Text.Json.Serialization;

namespace SilkLMS.Api.Models.Parts;


public class SimpleLecturePart: Part
{
    public PartOptions Options { get; set; }
    public List<string> Pages { get; set; }
    
    
}