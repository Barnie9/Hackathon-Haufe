using System.ComponentModel.DataAnnotations;

namespace Models.Entities;

public class Role
{
    public Guid Id { get; set; }

    [StringLength(128)] public string Name { get; set; } = "";
    [StringLength(128)] public string NormalizedName { get; set; } = "";
    [StringLength(512)] public string? Description { get; set; } = "";

    public List<User> Users { get; set; } = new();
}