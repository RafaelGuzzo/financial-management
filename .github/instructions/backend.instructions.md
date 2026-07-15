# Instruções Específicas para o Backend (Java/Spring Boot)

Este arquivo contém instruções detalhadas para o GitHub Copilot ao trabalhar no diretório `backend/` do projeto `financial-management`.

## Visão Geral do Módulo

O módulo `backend/` é uma API RESTful desenvolvida com Spring Boot 3 e Java 21. Ele gerencia a lógica de negócios, persistência de dados (PostgreSQL) e autenticação (JWT) para a aplicação de gerenciamento financeiro.

## Tecnologias Específicas

- **Linguagem:** Java 21
- **Framework:** Spring Boot 3
- **Build Tool:** Maven
- **Banco de Dados:** PostgreSQL
- **ORM:** Spring Data JPA
- **Migrações de Banco de Dados:** Flyway
- **Segurança:** Spring Security, JWT
- **Validação:** Spring Validation
- **Utilitários:** Lombok

## Estrutura de Diretórios e Convenções

O diretório `backend/src/main/java/br/guzzo/financialmanagement/` segue a estrutura padrão de pacotes Spring Boot:
- `controller/`: Contém os controladores REST para as APIs.
- `service/`: Contém a lógica de negócios e orquestração.
- `repository/`: Contém as interfaces de repositório para acesso a dados (Spring Data JPA).
- `model/`: Contém as entidades de domínio (JPA).
- `dto/`: Contém os Data Transfer Objects para requisições e respostas.
- `config/`: Contém configurações de segurança, JWT, etc.
- `exception/`: Contém classes de exceção personalizadas e handlers.

## Comandos de Build e Teste

### Build Completo
Para compilar, empacotar e executar testes do backend:
```bash
cd backend
mvn clean install
```

### Executar Aplicação
Para iniciar a aplicação Spring Boot localmente:
```bash
cd backend
mvn spring-boot:run
```

### Executar Testes
Para executar apenas os testes unitários e de integração:
```bash
cd backend
mvn test
```

## Boas Práticas e Considerações

- **Padrões de Design:** Adira aos princípios SOLID e aos padrões de design comuns em aplicações Spring Boot (e.g., injeção de dependência, inversão de controle).
- **Tratamento de Erros:** Utilize as classes de exceção e o `ApplicationExceptionHandler` existentes para um tratamento de erros consistente.
- **Segurança:** Ao implementar novas funcionalidades, considere sempre os aspectos de segurança, especialmente autenticação e autorização via JWT.
- **Persistência:** Utilize Spring Data JPA para interagir com o banco de dados. Para alterações de schema, crie novas migrações Flyway em `backend/src/main/resources/db/migration/`.
- **Lombok:** Utilize as anotações do Lombok (`@Data`, `@Builder`, `@NoArgsConstructor`, `@AllArgsConstructor`) para reduzir código boilerplate em DTOs e entidades.
- **Logging:** Utilize o sistema de logging padrão do Spring Boot para depuração e monitoramento.
