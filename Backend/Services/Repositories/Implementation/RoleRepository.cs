using Microsoft.EntityFrameworkCore;
using Models;
using Models.Entities;

namespace Services.Repositories.Implementation;

public class RoleRepository : IRoleRepository
{
    private readonly MyDbContext _context;
    private readonly DbSet<Role> _roles;

    public RoleRepository(MyDbContext context)
    {
        _context = context;
        _roles = context.Roles;
    }

    public async Task<Role?> GetByNameAsync(string roleName)
    {
        return await _roles.FirstOrDefaultAsync(r => r.NormalizedName == roleName.ToUpper());
    }

    public async Task<Role> CreateAsync(Role role)
    {
        var entry = _roles.Attach(role);
        await _context.SaveChangesAsync();
        return entry.Entity;
    }
}