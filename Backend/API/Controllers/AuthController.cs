using dotenv.net.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Models;
using Services.Services;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IUserService _userService;

    public AuthController(IAuthService authService, IUserService userService)
    {
        _authService = authService;
        _userService = userService;
    }

    [HttpPost("verify-register-credentials")]
    public async Task<ActionResult<CredentialValidationErrors>> VerifyRegisterCredentials([FromBody] RegisterCredentials registerCredentials)
    {
        var validationErrors = await _authService.VerifyRegisterCredentialsAsync(registerCredentials);
        return Ok(validationErrors);
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterCredentials registerCredentials)
    {
        var authResponse = await _authService.RegisterAsync(registerCredentials);
        return Ok(authResponse);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginCredentials loginCredentials)
    {
        var authResponse = await _authService.LoginAsync(loginCredentials);

        if (authResponse == null)
        {
            return BadRequest();
        }

        return Ok(authResponse);
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult<AuthResponse>> RefreshToken([FromBody] RefreshTokenRequest refreshTokenRequest)
    {
        var authResponse = await _authService.RefreshTokenAsync(refreshTokenRequest.RefreshToken);

        if (authResponse == null)
        {
            return BadRequest();
        }

        if (authResponse.RefreshToken != refreshTokenRequest.RefreshToken)
        {
            var isUserUpdated = await _userService.UpdateRefreshTokenAsync(refreshTokenRequest.RefreshToken, authResponse.RefreshToken);
            if (!isUserUpdated)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        return Ok(authResponse);
    }
}