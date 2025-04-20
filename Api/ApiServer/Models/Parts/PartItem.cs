using System.Text.Json.Serialization;

namespace SilkLMS.Api.Models.Parts;

public class PartItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Type { get; set; }

    public Part Part { get; set; }
    
    [JsonIgnore]
    public virtual List<Cource> Cources { get; set; }
}