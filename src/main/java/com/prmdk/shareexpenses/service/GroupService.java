package com.prmdk.shareexpenses.service;


import com.prmdk.shareexpenses.entity.Expense;
import com.prmdk.shareexpenses.entity.FinalSplit;
import com.prmdk.shareexpenses.entity.Group;
import com.prmdk.shareexpenses.entity.User;
import com.prmdk.shareexpenses.model.GroupModel;

import java.util.List;

public interface GroupService {
    Group createGroup(GroupModel groupModel);

    Group getGroupById(Long groupId);

    List<User> addUser(Long grpId, List<User> user);

    List<User> getGroupUsers(Long groupId);

    List<Expense> getGroupExpenses(Long groupId);

    List<FinalSplit> getGroupFinal(Long groupId);

    String deleteGroup(Long groupId);
}
