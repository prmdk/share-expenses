package com.prmdk.shareexpenses.service;

import com.prmdk.shareexpenses.entity.FinalSplit;
import com.prmdk.shareexpenses.model.FinalSplitModel;

import java.util.List;

public interface FinalSplitService {
    List<FinalSplitModel> getFinalSplit(Long groupId);
}
