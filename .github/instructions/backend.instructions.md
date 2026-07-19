# Instruções específicas para o backend

Este arquivo orienta alterações no módulo backend do projeto.

## Stack atual

- Java 21
- Spring Boot 3.4.4
- Maven
- Spring Data JPA
- PostgreSQL + Flyway
- Spring Security + JWT
- Validation + Lombok

## Convenções de desenvolvimento

- Mantenha a organização em camadas sob backend/src/main/java/br/guzzo/financialmanagement/.
- Prefira a estrutura: controller -> service -> repository -> entity/dto.
- Use injeção por construtor e evite campos públicos desnecessários.
- Valide entradas com Bean Validation e trate erros de forma consistente.
- Para mudanças de persistência, adicione migrações Flyway em backend/src/main/resources/db/migration/.
- Use DTOs para expor ou receber dados da API e evite expor entidades diretamente quando não for necessário.
- Preserve segurança e autenticação; mudanças em rotas protegidas devem considerar JWT e permissões.

## Comandos úteis

```bash
cd backend
./mvnw -q -DskipTests compile
./mvnw test
./mvnw spring-boot:run
```

## Critérios de qualidade

- Alterações pequenas e bem isoladas são preferíveis.
- Testes devem ser ajustados ou adicionados quando a mudança afetar comportamento.
- Mantenha nomes, estilo e organização consistentes com o restante do código.
- Evite introduzir novas dependências sem justificativa clara.
