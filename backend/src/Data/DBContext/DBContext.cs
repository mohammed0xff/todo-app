using Microsoft.EntityFrameworkCore;
using TodoAPI.Entities;

namespace TodoAPI.Data.DBContext
{
    public class AppDbContext : DbContext
    {
        public DbSet<Entities.Task> Tasks { get; set; }
        public DbSet<TaskList> TaskLists { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Entities.Task>(entity =>
            {
                entity.HasKey(t => t.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(150);
                
                entity.ToTable("Tasks");
            });

            modelBuilder.Entity<TaskList>(entity =>
            {
                entity.HasKey(t => t.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(80);

                entity.HasMany(t => t.Tasks)
                .WithOne(t => t.TaskList)
                .HasForeignKey(t => t.ListId)
                .IsRequired();

                entity.ToTable("TaskLists");
            });
        }
    }
}
