using Models.Models;

namespace Services.Services;

public interface IAuthService
{
    Task<CredentialValidationErrors> VerifyRegisterCredentialsAsync(RegisterCredentials registerCredentials);
    Task<AuthResponse> RegisterAsync(RegisterCredentials registerCredentials);
    Task<AuthResponse?> LoginAsync(LoginCredentials loginCredentials);
    Task<AuthResponse?> RefreshTokenAsync(string refreshToken);
}