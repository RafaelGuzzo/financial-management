package br.guzzo.financialmanagement.controller;

import br.guzzo.financialmanagement.dto.request.CardRequest;
import br.guzzo.financialmanagement.dto.response.CardResponse;
import br.guzzo.financialmanagement.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {
    private final CardService cardService;

    @PostMapping
    public ResponseEntity<CardResponse> createCard(@RequestBody CardRequest request) {
        return ResponseEntity.ok(cardService.createCard(request));
    }

    @GetMapping
    public ResponseEntity<List<CardResponse>> getAllCards() {
        return ResponseEntity.ok(cardService.getAllCards());
    }

    @GetMapping("/person/{personId}")
    public ResponseEntity<List<CardResponse>> getCardsByPerson(@PathVariable Long personId) {
        return ResponseEntity.ok(cardService.getCardsByPerson(personId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CardResponse> getCardById(@PathVariable Long id) {
        return ResponseEntity.ok(cardService.getCardById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CardResponse> updateCard(
            @PathVariable Long id,
            @RequestBody CardRequest request) {
        return ResponseEntity.ok(cardService.updateCard(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        cardService.deleteCard(id);
        return ResponseEntity.noContent().build();
    }
}