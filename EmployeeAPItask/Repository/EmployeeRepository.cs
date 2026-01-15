using EmployeeAPI.ViewModels;
using EmployeeAPItask.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {

        private readonly EmployeeApiContext _context;

        public EmployeeRepository(EmployeeApiContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> GetAll()
        {
            return await _context.Employees.OrderByDescending(e => e.CreatedOn).ToListAsync();
        }

        public async Task<Employee> GetById(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        public async Task<Employee> Add(EmployeeViewModel vm)
        {
            var emp = new Employee
            {
                Name = vm.Name,
                Email = vm.Email,
                Department = vm.Department,
                Salary = vm.Salary,
                CreatedOn = DateTime.Now
            };

            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();
            return emp;
        }

        public async Task<Employee> Update(int id, EmployeeViewModel vm)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp == null) return null;

            emp.Name = vm.Name;
            emp.Email = vm.Email;
            emp.Department = vm.Department;
            emp.Salary = vm.Salary;

            await _context.SaveChangesAsync();
            return emp;
        }

        public async Task<bool> Delete(int id)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp == null) return false;

            _context.Employees.Remove(emp);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
