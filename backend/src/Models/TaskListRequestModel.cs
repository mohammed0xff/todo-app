using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Models
{
    public class TaskListRequestModel
    {
        [Required]
        [MaxLength(80)]
        public string Title { get; set; }
    }
}
