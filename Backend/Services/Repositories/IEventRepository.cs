using Models.Entities;

namespace Services.Repositories;

public interface IEventRepository
{
    Task<List<Event>> GetEventsAsync();
    Task<Event?> CreateAsync(Event @event);
}