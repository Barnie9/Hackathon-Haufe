using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Services;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    public TestController()
    {
    }

    [HttpGet("admin-test")]
    [Authorize(Roles = "Admin")]
    public ActionResult AdminTest()
    {
        return Ok("AdminTest");
    }

    [HttpGet("user-test")]
    [Authorize(Roles = "User")]
    public ActionResult UserTest()
    {
        return Ok("UserTest");
    }

    [HttpGet("all-test")]
    [Authorize(Roles = "Admin,User")]
    public ActionResult AllTest()
    {
        return Ok("AllTest");
    }

    [HttpGet("auth-test")]
    [Authorize]
    public ActionResult AuthTest()
    {
        return Ok("AuthTest");
    }

    [HttpGet("no-auth-test")]
    public ActionResult NoAuthTest()
    {
        return Ok("NoAuthTest");
    }
}