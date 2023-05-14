package com.prmdk.shareexpenses.controller;

import com.prmdk.shareexpenses.entity.Expense;
import com.prmdk.shareexpenses.entity.Group;
import com.prmdk.shareexpenses.entity.User;
import com.prmdk.shareexpenses.event.RegistrationCompleteEvent;
import com.prmdk.shareexpenses.model.JWTModel;
import com.prmdk.shareexpenses.model.UserLogin;
import com.prmdk.shareexpenses.model.UserModel;
import com.prmdk.shareexpenses.service.UserService;
import com.prmdk.shareexpenses.utility.JWTUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JWTUtility jwtUtility;


    @Autowired
    private ApplicationEventPublisher publisher;

    @PostMapping("/register")
    public Map<String, Object> registerUser(@RequestBody UserModel userModel){

        User user = userService.createUser(userModel);

        publisher.publishEvent(new RegistrationCompleteEvent(
                user,
                "url"
        ));

        final String token = jwtUtility.generateToken(user);
        Map<String, Object> result = new HashMap<>();
        user.setUserPassword("$2a$11$jiZKqGsaVocUYue.ciPj8eO0r8PIlPciYJZwJkbqbZURfcIoXY4Uu");
        result.put("user-info", user);
        result.put("jwtToken", token);
        return result;
    }
    
    @PostMapping("/login")
    public Map<String, Object> userLogin(@RequestBody UserLogin userLogin) throws Exception{

        User user = userService.userLogin(userLogin);
        if(user == null){
            throw new Exception("INVALID_CREDENTIALS");
        }

        final String token = jwtUtility.generateToken(user);

        Map<String, Object> result = new HashMap<>();
        user.setUserPassword("$2a$11$jiZKqGsaVocUYue.ciPj8eO0r8PIlPciYJZwJkbqbZURfcIoXY4Uu");
        result.put("user-info", user);
        result.put("jwtToken", token);
        return result;
    }
    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Long userId){
        return userService.getUserById(userId);
    }

    @GetMapping("/all")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/groups/{id}")
    public List<Group> getUserGroups(@PathVariable("id") Long userId){
        return userService.getUserGroups(userId);
    }

    @GetMapping("/expenses/{id}")
    public List<Expense> getUserExpenses(@PathVariable("id") Long userId){
        return userService.getUserExpenses(userId);
    }
    
    

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long userId){
        return userService.deleteUser(userId);
    }
}
