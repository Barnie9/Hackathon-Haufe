using System.Security.Cryptography;
using System.Text.RegularExpressions;
using dotenv.net.Utilities;
using Models.Models;
using Models.Entities;
using Services.Repositories;
using Services.Utils;

namespace Services.Services.Implementation;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;

    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<CredentialValidationErrors> VerifyRegisterCredentialsAsync(RegisterCredentials registerCredentials)
    {
        var validationErrors = new CredentialValidationErrors();

        var usernameRegex = new Regex(@"^[a-zA-Z0-9_]{3,20}$");
        if (!usernameRegex.IsMatch(registerCredentials.Username))
        {
            validationErrors.Username = "Username must be between 3 and 20 characters long and can only contain letters, numbers and underscores";
        } else if (await _userRepository.CheckIfUsernameExistsAsync(registerCredentials.Username))
        {
            validationErrors.Username = "Username already exists";
        }

        var emailRegex = new Regex(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");
        if (!emailRegex.IsMatch(registerCredentials.Email))
        {
            validationErrors.Email = "Invalid email format";
        } else if (await _userRepository.CheckIfEmailExistsAsync(registerCredentials.Email))
        {
            validationErrors.Email = "Email already exists";
        }

        var passwordRegex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$");
        if (!passwordRegex.IsMatch(registerCredentials.Password))
        {
            validationErrors.Password = "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit and one special character";
        } else if (registerCredentials.Password != registerCredentials.ConfirmPassword)
        {
            validationErrors.Password = "Passwords do not match";
            validationErrors.ConfirmPassword = "Passwords do not match";
        }

        return validationErrors;
    }

    public async Task<AuthResponse> RegisterAsync(RegisterCredentials registerCredentials)
    {
        var refreshToken = JwtUtil.GenerateRefreshToken();

        var roles = new List<Role>
        {
            new Role
            {
                Name = "User",
                NormalizedName = "USER"
            }
        };

        var user = new User
        {
            Username = registerCredentials.Username,
            FirstName = registerCredentials.FirstName,
            LastName = registerCredentials.LastName,
            Email = registerCredentials.Email,
            PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(registerCredentials.Password, 13),

            RefreshToken = refreshToken,
            RefreshTokenExpiryTime = DateTime.UtcNow.AddMinutes(EnvReader.GetIntValue("REFRESH_TOKEN_EXPIRATION")),

            IsActive = true,
            IsLocked = false,

            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,

            Roles = roles
        };

        await _userRepository.CreateAsync(user);

        return new AuthResponse
        {
            Token = JwtUtil.GenerateToken(user),
            RefreshToken = refreshToken
        };
    }

    public async Task<AuthResponse?> LoginAsync(LoginCredentials loginCredentials)
    {
        User? user;
        if (loginCredentials.Username != null)
        {
            user = await _userRepository.GetByUsernameAsync(loginCredentials.Username);
        }
        else if (loginCredentials.Email != null)
        {
            user = await _userRepository.GetByEmailAsync(loginCredentials.Email);
        }
        else
        {
            return null;
        }

        if (user == null || !BCrypt.Net.BCrypt.EnhancedVerify(loginCredentials.Password, user.PasswordHash))
        {
            return null;
        }

        return new AuthResponse
        {
            Token = JwtUtil.GenerateToken(user),
            RefreshToken = user.RefreshToken
        };
    }

    public async Task<AuthResponse?> RefreshTokenAsync(string refreshToken)
    {
        var user = await _userRepository.GetByRefreshTokenAsync(refreshToken);
        if (user == null)
        {
            return null;
        }

        if (user.RefreshTokenExpiryTime < DateTime.UtcNow)
        {
            return new AuthResponse
            {
                Token = JwtUtil.GenerateToken(user),
                RefreshToken = JwtUtil.GenerateRefreshToken()
            };
        }

        return new AuthResponse
        {
            Token = JwtUtil.GenerateToken(user),
            RefreshToken = user.RefreshToken
        };
    }
}