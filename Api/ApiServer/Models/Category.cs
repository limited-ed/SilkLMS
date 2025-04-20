using System.Reflection.Metadata.Ecma335;

namespace SilkLMS.Api.Models;

public class Category
{
    public int Id { get; set; }
    public string Title { get; set; }

    public override bool Equals(object obj)
    {
        var compare = obj as Category;
        if (compare is null) 
        {
            return false;
        }
        return ( Id == compare.Id ) && ( Title == compare.Title );
    }
    public override int GetHashCode()
    {
        return Id.GetHashCode()+Title.GetHashCode();
    }
}
