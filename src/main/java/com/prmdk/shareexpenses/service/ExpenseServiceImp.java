package com.prmdk.shareexpenses.service;

import com.prmdk.shareexpenses.entity.Expense;
import com.prmdk.shareexpenses.model.ExpenseModel;
import com.prmdk.shareexpenses.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseServiceImp implements ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Override
    public Expense createExpense(ExpenseModel expenseModel) {
        Expense expense = new Expense();
        expense.setExpName(expenseModel.getExpName());
        expense.setExpAmt(expenseModel.getExpAmt());
        expense.setUsrSplitBtw(expenseModel.getUsrSplitBtw());
        expense.setExpPaidBy(expenseModel.getExpPaidBy());
        expense.setExpGrp(expenseModel.getExpGrp());
        expenseRepository.save(expense);
        return expense;
    }

    @Override
    public List<Expense> getGrpExpenses(Long groupId) {
        return null;
    }

    @Override
    public String resolveExpense(Long expId) {
        expenseRepository.deleteById(expId);
        return "expense resolved";
    }
}
