package br.guzzo.financialmanagement.repository;

import br.guzzo.financialmanagement.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}