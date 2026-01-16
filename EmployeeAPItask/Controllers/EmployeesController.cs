using EmployeeAPI.Services;
using EmployeeAPI.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _service;
        public EmployeesController(IEmployeeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var emps = await _service.GetAllEmployees();
            return Ok(emps);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var emp = await _service.GetEmployeeById(id);
            if (emp == null) return NotFound();
            return Ok(emp);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EmployeeViewModel vm)
        {
            var emp = await _service.CreateEmployee(vm);
            return CreatedAtAction(nameof(Get), new { id = emp.EmployeeId }, emp);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EmployeeViewModel vm)
        {
            var emp = await _service.UpdateEmployee(id, vm);
            if (emp == null) return NotFound();
            return Ok(emp);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteEmployee(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
