using Models.Entities;

namespace Models.Models;

public class EventTaskDto
{
    public string Title { get; set; }
    public bool IsCompleted { get; set; }
    public float? Cost { get; set; }

    public List<UserDto> Assignees { get; set; }

    public EventTaskDto(EventTask eventTask)
    {
        Title = eventTask.Title;
        IsCompleted = eventTask.IsCompleted;
        Cost = eventTask.Cost;
        Assignees = eventTask.Assignees.Select(a => new UserDto(a)).ToList();
    }
}