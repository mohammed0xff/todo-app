using System;
using System.Collections.Generic;
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

            if (context.TaskLists.Any()) return;

            var list1 = new Entities.TaskList("Home") { 

                Tasks = new List<Entities.Task>() {
                    new Entities.Task("Feed the cat"),
                    new Entities.Task("Do homework"),
                    new Entities.Task("Read a book"),
                    new Entities.Task("Catch a fly"),
                    new Entities.Task("Do nothing"),
                }
            };

            var list2 = new Entities.TaskList("Work");
            var list3 = new Entities.TaskList("Plants");

            context.TaskLists.AddRange(new[] { list1, list2, list3 });
            context.SaveChanges();
        }
    }
}