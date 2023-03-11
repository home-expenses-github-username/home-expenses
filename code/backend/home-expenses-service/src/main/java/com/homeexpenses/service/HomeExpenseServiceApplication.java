package com.homeexpenses.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class HomeExpenseServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(HomeExpenseServiceApplication.class, args);
	}

}
