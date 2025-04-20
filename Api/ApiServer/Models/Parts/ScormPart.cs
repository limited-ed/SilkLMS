using System.Text.Json.Serialization;

namespace SilkLMS.Api.Models.Parts;


public class ScormPart: Part
{
    public string Filename { get; set; }
}