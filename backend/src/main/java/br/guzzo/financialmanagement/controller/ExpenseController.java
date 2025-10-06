package br.guzzo.financialmanagement.controller;

import br.guzzo.financialmanagement.dto.request.ExpenseRequest;
import br.guzzo.financialmanagement.dto.response.ExpenseResponse;
import br.guzzo.financialmanagement.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseResponse> createExpense(@RequestBody ExpenseRequest request) {
        return ResponseEntity.ok(expenseService.createExpense(request));
    }

    @GetMapping
    public ResponseEntity<List<ExpenseResponse>> getAllExpenses() {
        return ResponseEntity.ok(expenseService.getAllExpenses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseResponse> getExpenseById(@PathVariable Long id) {
        return ResponseEntity.ok(expenseService.getExpenseById(id));
    }

    @GetMapping("/person/{personId}")
    public ResponseEntity<List<ExpenseResponse>> getExpensesByPerson(@PathVariable Long personId) {
        return ResponseEntity.ok(expenseService.getExpensesByPerson(personId));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ExpenseResponse>> getExpensesByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(expenseService.getExpensesByCategory(categoryId));
    }

    @GetMapping("/card/{cardId}")
    public ResponseEntity<List<ExpenseResponse>> getExpensesByCard(@PathVariable Long cardId) {
        return ResponseEntity.ok(expenseService.getExpensesByCard(cardId));
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<ExpenseResponse>> getExpensesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(expenseService.getExpensesByDateRange(startDate, endDate));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponse> updateExpense(
            @PathVariable Long id,
            @RequestBody ExpenseRequest request) {
        return ResponseEntity.ok(expenseService.updateExpense(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}