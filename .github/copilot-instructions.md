# Instruções Gerais para o GitHub Copilot

Este arquivo fornece diretrizes gerais para o GitHub Copilot ao interagir com o repositório `financial-management`.

## Visão Geral do Repositório

O projeto `financial-management` é uma aplicação fullstack de gerenciamento financeiro pessoal, desenvolvida como um monorepo. Ele é composto por um backend em Java com Spring Boot e um frontend em Angular. A infraestrutura é orquestrada via Docker Compose, garantindo um ambiente de desenvolvimento e execução consistente.

## Objetivos para o Copilot

- **Reduzir Erros de Build e Teste:** O Copilot deve se esforçar para gerar código que seja compatível com os padrões de build e teste do projeto, minimizando falhas de integração contínua.
- **Acelerar o Desenvolvimento:** O Copilot deve fornecer sugestões de código e refatorações que se alinhem com a arquitetura e as convenções do projeto, reduzindo a necessidade de exploração manual.
- **Manter a Consistência:** As contribuições do Copilot devem aderir aos estilos de código e padrões de design estabelecidos para cada parte do monorepo (Java/Spring Boot para o backend, Angular para o frontend).

## Limitações

- As instruções devem ser concisas e diretas, focando em informações essenciais para o desenvolvimento.
- O Copilot não deve realizar alterações que modifiquem a estrutura fundamental do projeto sem validação explícita.

## Informações de Alto Nível

- **Tamanho do Repositório:** Médio.
- **Tipo de Projeto:** Aplicação fullstack monorepo.
- **Linguagens:** Java, TypeScript, HTML, CSS.
- **Frameworks:** Spring Boot (Backend), Angular (Frontend).
- **Ferramentas de Build:** Maven (Backend), npm/Angular CLI (Frontend).
- **Banco de Dados:** PostgreSQL.
- **Orquestração:** Docker, Docker Compose.

## Instruções de Build e Validação

### Ambiente Docker (Recomendado)

Para construir e executar o projeto completo, incluindo backend, frontend e banco de dados:

1. **Configurar Variáveis de Ambiente:** Copie `.env.example` para `.env` na raiz do projeto.
   ```bash
   cp .env.example .env
   ```
2. **Iniciar Serviços:** Execute o Docker Compose na raiz do projeto.
   ```bash
   docker-compose up --build
   ```
   **Validação:** Verifique se o frontend está acessível em `http://localhost:4200` e o backend em `http://localhost:8080`.

### Backend (Desenvolvimento Local)

1. **Navegar para o Diretório:** `cd backend`
2. **Executar:** `./mvnw spring-boot:run`
   **Validação:** A API deve estar disponível em `http://localhost:8080`.

### Frontend (Desenvolvimento Local)

1. **Navegar para o Diretório:** `cd frontend`
2. **Instalar Dependências:** `npm install`
3. **Executar:** `ng serve --open`
   **Validação:** A aplicação Angular deve abrir no navegador em `http://localhost:4200`.

## Layout do Projeto e Arquitetura

- **Raiz do Repositório:** Contém `backend/`, `frontend/`, `docker-compose.yml`, `.env.example`, `README.md`.
- **`backend/`:** Aplicação Spring Boot. Segue a estrutura padrão de projetos Maven/Spring Boot (e.g., `src/main/java/br/guzzo/financialmanagement/controller`, `src/main/java/br/guzzo/financialmanagement/service`, `src/main/java/br/guzzo/financialmanagement/repository`, `src/main/resources`).
- **`frontend/`:** Aplicação Angular. Segue a estrutura padrão de projetos Angular (e.g., `src/app`, `src/assets`, `angular.json`, `package.json`).

## Fluxo de Trabalho e Validação

- **Testes:** Sempre que uma alteração for proposta, o Copilot deve considerar a execução dos testes relevantes (Maven para backend, Angular CLI para frontend) para garantir a integridade do código.
- **Linting:** Adere aos padrões de linting configurados para Java e TypeScript.
- **Revisão de Código:** As alterações devem ser compatíveis com as diretrizes de revisão de código e não introduzir regressões.
