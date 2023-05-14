package com.prmdk.shareexpenses.repository;

import com.prmdk.shareexpenses.entity.Group;
import com.prmdk.shareexpenses.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group,Long> {
}
