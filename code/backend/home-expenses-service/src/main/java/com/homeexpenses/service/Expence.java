package com.homeexpenses.service;

import java.time.ZonedDateTime;

public record Expence(ZonedDateTime date, String category, int cost, String comment) {
}
