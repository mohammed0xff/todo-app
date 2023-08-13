using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using TodoAPI.Data.DBContext;

namespace TodoAPI.Data.DBInitializer
{
    public static class DBInitializer
    {
        public static async Task InitDataAsync(this IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                await SeedDataAsync(serviceScope);
            }
        }

        public static async Task SeedDataAsync(IServiceScope serviceScope)
        {
            var context = serviceScope.ServiceProvider.GetService<AppDbContext>();

            if (context == null) { throw new ArgumentNullException(nameof(context)); }

            context.Database.EnsureCreated();

            if (context.Tasks.Any()) return;
            
            context.Tasks.Add(new Entities.Task("Feed the cat"));
            context.Tasks.Add(new Entities.Task("Do homework"));
            context.Tasks.Add(new Entities.Task("Read a book"));
            context.Tasks.Add(new Entities.Task("Catch a fly"));
            context.Tasks.Add(new Entities.Task("Do nothing"));

            context.SaveChanges();
        }
    }
}