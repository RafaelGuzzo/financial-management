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
public class CardResponse {
    private Long id;
    private String name;
    private int invoiceDueDate;
    private int invoiceClosingDate;
    private Long personId;
    private String personName;
}