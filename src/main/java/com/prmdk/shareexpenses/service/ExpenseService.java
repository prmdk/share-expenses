package com.prmdk.shareexpenses.service;

import com.prmdk.shareexpenses.entity.Expense;
import com.prmdk.shareexpenses.model.ExpenseModel;

import java.util.List;


public interface ExpenseService {
    Expense createExpense(ExpenseModel expenseModel);

    List<Expense> getGrpExpenses(Long groupId);

    String resolveExpense(Long expId);
}
