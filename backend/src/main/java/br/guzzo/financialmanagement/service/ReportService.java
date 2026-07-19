package br.guzzo.financialmanagement.service;

import br.guzzo.financialmanagement.dto.response.DashboardReportResponse;
import br.guzzo.financialmanagement.dto.response.ReportMetricItemResponse;
import br.guzzo.financialmanagement.dto.response.ReportResponse;
import br.guzzo.financialmanagement.model.Expense;
import br.guzzo.financialmanagement.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Comparator;
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
        Map<String, Double> expensesByPaymentMethod = new HashMap<>();
        
        double totalToReceive = expenses.stream()
                .filter(e -> e.getIsToReceive() != null && e.getIsToReceive())
                .mapToDouble(Expense::getValue)
                .sum();

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
            
            // Por forma de pagamento
            String paymentMethod = expense.getPaymentMethod().name();
            expensesByPaymentMethod.merge(paymentMethod, expense.getValue(), Double::sum);
        }
        
        return ReportResponse.builder()
                .year(year)
                .month(month)
                .totalExpenses(totalExpenses)
                .expensesByPerson(expensesByPerson)
                .expensesByCategory(expensesByCategory)
                .expensesByCard(expensesByCard)
                .expensesByPaymentMethod(expensesByPaymentMethod)
                .totalToReceive(totalToReceive)
                .build();
    }

    public DashboardReportResponse generateDashboardMonthlyReport(int year, int month) {
        ReportResponse report = generateMonthlyReport(year, month);

        List<ReportMetricItemResponse> topCategories = buildMetricItems(report.getExpensesByCategory(), report.getTotalExpenses(), 5, false);
        List<ReportMetricItemResponse> topPeople = buildMetricItems(report.getExpensesByPerson(), report.getTotalExpenses(), 5, false);
        List<ReportMetricItemResponse> paymentDistribution = buildMetricItems(report.getExpensesByPaymentMethod(), report.getTotalExpenses(), Integer.MAX_VALUE, true);

        int healthScore = calculateHealthScore(report);

        return DashboardReportResponse.builder()
                .year(report.getYear())
                .month(report.getMonth())
                .totalExpenses(report.getTotalExpenses())
                .expensesByPerson(report.getExpensesByPerson())
                .expensesByCategory(report.getExpensesByCategory())
                .expensesByCard(report.getExpensesByCard())
                .expensesByPaymentMethod(report.getExpensesByPaymentMethod())
                .totalToReceive(report.getTotalToReceive())
                .topCategories(topCategories)
                .topPeople(topPeople)
                .paymentDistribution(paymentDistribution)
                .alerts(buildAlerts(report, healthScore, topCategories))
                .insights(buildInsights(report, healthScore, topPeople))
                .healthScore(healthScore)
                .healthLabel(getHealthLabel(healthScore))
                .build();
    }

    private List<ReportMetricItemResponse> buildMetricItems(
            Map<String, Double> source,
            double total,
            int limit,
            boolean mapPaymentLabel
    ) {
        return source.entrySet().stream()
                .map(entry -> {
                    String name = mapPaymentLabel ? getPaymentMethodName(entry.getKey()) : entry.getKey();
                    double value = entry.getValue();
                    return ReportMetricItemResponse.builder()
                            .name(name)
                            .value(value)
                            .percentage(calculatePercentage(value, total))
                            .build();
                })
                .sorted(Comparator.comparingDouble(ReportMetricItemResponse::getValue).reversed())
                .limit(limit)
                .toList();
    }

    private List<String> buildAlerts(ReportResponse report, int healthScore, List<ReportMetricItemResponse> topCategories) {
        List<String> alerts = new ArrayList<>();

        if (report.getTotalExpenses() <= 0) {
            alerts.add("Nao existem despesas registradas no periodo selecionado.");
            return alerts;
        }

        if (report.getTotalToReceive() > report.getTotalExpenses() * 0.25) {
            alerts.add("Valor a receber acima de 25% do total gasto no mes.");
        }

        if (!topCategories.isEmpty() && topCategories.get(0).getPercentage() > 40) {
            alerts.add("Categoria " + topCategories.get(0).getName() + " representa mais de 40% das despesas.");
        }

        if (healthScore < 60) {
            alerts.add("Indice de saude financeira abaixo do ideal para o periodo.");
        }

        if (alerts.isEmpty()) {
            alerts.add("Sem alertas criticos no periodo selecionado.");
        }

        return alerts;
    }

    private List<String> buildInsights(ReportResponse report, int healthScore, List<ReportMetricItemResponse> topPeople) {
        List<String> insights = new ArrayList<>();

        if (report.getTotalExpenses() <= 0) {
            insights.add("Sem insights para o periodo.");
            return insights;
        }

        if (healthScore >= 80) {
            insights.add("Seu indice financeiro esta em excelente nivel neste mes.");
        }

        if (report.getExpensesByCategory().size() >= 4) {
            insights.add("Despesas bem distribuidas entre categorias, sem concentracao extrema.");
        }

        if (!topPeople.isEmpty() && topPeople.get(0).getPercentage() < 35) {
            insights.add("Gastos por pessoa sem concentracao elevada.");
        }

        if (insights.isEmpty()) {
            insights.add("Monitore os alertas para melhorar o equilibrio financeiro do mes.");
        }

        return insights;
    }

    private int calculateHealthScore(ReportResponse report) {
        if (report.getTotalExpenses() <= 0) {
            return 100;
        }

        double toReceiveRatio = report.getTotalToReceive() / report.getTotalExpenses();
        double diversityRatio = report.getExpensesByCategory().size() >= 4 ? 1.0 : 0.6;

        int score = (int) Math.round((1 - toReceiveRatio) * 70 + diversityRatio * 30);
        return Math.max(0, Math.min(100, score));
    }

    private String getHealthLabel(int healthScore) {
        if (healthScore >= 80) return "Excelente";
        if (healthScore >= 60) return "Boa";
        if (healthScore >= 40) return "Atencao";
        return "Critica";
    }

    private double calculatePercentage(double value, double total) {
        if (total <= 0) {
            return 0;
        }
        return Math.round((value / total) * 1000d) / 10d;
    }

    private String getPaymentMethodName(String method) {
        return switch (method) {
            case "CASH" -> "Dinheiro";
            case "CREDIT_CARD" -> "Cartao de Credito";
            case "PIX" -> "PIX";
            case "DEBIT" -> "Debito";
            default -> method;
        };
    }
}