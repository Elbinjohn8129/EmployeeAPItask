import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box,
  Pagination,
  Stack,
  Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Employee } from "../models/Employee";

interface Props {
  employees: Employee[];
  onEdit: (emp: Employee) => void;
  onDelete: (id: number) => void;
}

const ROWS_PER_PAGE = 5;

export default function EmployeeTable({ employees, onEdit, onDelete }: Props) {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(employees.length / ROWS_PER_PAGE);

  const paginatedEmployees = employees.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  if (employees.length === 0) {
    return (
      <Box textAlign="center" py={6}>
        <Typography variant="h6" color="text.secondary">
          No employees found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#f9fafb",
                "& th": {
                  fontWeight: 600,
                  fontSize: "0.95rem"
                }
              }}
            >
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedEmployees.map(emp => (
              <TableRow
                key={emp.employeeId}
                hover
                sx={{
                  "& td": { py: 1.8 },
                  transition: "background-color 0.2s"
                }}
              >
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>₹ {emp.salary.toLocaleString()}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => onEdit(emp)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => onDelete(emp.employeeId)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {pageCount > 1 && (
        <Stack alignItems="center" mt={4}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
            size="large"
          />
        </Stack>
      )}
    </>
  );
}
