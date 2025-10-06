package br.guzzo.financialmanagement.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cards")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int invoiceDueDate; // Data de vencimento da fatura
    private int invoiceClosingDate; // Data de fechamento da fatura

    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;

    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL)
    private List<Expense> expenses;
}