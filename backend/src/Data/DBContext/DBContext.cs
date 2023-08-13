using Microsoft.EntityFrameworkCore;

namespace TodoAPI.Data.DBContext
{
    public class AppDbContext : DbContext
    {
        public DbSet<Entities.Task> Tasks { get; set; }
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
        }
    }
}
