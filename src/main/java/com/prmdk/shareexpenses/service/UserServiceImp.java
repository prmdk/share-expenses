package com.prmdk.shareexpenses.service;

import com.prmdk.shareexpenses.api.UserDetails;
import com.prmdk.shareexpenses.entity.Expense;
import com.prmdk.shareexpenses.entity.Group;
import com.prmdk.shareexpenses.entity.User;
import com.prmdk.shareexpenses.model.UserLogin;
import com.prmdk.shareexpenses.model.UserModel;
import com.prmdk.shareexpenses.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@Service
public class UserServiceImp implements UserService{//, UserDetailsService {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(UserModel userModel) {
        User user = new User();

        user.setUserFirstName(userModel.getUserFirstName());
        user.setUserLastName(userModel.getUserLastName());
        user.setUserName(userModel.getUserName());
        //user.setUserPassword(passwordEncoder.encode(userModel.getUserPassword()));
        user.setUserPassword(userModel.getUserPassword());
        user.setUserGroups(null);
        user.setRole("USER");
        userRepository.save(user);
        return user;
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).get();
    }

    @Override
    public List<Group> getUserGroups(Long userId) {
        return userRepository.findById(userId).get().getUserGroups();
    }

    @Override
    public List<Expense> getUserExpenses(Long userId) {
        return userRepository.findById(userId).get().getExpenses();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public String deleteUser(Long userId) {
        userRepository.deleteById(userId);
        return "user deleted";
    }

    @Override
    public User userLogin(UserLogin userLogin) {
        User user = userRepository.findByUserName(userLogin.getUsername());
        if(user ==null){
            return null;
        }
        /*
        if(passwordEncoder.matches(userLogin.getPassword(),user.getPassword())){
            return user;
        }*/
        if(userLogin.getPassword().equals(user.getPassword())){
            return user;
        }

        return null;
    }

    @Override
    public UserDetails loadUserByUserId(Long userId) {
        return userRepository.findById(userId).get();
    }

    @Override
    public User loadUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        return null;
//    }
}
