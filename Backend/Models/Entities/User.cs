using System.ComponentModel.DataAnnotations;

namespace Models.Entities;

public class User
{
    public Guid Id { get; set; }

    [StringLength(128)] public string Username { get; set; } = "";
    [StringLength(128)] public string FirstName { get; set; } = "";
    [StringLength(128)] public string LastName { get; set; } = "";
    [StringLength(128)] public string Email { get; set; } = "";
    [StringLength(256)] public string PasswordHash { get; set; } = "";

    [StringLength(128)] public string RefreshToken { get; set; } = "";
    public DateTime RefreshTokenExpiryTime { get; set; }

    public bool IsActive { get; set; }
    public bool IsLocked { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public List<Role> Roles { get; set; } = new();
    public List<EventTask> EventTasks { get; set; } = new();
    public List<Event> CreatedEvents { get; set; } = new();
    public List<Event> JoinedEvents { get; set; } = new();
}