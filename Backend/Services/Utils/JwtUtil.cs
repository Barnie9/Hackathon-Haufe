using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using dotenv.net.Utilities;
using Microsoft.IdentityModel.Tokens;
using Models.Entities;

namespace Services.Utils;

public static class JwtUtil
{
    public static string GenerateToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(EnvReader.GetStringValue("JWT_SECRET")));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>()
        {
            new Claim(JwtRegisteredClaimNames.Name, user.FirstName),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
        };
        claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role.Name)));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(EnvReader.GetIntValue("JWT_EXPIRATION")),
            SigningCredentials = credentials,
            Issuer = EnvReader.GetStringValue("JWT_ISSUER"),
            Audience = EnvReader.GetStringValue("JWT_AUDIENCE")
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

    public static string GenerateRefreshToken()
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var randomNumberGenerator = RandomNumberGenerator.Create();
        var result = new char[32];
        var buffer = new byte[32];

        randomNumberGenerator.GetBytes(buffer);

        for (int i = 0; i < 32; i++)
        {
            result[i] = chars[buffer[i] % chars.Length];
        }

        return new string(result);
    }
}