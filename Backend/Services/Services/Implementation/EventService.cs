using Models.Entities;
using Models.Models;
using Services.Repositories;

namespace Services.Services.Implementation;

public class EventService : IEventService
{
    private readonly IEventRepository _eventRepository;
    private readonly IUserRepository _userRepository;

    public EventService(IEventRepository eventRepository, IUserRepository userRepository)
    {
        _eventRepository = eventRepository;
        _userRepository = userRepository;
    }

    public async Task<List<EventDto>> GetEventsAsync()
    {
        var events = await _eventRepository.GetEventsAsync();

        return events.Select(e => new EventDto(e)).ToList();
    }

    public async Task<bool> CreateAsync(CreateEventDto createEventDto)
    {
        var organizer = await _userRepository.GetByUsernameAsync(createEventDto.OrganizerUsername);
        if (organizer == null)
        {
            return false;
        }

        var @event = new Event
        {
            Title = createEventDto.Title,
            Description = createEventDto.Description,
            StartTime = createEventDto.StartTime,
            EndTime = createEventDto.EndTime,
            Location = createEventDto.Location,
            Budget = createEventDto.Budget,
            Status = new Status
            {
                Name = createEventDto.Status,
                NormalizedName = createEventDto.Status.ToUpper()
            },
            Organizer = organizer,
            EventTasks = createEventDto.EventTasks.Select(title => new EventTask
            {
                Title = title,
                IsCompleted = false
            }).ToList()
        };

        var createdEvent = await _eventRepository.CreateAsync(@event);

        return createdEvent != null;
    }
}