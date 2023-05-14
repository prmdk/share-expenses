package com.prmdk.shareexpenses.model;

import com.prmdk.shareexpenses.entity.Group;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinalSplitModel {
    private Long finalPayTo;
    private Long finalPayBy;
    private Float finalAmt;
    private Group finalSplitGrp;
}
