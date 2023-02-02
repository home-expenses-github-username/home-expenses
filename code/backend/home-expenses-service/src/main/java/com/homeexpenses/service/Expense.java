package com.homeexpenses.service;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Expense {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private ZonedDateTime date;
    private String category;
    private int cost;
    private String comment;

    public Expense(ZonedDateTime date, String category, int cost, String comment) {
        this.date = date;
        this.category = category;
        this.cost = cost;
        this.comment = comment;
    }
}
