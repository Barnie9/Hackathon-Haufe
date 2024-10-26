using Models.Entities;

namespace Services.Repositories;

public interface IUserRepository
{
    Task<User?> GetByUsernameAsync(string username);
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByRefreshTokenAsync(string refreshToken);
    Task<bool> CheckIfEmailExistsAsync(string email);
    Task<bool> CheckIfUsernameExistsAsync(string username);
    Task<User?> CreateAsync(User user);
    Task<User?> UpdateAsync(User user);
}