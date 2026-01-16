import axios from "axios";
import { Employee } from "../models/Employee";

const API_URL = "https://localhost:7205/api/Employees"; // backend URL

export const getEmployees = async (): Promise<Employee[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addEmployee = async (
  employee: Omit<Employee, "employeeId" | "createdOn">
) => {
  return await axios.post(API_URL, employee);
};

export const updateEmployee = async (
  id: number,
  employee: Omit<Employee, "employeeId" | "createdOn">
) => {
  return await axios.put(`${API_URL}/${id}`, employee);
};

export const deleteEmployee = async (id: number) => {
  return await axios.delete(`${API_URL}/${id}`);
};
