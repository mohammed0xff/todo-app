using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TodoAPI.Services;

namespace TodoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;
        public TasksController(
            TaskService taskService
            )
        {
            _taskService = taskService;
        }

        [HttpGet]
        public IEnumerable<Entities.Task> Get()
        {
            return _taskService.GetAllTasks();
        }

        [HttpPut("toggle-completed/{id}")]
        public IActionResult Put(int id)
        {
            var task = _taskService.GetTaskById(id);
            
            if(task == null) {
                return NotFound();
            }

            task.IsCompleted = !task.IsCompleted;
            _taskService.UpdateTask(task);

            return Ok();
        }
    }
}
