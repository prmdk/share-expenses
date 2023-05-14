package com.prmdk.shareexpenses.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyWebMvcConfig {
    @Bean
    public WebMvcConfigurer forwardToIndex() {
        return new WebMvcConfigurer() {
            @Override
            public void addViewControllers(ViewControllerRegistry registry) {
                // forward requests to /admin and /user to their index.html
                registry.addViewController("/dashboard").setViewName(
                        "forward:/index.html");
                registry.addViewController("/login").setViewName(
                        "forward:/index.html");
                registry.addViewController("/register").setViewName(
                        "forward:/index.html");
            }
        };
    }
}
