package br.guzzo.financialmanagement.service;

import br.guzzo.financialmanagement.dto.request.CardRequest;
import br.guzzo.financialmanagement.dto.response.CardResponse;
import br.guzzo.financialmanagement.model.Card;
import br.guzzo.financialmanagement.model.Person;
import br.guzzo.financialmanagement.repository.CardRepository;
import br.guzzo.financialmanagement.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardService {
    private final CardRepository cardRepository;
    private final PersonRepository personRepository;

    public CardResponse createCard(CardRequest request) {
        Person person = personRepository.findById(request.getPersonId())
                .orElseThrow(() -> new RuntimeException("Person not found"));
        
        Card card = new Card();
        card.setName(request.getName());
        card.setInvoiceDueDate(request.getInvoiceDueDate());
        card.setInvoiceClosingDate(request.getInvoiceClosingDate());
        card.setPerson(person);
        
        Card savedCard = cardRepository.save(card);
        return mapToResponse(savedCard);
    }

    public List<CardResponse> getAllCards() {
        return cardRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<CardResponse> getCardsByPerson(Long personId) {
        return cardRepository.findByPersonId(personId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public CardResponse getCardById(Long id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found"));
        return mapToResponse(card);
    }

    public CardResponse updateCard(Long id, CardRequest request) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found"));
        
        Person person = personRepository.findById(request.getPersonId())
                .orElseThrow(() -> new RuntimeException("Person not found"));
        
        card.setName(request.getName());
        card.setInvoiceDueDate(request.getInvoiceDueDate());
        card.setInvoiceClosingDate(request.getInvoiceClosingDate());
        card.setPerson(person);
        
        Card updatedCard = cardRepository.save(card);
        return mapToResponse(updatedCard);
    }

    public void deleteCard(Long id) {
        cardRepository.deleteById(id);
    }

    private CardResponse mapToResponse(Card card) {
        return CardResponse.builder()
                .id(card.getId())
                .name(card.getName())
                .invoiceDueDate(card.getInvoiceDueDate())
                .invoiceClosingDate(card.getInvoiceClosingDate())
                .personId(card.getPerson().getId())
                .personName(card.getPerson().getName())
                .build();
    }
}