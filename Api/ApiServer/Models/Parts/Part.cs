using System.Text.Json.Serialization;

namespace SilkLMS.Api.Models.Parts;


[JsonPolymorphic(TypeDiscriminatorPropertyName = "$type")]
[JsonDerivedType(typeof(SimpleLecturePart), nameof(SimpleLecturePart))]
[JsonDerivedType(typeof(ScormPart), nameof(ScormPart))]
[JsonDerivedType(typeof(TestPart), nameof(TestPart))]
public class Part
{
    public string Id { get; set; }  
    public string Title { get; set; }
    public int Score { get; set; }
}