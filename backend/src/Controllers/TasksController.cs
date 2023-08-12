using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace TodoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly Dictionary<int, Entities.Task> _taskDict;
        public TasksController(
            Dictionary<int, Entities.Task> TaskDict
            )
        {
            _taskDict = TaskDict;
        }

        // GET: api/<TasksController>
        [HttpGet]
        public IEnumerable<Entities.Task> Get()
        {
            return _taskDict.Values;
        }

        // PUT api/<TasksController>/5
        [HttpPut("toggle-completed/{id}")]
        public IActionResult Put(int id)
        {
            if (!_taskDict.ContainsKey(id))
            {
                return NotFound();
            }

            var task = _taskDict[id];
            task.IsCompleted = !task.IsCompleted;

            return Ok();
        }
    }
}
