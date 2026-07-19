# AGENTS.md

Este arquivo reúne as instruções principais para agentes de IA que trabalharem neste repositório.

## Contexto do projeto

O projeto é um monorepo com:
- backend/: API REST em Java/Spring Boot.
- frontend/: aplicação Angular.
- docker-compose.yml: ambiente completo com PostgreSQL, backend e frontend.

## Regras de contribuição

- Prefira mudanças pequenas, claras e compatíveis com o que já existe.
- Antes de criar novos arquivos, verifique se já existe uma abstração adequada.
- Mantenha consistência entre backend e frontend, especialmente em contratos de API.
- Não adicione dependências novas sem necessidade comprovada.
- Não versione segredos ou arquivos de ambiente locais.

## Como validar alterações

Backend:
```bash
cd backend
./mvnw test
```

Frontend:
```bash
cd frontend
npm install
npm run build
```

## Pontos de atenção

- O backend usa Flyway para migrações de banco; novas alterações de schema devem seguir esse fluxo.
- O frontend usa Angular 20 e componentes standalone; siga esse padrão quando possível.
- O ambiente Docker é a forma mais simples de validar o fluxo completo do projeto.
