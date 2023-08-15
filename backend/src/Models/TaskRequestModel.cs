using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Models
{
    public class TaskRequestModel
    {
        [Required]
        public int ListId { get; set; }
        
        [Required]
        [MaxLength(150)]
        public string Description { get; set; }
    }
}
