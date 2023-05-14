package com.prmdk.shareexpenses.controller;

import com.prmdk.shareexpenses.entity.Expense;
import com.prmdk.shareexpenses.entity.FinalSplit;
import com.prmdk.shareexpenses.entity.Group;
import com.prmdk.shareexpenses.entity.User;
import com.prmdk.shareexpenses.model.GroupModel;
import com.prmdk.shareexpenses.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "*")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @PostMapping("/create")
    public Group createGroup(@RequestBody GroupModel groupModel){

        return groupService.createGroup(groupModel);
    }

    @PostMapping("/adduser/{id}")
    public List<User> addUser(@PathVariable("id") Long GrpId, @RequestBody List<User> user){
        return groupService.addUser(GrpId, user);
    }


    @GetMapping("/{id}")
    public Group getGroupById(@PathVariable("id") Long GroupId ){
        return groupService.getGroupById(GroupId);
    }

    @GetMapping("/users/{id}")
    public List<User> getGroupUsers(@PathVariable("id") Long GroupId){
        return groupService.getGroupUsers(GroupId);
    }

    @GetMapping("/expenses/{id}")
    public List<Expense> getGroupExpenses(@PathVariable("id") Long groupId){
        return groupService.getGroupExpenses(groupId);
    }

    @GetMapping("/finalsplit/{id}")
    public List<FinalSplit> getGroupFinal(@PathVariable("id") Long groupId){
        return groupService.getGroupFinal(groupId);
    }

    @DeleteMapping("/{id}")
    public String deleteGroup(@PathVariable("id") Long groupId){
        return groupService.deleteGroup(groupId);
    }
}
