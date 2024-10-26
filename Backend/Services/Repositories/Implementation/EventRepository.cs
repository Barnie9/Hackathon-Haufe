using Microsoft.EntityFrameworkCore;
using Models;
using Models.Entities;

namespace Services.Repositories.Implementation;

public class EventRepository : IEventRepository
{
    private readonly MyDbContext _context;
    private readonly DbSet<Event> _events;

    public EventRepository(MyDbContext context)
    {
        _context = context;
        _events = context.Events;
    }

    public async Task<List<Event>> GetEventsAsync()
    {
        return await _events
            .Include(e => e.Status)
            .Include(e => e.Organizer)
            .Include(e => e.Participants)
            .Include(e => e.EventTasks)
            .ThenInclude(et => et.Assignees)
            .ToListAsync();
    }

    public async Task<Event?> CreateAsync(Event @event)
    {
        var result = await _events.AddAsync(@event);
        await _context.SaveChangesAsync();
        return result.Entity;
    }
}