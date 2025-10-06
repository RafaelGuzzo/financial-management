package br.guzzo.financialmanagement.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "persons")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<Card> cards;
    
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<Expense> expenses;
}