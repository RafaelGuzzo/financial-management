package br.guzzo.financialmanagement.repository;

import br.guzzo.financialmanagement.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByPersonId(Long personId);
}