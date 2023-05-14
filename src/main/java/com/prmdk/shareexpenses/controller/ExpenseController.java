package com.prmdk.shareexpenses.controller;

import com.prmdk.shareexpenses.entity.Expense;
import com.prmdk.shareexpenses.model.ExpenseModel;
import com.prmdk.shareexpenses.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expense")
@CrossOrigin(origins = "*")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping("/create")
    public Expense createExpense(@RequestBody ExpenseModel expenseModel){

        return expenseService.createExpense(expenseModel);
    }
    @GetMapping("/group/{id}")
    public List<Expense> getGrpExpenses(@PathVariable("id") Long groupId){
        return expenseService.getGrpExpenses(groupId);
    }
    @GetMapping("/resolve/{id}")
    public String resolveExpense(@PathVariable("id") Long expId){
        return expenseService.resolveExpense(expId);
    }
}
