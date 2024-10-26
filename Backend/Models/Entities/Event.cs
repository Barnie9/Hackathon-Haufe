using System.ComponentModel.DataAnnotations;

namespace Models.Entities;

public class Event
{
    public Guid Id { get; set; }

    [StringLength(128)] public string Title { get; set; } = "";
    [StringLength(256)] public string? Description { get; set; }
    public float Budget { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    [StringLength(128)] public string Location { get; set; } = "";

    public Guid StatusId { get; set; }
    public Status? Status { get; set; }

    public Guid OrganizerId { get; set; }
    public User? Organizer { get; set; }

    public List<User> Participants { get; set; } = new();
    public List<EventTask> EventTasks { get; set; } = new();
}