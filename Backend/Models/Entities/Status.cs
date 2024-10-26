using System.ComponentModel.DataAnnotations;

namespace Models.Entities;

public class Status
{
    public Guid Id { get; set; }

    [StringLength(128)] public string Name { get; set; } = "";
    [StringLength(128)] public string NormalizedName { get; set; } = "";
}