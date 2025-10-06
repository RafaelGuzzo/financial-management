package br.guzzo.financialmanagement.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseRequest {
    private Double value;
    private String description;
    private LocalDate date;
    private Integer installment;
    private Boolean isRecurring;
    private String paymentMethod;
    private Long categoryId;
    private Long personId;
    private Long cardId; // Pode ser null para pagamentos não via cartão
}