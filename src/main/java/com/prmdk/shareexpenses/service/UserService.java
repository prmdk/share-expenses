package com.prmdk.shareexpenses.service;

import com.prmdk.shareexpenses.api.UserDetails;
import com.prmdk.shareexpenses.entity.Expense;
import com.prmdk.shareexpenses.entity.Group;
import com.prmdk.shareexpenses.entity.User;
import com.prmdk.shareexpenses.model.UserLogin;
import com.prmdk.shareexpenses.model.UserModel;
//import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;


public interface UserService {
    User createUser(UserModel userModel);

    User getUserById(Long userId);

    List<Group> getUserGroups(Long userId);

    List<Expense> getUserExpenses(Long userId);

    List<User> getAllUsers();

    String deleteUser(Long userId);

    User userLogin(UserLogin userLogin);

    UserDetails loadUserByUserId(Long userId);

    User loadUserByUserName(String userName);
}
