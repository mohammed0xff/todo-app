using System.ComponentModel.DataAnnotations;

namespace TodoAPI.ApiModels.Requests
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
