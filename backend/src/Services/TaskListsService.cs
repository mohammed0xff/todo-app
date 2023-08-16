using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using TodoAPI.Data.DBContext;
using TodoAPI.Entities;

namespace TodoAPI.Services
{
    public class TaskListsService
    {
        private readonly AppDbContext _context;

        public TaskListsService(AppDbContext context)
        {
            _context = context;
        }

        public TaskList CreateList(string title)
        {
            var list = new TaskList(title);
            _context.TaskLists.Add(list);
            _context.SaveChanges();
            
            return list;
        }
        public List<Task> GetTasks(int listId)
        {
            return _context.Tasks
                .Where(t => t.ListId == listId)
                .ToList();
        }

        public TaskList? GetListById(int id)
        {
            return _context.TaskLists.FirstOrDefault(t => t.Id == id);
        }

        public List<TaskList> GetPaginatedLists(int pageNumber, int pageSize)
        {
            if (pageNumber < 1 || pageSize < 1)
                return new ();
            
            return _context.TaskLists
                .Skip(pageSize * (pageNumber - 1))
                .Take(pageSize)
                .ToList();
        }

        public int NoOfTotalRecords()
        {
            return _context.TaskLists.Count();
        }

        public void UpdateList(TaskList task)
        {
            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteList(TaskList task)
        {
            _context.TaskLists.Remove(task);
            _context.SaveChanges();
        }
    }
}
