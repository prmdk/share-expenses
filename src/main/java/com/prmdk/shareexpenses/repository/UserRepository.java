package com.prmdk.shareexpenses.repository;

import com.prmdk.shareexpenses.entity.User;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    User findByUserName(String userName);
}
