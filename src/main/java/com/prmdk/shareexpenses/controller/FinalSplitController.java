package com.prmdk.shareexpenses.controller;

import com.prmdk.shareexpenses.entity.FinalSplit;
import com.prmdk.shareexpenses.model.FinalSplitModel;
import com.prmdk.shareexpenses.service.FinalSplitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/FinalSplit")
@CrossOrigin(origins = "*")
public class FinalSplitController {
    @Autowired
    private FinalSplitService finalSplitService;

    @GetMapping("/{id}")
    public List<FinalSplitModel> getFinalSplit(@PathVariable("id") Long groupID){
        return finalSplitService.getFinalSplit(groupID);
    }


}
