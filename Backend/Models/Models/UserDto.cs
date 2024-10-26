using Models.Entities;

namespace Models.Models;

public class UserDto
{
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }

    public UserDto(User user)
    {
        Username = user.Username;
        FirstName = user.FirstName;
        LastName = user.LastName;
        Email = user.Email;
    }
}