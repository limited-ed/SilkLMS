namespace SilkLMS.Api.Models;

public class Answer
{
    public int Id { get; set; }
    public string Text { get; set; }
    public int QuestionId { get; set; }
    public bool Right { get; set; }
    
}