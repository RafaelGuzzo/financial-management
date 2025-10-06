package br.guzzo.financialmanagement.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Double value;
    private String description;
    private LocalDate date;
    private Integer installment; // Número de parcelas
    private Integer currentInstallment; // Parcela atual
    private Boolean isRecurring; // Se é uma despesa recorrente
    
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    
    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;
    
    @ManyToOne
    @JoinColumn(name = "card_id")
    private Card card;
    
    public enum PaymentMethod {
        CASH, CREDIT_CARD, PIX, DEBIT
    }
}