using Models.Entities;

namespace Models.Models;

public class EventDto
{
    public Guid Id { get; set; }

    public string Title { get; set; }
    public string? Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public string Location { get; set; }

    public string Status { get; set; }

    public UserDto Organizer { get; set; }
    public List<UserDto> Participants { get; set; }
    public List<EventTaskDto> EventTasks { get; set; }

    public EventDto(Event @event)
    {
        Id = @event.Id;
        Title = @event.Title;
        Description = @event.Description;
        StartTime = @event.StartTime;
        EndTime = @event.EndTime;
        Location = @event.Location;
        Status = @event.Status.Name;

        Organizer = new UserDto(@event.Organizer);
        Participants = @event.Participants.Select(p => new UserDto(p)).ToList();
        EventTasks = @event.EventTasks.Select(t => new EventTaskDto(t)).ToList();
    }
}