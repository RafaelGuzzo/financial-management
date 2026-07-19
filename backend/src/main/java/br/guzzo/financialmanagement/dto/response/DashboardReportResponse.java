package br.guzzo.financialmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class DashboardReportResponse extends ReportResponse {
    private List<ReportMetricItemResponse> topCategories;
    private List<ReportMetricItemResponse> topPeople;
    private List<ReportMetricItemResponse> paymentDistribution;
    private List<String> alerts;
    private List<String> insights;
    private int healthScore;
    private String healthLabel;
}
