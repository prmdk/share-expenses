package com.prmdk.shareexpenses;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;



@SpringBootApplication
@ComponentScan("com.prmdk.shareexpenses.repository")
@ComponentScan("com.prmdk.shareexpenses.entity")
@ComponentScan("com.prmdk.shareexpenses.model")
@ComponentScan("com.prmdk.shareexpenses.controller")
@ComponentScan("com.prmdk.shareexpenses.service")
@ComponentScan("com.prmdk.shareexpenses.config")
@ComponentScan("com.prmdk.shareexpenses.event")
public class ShareExpensesApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShareExpensesApplication.class, args);
	}
/*
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(11);
	}


 */
}