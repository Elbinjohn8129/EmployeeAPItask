import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import { useEffect, useState } from "react";
import { Employee } from "../models/Employee";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Employee, "employeeId" | "createdOn">) => void;
  employee?: Employee;
}

export default function EmployeeDialog({
  open,
  onClose,
  onSave,
  employee
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState<number>(0);

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email);
      setDepartment(employee.department);
      setSalary(employee.salary);
    } else {
      setName("");
      setEmail("");
      setDepartment("");
      setSalary(0);
    }
  }, [employee]);

  const handleSave = () => {
    onSave({ name, email, department, salary });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {employee ? "Edit Employee" : "Add Employee"}
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <TextField
          label="Department"
          fullWidth
          margin="normal"
          value={department}
          onChange={e => setDepartment(e.target.value)}
        />

        <TextField
          label="Salary"
          type="number"
          fullWidth
          margin="normal"
          value={salary}
          onChange={e => setSalary(Number(e.target.value))}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          {employee ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
