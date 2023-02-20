package com.homeexpenses.service;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

//@CrossOrigin("http://localhost:4200")
//@CrossOrigin(origins = {"http://localhost:4200", "https://yellow-bush-03266d003.2.azurestaticapps.net"})
public interface ExpenseRepository extends PagingAndSortingRepository<Expense, Long>, CrudRepository<Expense, Long> {
}
