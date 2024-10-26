using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.Entities;
using System.Web;

namespace Services.Repositories.Implementation;

public class UserRepository : IUserRepository
{
    private readonly MyDbContext _context;
    private readonly DbSet<User> _users;

    public UserRepository(MyDbContext context)
    {
        _context = context;
        _users = context.Users;
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        return await _users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Username == username);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User?> GetByRefreshTokenAsync(string refreshToken)
    {
        Console.WriteLine(HttpUtility.UrlDecode(refreshToken));

        return await _users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.RefreshToken == HttpUtility.UrlDecode(refreshToken));
    }

    public async Task<bool> CheckIfEmailExistsAsync(string email)
    {
        return await _users.AnyAsync(u => u.Email == email);
    }

    public async Task<bool> CheckIfUsernameExistsAsync(string username)
    {
        return await _users.AnyAsync(u => u.Username == username);
    }

    public async Task<User?> CreateAsync(User user)
    {
        var entry = _users.Attach(user);
        await _context.SaveChangesAsync();
        return entry.Entity;
    }

    public async Task<User?> UpdateAsync(User user)
    {
        var entry = _users.Update(user);
        await _context.SaveChangesAsync();
        return entry.Entity;
    }
}