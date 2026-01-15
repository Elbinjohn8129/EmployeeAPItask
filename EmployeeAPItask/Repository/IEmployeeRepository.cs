
using EmployeeAPI.ViewModels;
using EmployeeAPItask.Models;

namespace EmployeeAPI.Repository
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAll();
        Task<Employee> GetById(int id);
        Task<Employee> Add(EmployeeViewModel dto);
        Task<Employee> Update(int id, EmployeeViewModel dto);
        Task<bool> Delete(int id);
    }
}
