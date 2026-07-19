package br.guzzo.financialmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Map;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ReportResponse {
    private int year;
    private int month;
    private double totalExpenses;
    private Map<String, Double> expensesByPerson;
    private Map<String, Double> expensesByCategory;
    private Map<String, Double> expensesByCard;
    private Map<String, Double> expensesByPaymentMethod;
    private double totalToReceive;
}