package br.guzzo.financialmanagement.repository;

import br.guzzo.financialmanagement.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByPersonId(Long personId);
    List<Expense> findByCategoryId(Long categoryId);
    List<Expense> findByCardId(Long cardId);
    
    @Query("SELECT e FROM Expense e WHERE e.date BETWEEN :startDate AND :endDate")
    List<Expense> findByDateBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    List<Expense> findByIsRecurringTrue();
}