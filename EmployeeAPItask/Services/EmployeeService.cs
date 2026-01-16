using EmployeeAPI.Repository;
using EmployeeAPI.ViewModels;
using EmployeeAPItask.Models;

namespace EmployeeAPI.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repo;

        public EmployeeService(IEmployeeRepository repo)
        {
            _repo = repo;
        }

        public Task<List<Employee>> GetAllEmployees()
        {
            return _repo.GetAll();
        }

        public Task<Employee> GetEmployeeById(int id)
        {
            return _repo.GetById(id);
        }

        public Task<Employee> CreateEmployee(EmployeeViewModel vm)
        {
            return _repo.Add(vm);
        }

        public Task<Employee> UpdateEmployee(int id, EmployeeViewModel vm)
        {
            return _repo.Update(id, vm);
        }

        public Task<bool> DeleteEmployee(int id)
        {
            return _repo.Delete(id);
        }
    }
}
