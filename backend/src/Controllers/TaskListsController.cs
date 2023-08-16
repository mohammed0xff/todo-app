using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TodoAPI.ApiModels.Requests;
using TodoAPI.ApiModels.Response;
using TodoAPI.Entities;
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
        public PaginatedResponse<TaskList> Get(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 5
            )
        {
            var lists = _listService.GetPaginatedLists(pageNumber, pageSize);
            int total = _listService.NoOfTotalRecords();
            
            var res = new PaginatedResponse<TaskList>() {
                Data = lists,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalRecords = total
            };

            return res;
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
