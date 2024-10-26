using System.ComponentModel.DataAnnotations;

namespace Models.Entities;

public class EventTask
{
    public Guid Id { get; set; }

    [StringLength(128)] public string Title { get; set; } = "";
    public bool IsCompleted { get; set; } = false;
    public float? Cost { get; set; }

    public Guid EventId { get; set; }
    public Event? Event { get; set; }

    public List<User> Assignees { get; set; }
}