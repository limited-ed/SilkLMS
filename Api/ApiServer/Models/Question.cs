namespace SilkLMS.Api.Models;

public class Question
{
    public int Id { get; set; }

    public int CategoryId { get; set; } 
    public Category Category { get; set; }
    public string Text { get; set; }
    public List<Answer> Answers { get; set; }

    
}
