using Models.Entities;

namespace Services.Repositories;

public interface IRoleRepository
{
    Task<Role?> GetByNameAsync(string roleName);
    Task<Role> CreateAsync(Role role);
}