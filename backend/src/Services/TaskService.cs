using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using TodoAPI.Data.DBContext;
using Task = TodoAPI.Entities.Task;

namespace TodoAPI.Services
{
    public class TaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public Task CreateTask(string description)
        {
            var task = new Task(description);
            _context.Tasks.Add(task);
            _context.SaveChanges();
            
            return task;
        }

        public Task? GetTaskById(int id)
        {
            return _context.Tasks.FirstOrDefault(t => t.Id == id);
        }

        public List<Task> GetAllTasks()
        {
            return _context.Tasks.ToList();
        }

        public void UpdateTask(Task task)
        {
            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteTask(Task task)
        {
            _context.Tasks.Remove(task);
            _context.SaveChanges();
        }
    }
}
