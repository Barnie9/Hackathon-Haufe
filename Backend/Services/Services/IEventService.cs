using Models.Models;

namespace Services.Services;

public interface IEventService
{
    Task<List<EventDto>> GetEventsAsync();
    Task<bool> CreateAsync(CreateEventDto createEventDto);
}