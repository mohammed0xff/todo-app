using System;
using System.Text.Json.Serialization;

namespace TodoAPI.Entities
{
    public class Task
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string CreatedAt { get; set; } =
            DateTime.Now.ToString("dd/MM/yyyy hh:mm:tt"); // tt for AM/PM
        public bool IsCompleted { get; set; }
        public int ListId { get; init; }
        
        [JsonIgnore]
        public TaskList TaskList { get; set; } = null!;

        public Task(string description)
        {
            Description = description;
        }
    }
}
