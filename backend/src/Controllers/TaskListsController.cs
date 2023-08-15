using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TodoAPI.Entities;
using TodoAPI.Models;
using TodoAPI.Services;

namespace TodoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskListsController : ControllerBase
    {
        private readonly TaskListsService _listService;
        public TaskListsController(
            TaskListsService taskService
            )   
        {
            _listService = taskService;
        }

        [HttpGet]
        public IEnumerable<TaskList> Get()
        {
            return _listService.GetAllLists();
        }

        [HttpGet("{id}/tasks")]
        public IEnumerable<Entities.Task> Get(int id)
        {
            return _listService.GetTasks(listId: id);
        }

        [HttpPost]
        public ActionResult<TaskList> Add( 
            [FromBody] TaskListRequestModel listModel 
            )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = _listService.CreateList(listModel.Title);
            
            return CreatedAtAction(nameof(Add), task);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var list = _listService.GetListById(id);

            if (list == null)
            {
                return NotFound();
            }

            _listService.DeleteList(list);

            return Ok();
        }
    }
}
