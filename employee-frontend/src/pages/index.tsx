import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
  TextField,
  Paper,
  InputAdornment,
  IconButton,
  Divider
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeDialog from "../components/EmployeeDialog";
import { Employee } from "../models/Employee";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from "../services/EmployeeService";

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();
  const [searchId, setSearchId] = useState("");

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleAdd = () => {
    setSelectedEmployee(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (emp: Employee) => {
    setSelectedEmployee(emp);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  const handleSave = async (data: Omit<Employee, "employeeId" | "createdOn">) => {
    if (selectedEmployee) {
      await updateEmployee(selectedEmployee.employeeId, data);
    } else {
      await addEmployee(data);
    }
    setDialogOpen(false);
    loadEmployees();
  };

  // 🔍 Filter by Employee ID
  const filteredEmployees = employees.filter(emp =>
    searchId === "" || emp.employeeId === Number(searchId)
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        {/* Header */}
        <Stack spacing={1} mb={3}>
          <Typography variant="h5" fontWeight={600}>
            Employee Detail Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage employee records.
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Actions */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
          mb={3}
        >
          <TextField
            label="Search by Employee ID"
            size="small"
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            sx={{ maxWidth: 260 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchId && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchId("")}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            variant="contained"
            onClick={handleAdd}
            sx={{ height: 40 }}
          >
            Add Employee
          </Button>
        </Stack>

        {/* Table */}
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>

      {/* Dialog */}
      <EmployeeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        employee={selectedEmployee}
      />
    </Container>
  );
}
