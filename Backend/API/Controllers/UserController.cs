using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Models;
using Services.Services;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [Authorize(Roles = "User")]
    [HttpGet("refresh-token/{refreshToken}")]
    public async Task<ActionResult<UserDto>> GetByRefreshTokenAsync([FromRoute] string refreshToken)
    {
        var user = await _userService.GetByRefreshTokenAsync(refreshToken);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

}