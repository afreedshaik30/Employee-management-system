package com.employee_management_system_backend.service;

import com.employee_management_system_backend.entity.EmployeeEntity;
import com.employee_management_system_backend.model.Employee;
import com.employee_management_system_backend.repository.EmployeeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee createEmployee(Employee employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employee, employeeEntity);
        employeeRepository.save(employeeEntity);
        return employee; // Optionally return a copy of the saved employee
    }

    @Override
    public List<Employee> getAllEmployees() {
        List<EmployeeEntity> employeeEntities = employeeRepository.findAll();
        return employeeEntities.stream()
                .map(emp -> new Employee(
                        emp.getId(),
                        emp.getFirstName(),
                        emp.getLastName(),
                        emp.getEmailId()))
                .collect(Collectors.toList());
    }

    @Override
    public boolean deleteEmployee(Long id) {
        Optional<EmployeeEntity> optionalEmployee = employeeRepository.findById(id);
        if (optionalEmployee.isPresent()) {
            employeeRepository.delete(optionalEmployee.get());
            return true;
        }
        return false; // Return false if employee not found
    }

    @Override
    public Employee getEmployeeById(Long id) {
        Optional<EmployeeEntity> optionalEmployee = employeeRepository.findById(id);
        if (optionalEmployee.isPresent()) {
            Employee employee = new Employee();
            BeanUtils.copyProperties(optionalEmployee.get(), employee);
            return employee;
        }
        return null; // Or throw an exception if not found
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        Optional<EmployeeEntity> optionalEmployee = employeeRepository.findById(id);
        if (optionalEmployee.isPresent()) {
            EmployeeEntity employeeEntity = optionalEmployee.get();
            employeeEntity.setEmailId(employee.getEmailId());
            employeeEntity.setFirstName(employee.getFirstName());
            employeeEntity.setLastName(employee.getLastName());

            employeeRepository.save(employeeEntity);
            return employee; // Optionally return the updated employee
        }
        return null; // Or throw an exception if not found
    }
}