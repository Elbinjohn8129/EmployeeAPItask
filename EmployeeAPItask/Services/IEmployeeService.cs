using EmployeeAPI.ViewModels;
using EmployeeAPItask.Models;

namespace EmployeeAPI.Services
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetAllEmployees();
        Task<Employee> GetEmployeeById(int id);
        Task<Employee> CreateEmployee(EmployeeViewModel vm);
        Task<Employee> UpdateEmployee(int id, EmployeeViewModel vm);
        Task<bool> DeleteEmployee(int id);
    }
}
