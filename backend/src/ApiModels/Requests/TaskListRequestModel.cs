using System.ComponentModel.DataAnnotations;

namespace TodoAPI.ApiModels.Requests
{
    public class TaskListRequestModel
    {
        [Required]
        [MaxLength(80)]
        public string Title { get; set; }
    }
}
