package com.homeexpenses.service;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface ExpenseRepository extends PagingAndSortingRepository<Expense, Long>, CrudRepository<Expense, Long> {
}
