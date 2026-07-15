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
public class CardRequest {
    private String name;
    private int invoiceDueDate;  // Data de vencimento da fatura
    private int invoiceClosingDate; // Data de fechamento da fatura
    private Long personId;  // ID da pessoa vinculada ao cartão //TODO trocar por uuid
}