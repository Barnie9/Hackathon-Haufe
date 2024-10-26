using dotenv.net.Utilities;
using Models.Models;
using Models.Entities;
using Services.Repositories;

namespace Services.Services.Implementation;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IRoleRepository _roleRepository;

    public UserService(IUserRepository userRepository, IRoleRepository roleRepository)
    {
        _userRepository = userRepository;
        _roleRepository = roleRepository;
    }

    public async Task<UserDto?> GetByRefreshTokenAsync(string refreshToken)
    {
        var user = await _userRepository.GetByRefreshTokenAsync(refreshToken);
        if (user == null)
        {
            return null;
        }

        return new UserDto(user);
    }

    public async Task<bool> CreateAsync(RegisterCredentials registerCredentials, List<string> roleNames,
        string refreshToken)
    {
        var roles = new List<Role>();
        foreach (var roleName in roleNames)
        {
            var role = await _roleRepository.GetByNameAsync(roleName);
            if (role == null)
            {
                return false;
            }

            roles.Add(role);
        }

        var user = new User
        {
            Username = registerCredentials.Username,
            FirstName = registerCredentials.FirstName,
            LastName = registerCredentials.LastName,
            Email = registerCredentials.Email,
            PasswordHash = registerCredentials.Password,

            RefreshToken = refreshToken,
            RefreshTokenExpiryTime = DateTime.UtcNow.AddMinutes(EnvReader.GetIntValue("REFRESH_TOKEN_EXPIRATION")),

            IsActive = true,
            IsLocked = false,

            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,

            Roles = roles
        };

        var createdUser = await _userRepository.CreateAsync(user);

        return createdUser != null;
    }

    public async Task<bool> UpdateRefreshTokenAsync(string oldRefreshToken, string newRefreshToken)
    {
        var user = await _userRepository.GetByRefreshTokenAsync(oldRefreshToken);
        if (user == null)
        {
            return false;
        }

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddMinutes(EnvReader.GetIntValue("REFRESH_TOKEN_EXPIRATION"));
        user.UpdatedAt = DateTime.UtcNow;

        var updatedUser = await _userRepository.UpdateAsync(user);

        return updatedUser != null;
    }
}