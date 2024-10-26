namespace Models.Models;

public class CreateEventDto
{
    public string Title { get; set; }
    public string? Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public string Location { get; set; }
    public float Budget { get; set; }

    public string Status { get; set; }
    public string OrganizerUsername { get; set; }
    public List<string> EventTasks { get; set; }
}