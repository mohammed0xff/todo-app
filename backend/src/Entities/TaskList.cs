using System.Collections;
using System.Collections.Generic;

namespace TodoAPI.Entities
{
    public class TaskList
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<Task> Tasks { get; set;}
        public TaskList(string title)
        {
            Title = title;
        }
    }
}
