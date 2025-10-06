package br.guzzo.financialmanagement.service;

import br.guzzo.financialmanagement.dto.response.ReportResponse;
import br.guzzo.financialmanagement.model.Expense;
import br.guzzo.financialmanagement.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ExpenseRepository expenseRepository;

    public ReportResponse generateMonthlyReport(int year, int month) {
        LocalDate startDate = YearMonth.of(year, month).atDay(1);
        LocalDate endDate = YearMonth.of(year, month).atEndOfMonth();
        
        List<Expense> expenses = expenseRepository.findByDateBetween(startDate, endDate);
        
        double totalExpenses = expenses.stream()
                .mapToDouble(Expense::getValue)
                .sum();
        
        Map<String, Double> expensesByPerson = new HashMap<>();
        Map<String, Double> expensesByCategory = new HashMap<>();
        Map<String, Double> expensesByCard = new HashMap<>();
        
        for (Expense expense : expenses) {
            // Por pessoa
            String personName = expense.getPerson().getName();
            expensesByPerson.merge(personName, expense.getValue(), Double::sum);
            
            // Por categoria
            String categoryName = expense.getCategory().getName();
            expensesByCategory.merge(categoryName, expense.getValue(), Double::sum);
            
            // Por cartão (se aplicável)
            if (expense.getCard() != null) {
                String cardName = expense.getCard().getName();
                expensesByCard.merge(cardName, expense.getValue(), Double::sum);
            }
        }
        
        return ReportResponse.builder()
                .year(year)
                .month(month)
                .totalExpenses(totalExpenses)
                .expensesByPerson(expensesByPerson)
                .expensesByCategory(expensesByCategory)
                .expensesByCard(expensesByCard)
                .build();
    }
}