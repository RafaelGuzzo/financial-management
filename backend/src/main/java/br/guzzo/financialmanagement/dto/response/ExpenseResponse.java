package br.guzzo.financialmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseResponse {
    private Long id;
    private Double value;
    private String description;
    private LocalDate date;
    private Integer installment;
    private Integer currentInstallment;
    private Boolean isRecurring;
    private String paymentMethod;
    private Long categoryId;
    private String categoryName;
    private Long personId;
    private String personName;
    private Long cardId;
    private String cardName;
}