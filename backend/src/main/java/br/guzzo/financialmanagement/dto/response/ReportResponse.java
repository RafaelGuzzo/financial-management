package br.guzzo.financialmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReportResponse {
    private int year;
    private int month;
    private double totalExpenses;
    private Map<String, Double> expensesByPerson;
    private Map<String, Double> expensesByCategory;
    private Map<String, Double> expensesByCard;
}