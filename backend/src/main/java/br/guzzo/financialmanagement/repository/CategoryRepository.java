package br.guzzo.financialmanagement.repository;

import br.guzzo.financialmanagement.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}