package br.guzzo.financialmanagement.service;

import br.guzzo.financialmanagement.dto.request.ExpenseRequest;
import br.guzzo.financialmanagement.dto.response.ExpenseResponse;
import br.guzzo.financialmanagement.exception.ResourceNotFoundException;
import br.guzzo.financialmanagement.model.Card;
import br.guzzo.financialmanagement.model.Category;
import br.guzzo.financialmanagement.model.Expense;
import br.guzzo.financialmanagement.model.Person;
import br.guzzo.financialmanagement.repository.CardRepository;
import br.guzzo.financialmanagement.repository.CategoryRepository;
import br.guzzo.financialmanagement.repository.ExpenseRepository;
import br.guzzo.financialmanagement.repository.PersonRepository;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final PersonRepository personRepository;
    private final CategoryRepository categoryRepository;
    private final CardRepository cardRepository;

    @Transactional
    public ExpenseResponse createExpense(ExpenseRequest request) {
        validateExpenseRequest(request);

        Expense expense = buildExpenseFromRequest(request);
        Expense savedExpense = expenseRepository.save(expense);

        if (request.getInstallment() != null && request.getInstallment() > 1) {
            createInstallments(savedExpense);
        }

        return mapToResponse(savedExpense);
    }

    private void validateExpenseRequest(ExpenseRequest request) {
        if (request.getValue() == null || request.getValue() <= 0) {
            throw new ValidationException("Valor da despesa deve ser positivo");
        }

        if (request.getDate() == null) {
            throw new ValidationException("Data da despesa é obrigatória");
        }

        if (request.getPersonId() == null) {
            throw new ValidationException("Pessoa associada é obrigatória");
        }

        if (request.getCategoryId() == null) {
            throw new ValidationException("Categoria é obrigatória");
        }

        try {
            Expense.PaymentMethod.valueOf(request.getPaymentMethod());
        } catch (IllegalArgumentException e) {
            throw new ValidationException("Método de pagamento inválido");
        }
    }

    private Expense buildExpenseFromRequest(ExpenseRequest request) {
        Person person = personRepository.findById(request.getPersonId())
                .orElseThrow(() -> new ResourceNotFoundException("Pessoa não encontrada"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada"));

        Card card = request.getCardId() != null ?
                cardRepository.findById(request.getCardId())
                        .orElseThrow(() -> new ResourceNotFoundException("Cartão não encontrado")) :
                null;

        return Expense.builder()
                .value(request.getValue())
                .description(request.getDescription())
                .date(request.getDate())
                .installment(request.getInstallment())
                .currentInstallment(1)
                .isRecurring(request.getIsRecurring())
                .paymentMethod(Expense.PaymentMethod.valueOf(request.getPaymentMethod()))
                .category(category)
                .person(person)
                .card(card)
                .build();
    }

    private void createInstallments(Expense expense) {
        for (int i = 2; i <= expense.getInstallment(); i++) {
            Expense installment = new Expense();
            installment.setValue(expense.getValue());
            installment.setDescription(expense.getDescription() + " (Parcela " + i + "/" + expense.getInstallment() + ")");
            installment.setDate(expense.getDate().plusMonths(i - 1));
            installment.setInstallment(expense.getInstallment());
            installment.setCurrentInstallment(i);
            installment.setIsRecurring(false);
            installment.setPaymentMethod(expense.getPaymentMethod());
            installment.setCategory(expense.getCategory());
            installment.setPerson(expense.getPerson());
            installment.setCard(expense.getCard());

            expenseRepository.save(installment);
        }
    }

    public List<ExpenseResponse> getAllExpenses() {
        return expenseRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ExpenseResponse getExpenseById(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
        return mapToResponse(expense);
    }

    public ExpenseResponse updateExpense(Long id, ExpenseRequest request) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        Person person = personRepository.findById(request.getPersonId())
                .orElseThrow(() -> new RuntimeException("Person not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Card card = null;
        if (request.getCardId() != null) {
            card = cardRepository.findById(request.getCardId())
                    .orElseThrow(() -> new RuntimeException("Card not found"));
        }

        expense.setValue(request.getValue());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        expense.setInstallment(request.getInstallment());
        expense.setIsRecurring(request.getIsRecurring());
        expense.setPaymentMethod(Expense.PaymentMethod.valueOf(request.getPaymentMethod()));
        expense.setCategory(category);
        expense.setPerson(person);
        expense.setCard(card);

        Expense updatedExpense = expenseRepository.save(expense);
        return mapToResponse(updatedExpense);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    public List<ExpenseResponse> getExpensesByPerson(Long personId) {
        return expenseRepository.findByPersonId(personId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ExpenseResponse> getExpensesByCategory(Long categoryId) {
        return expenseRepository.findByCategoryId(categoryId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ExpenseResponse> getExpensesByCard(Long cardId) {
        return expenseRepository.findByCardId(cardId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ExpenseResponse> getExpensesByDateRange(LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findByDateBetween(startDate, endDate).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ExpenseResponse mapToResponse(Expense expense) {
        return ExpenseResponse.builder()
                .id(expense.getId())
                .value(expense.getValue())
                .description(expense.getDescription())
                .date(expense.getDate())
                .installment(expense.getInstallment())
                .currentInstallment(expense.getCurrentInstallment())
                .isRecurring(expense.getIsRecurring())
                .paymentMethod(expense.getPaymentMethod().name())
                .categoryId(expense.getCategory().getId())
                .categoryName(expense.getCategory().getName())
                .personId(expense.getPerson().getId())
                .personName(expense.getPerson().getName())
                .cardId(expense.getCard() != null ? expense.getCard().getId() : null)
                .cardName(expense.getCard() != null ? expense.getCard().getName() : null)
                .build();
    }
}