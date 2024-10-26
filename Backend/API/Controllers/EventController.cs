using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Models;
using Services.Services;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EventController : ControllerBase
{
    private readonly IEventService _eventService;

    public EventController(IEventService eventService)
    {
        _eventService = eventService;
    }

    [HttpGet]
    public async Task<ActionResult> GetEventsAsync()
    {
        var events = await _eventService.GetEventsAsync();
        return Ok(events);
    }

    [HttpPost]
    [Authorize(Roles = "User")]
    public async Task<ActionResult> CreateEventAsync([FromBody] CreateEventDto createEventDto)
    {
        var createdEvent = await _eventService.CreateAsync(createEventDto);

        if (!createdEvent)
        {
            return BadRequest();
        }

        return Ok();
    }
}