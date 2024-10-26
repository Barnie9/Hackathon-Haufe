using Models.Models;

namespace Services.Services;

public interface IUserService
{
    Task<UserDto?> GetByRefreshTokenAsync(string refreshToken);
    Task<bool> CreateAsync(RegisterCredentials registerCredentials, List<string> roleNames, string refreshToken);
    Task<bool> UpdateRefreshTokenAsync(string oldRefreshToke, string newRefreshToken);
}