using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Models
{
    public class TaskRequestModel
    {
        [Required]
        public string Description { get; set; }
    }
}
