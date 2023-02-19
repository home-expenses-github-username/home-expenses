package com.homeexpenses.service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZonedDateTime;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api")
public class ApiController {

    private static final String template = "Hello2, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }

    @GetMapping("/expense")
    public Expense expense (){
        ZonedDateTime now = ZonedDateTime.now();
        return new Expense(now,"food", 120, "comment 1");
    }

}
