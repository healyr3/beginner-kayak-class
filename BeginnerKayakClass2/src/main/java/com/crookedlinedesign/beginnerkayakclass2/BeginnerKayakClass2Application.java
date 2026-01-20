package com.crookedlinedesign.beginnerkayakclass2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class BeginnerKayakClass2Application {

//    @RequestMapping("/")
//    public String welcome() {
//        return "Welcome to the Beginner Kayaking Course!";
//    }

    public static void main(String[] args) {
        SpringApplication.run(BeginnerKayakClass2Application.class, args);
    }

}
