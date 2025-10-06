package br.guzzo.financialmanagement.service;

import br.guzzo.financialmanagement.dto.request.PersonRequest;
import br.guzzo.financialmanagement.dto.response.PersonResponse;
import br.guzzo.financialmanagement.model.Person;
import br.guzzo.financialmanagement.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PersonService {
    private final PersonRepository personRepository;

    public PersonResponse createPerson(PersonRequest request) {
        Person person = new Person();
        person.setName(request.getName());
        Person savedPerson = personRepository.save(person);
        return mapToResponse(savedPerson);
    }

    public List<PersonResponse> getAllPersons() {
        return personRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public PersonResponse getPersonById(Long id) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found"));
        return mapToResponse(person);
    }

    public PersonResponse updatePerson(Long id, PersonRequest request) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found"));
        person.setName(request.getName());
        Person updatedPerson = personRepository.save(person);
        return mapToResponse(updatedPerson);
    }

    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }

    private PersonResponse mapToResponse(Person person) {
        return PersonResponse.builder()
                .id(person.getId())
                .name(person.getName())
                .build();
    }
}