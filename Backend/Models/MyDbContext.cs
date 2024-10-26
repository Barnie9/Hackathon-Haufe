using Microsoft.EntityFrameworkCore;
using Models.Entities;

namespace Models;

public class MyDbContext : DbContext
{
    public MyDbContext()
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=hackathon;Username=postgres;Password=postgres");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany<Event>(u => u.CreatedEvents)
            .WithOne(e => e.Organizer)
            .HasForeignKey(e => e.OrganizerId);

        modelBuilder.Entity<User>()
            .HasMany<Event>(u => u.JoinedEvents)
            .WithMany(e => e.Participants);

        modelBuilder.Entity<EventTask>()
            .HasMany<User>(et => et.Assignees)
            .WithMany(u => u.EventTasks);
    }

    public DbSet<Role> Roles { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Status> Statuses { get; set; }
    public DbSet<EventTask> EventTasks { get; set; }
    public DbSet<Event> Events { get; set; }
}