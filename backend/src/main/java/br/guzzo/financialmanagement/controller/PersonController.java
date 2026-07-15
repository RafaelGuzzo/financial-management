package br.guzzo.financialmanagement.controller;

import br.guzzo.financialmanagement.dto.request.PersonRequest;
import br.guzzo.financialmanagement.dto.response.PersonResponse;
import br.guzzo.financialmanagement.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/persons")
@RequiredArgsConstructor
public class PersonController {
    private final PersonService personService;

    @PostMapping
    public ResponseEntity<PersonResponse> createPerson(@RequestBody PersonRequest request) {
        return ResponseEntity.ok(personService.createPerson(request));
    }

    @GetMapping
    public ResponseEntity<List<PersonResponse>> getAllPersons() {
        return ResponseEntity.ok(personService.getAllPersons());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonResponse> getPersonById(@PathVariable Long id) {
        return ResponseEntity.ok(personService.getPersonById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonResponse> updatePerson(
            @PathVariable Long id,
            @RequestBody PersonRequest request) {
        return ResponseEntity.ok(personService.updatePerson(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerson(@PathVariable Long id) {
        personService.deletePerson(id);
        return ResponseEntity.noContent().build();
    }
}