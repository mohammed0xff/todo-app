using System;
using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Entities
{
    public class Task
    {
        public int Id { get; }
        private static int Next_Id = 0;
        
        [Required]
        [StringLength(100)]
        public string Description { get; set; }
        public string CreatedAt { get; } = DateTime.Now.ToString("dd/mm/yyyy hh:mm:tt"); // tt for AM/PM
        public bool IsCompleted { get; set; }
        
        public Task(string description)
        {
            Id = Next_Id++;
            Description = description;
        }
    }
}
