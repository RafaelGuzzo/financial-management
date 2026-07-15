# AGENTS.md

Este arquivo fornece contexto e instruções para agentes de codificação de IA trabalharem no projeto `financial-management`.

## Visão Geral do Projeto

O `financial-management` é uma aplicação fullstack para gerenciamento financeiro pessoal, estruturada como um monorepo. Ele consiste em um backend (Spring Boot com Java) e um frontend (Angular), com um ambiente de execução completo via Docker Compose.

### Tecnologias Principais

**Backend (Java/Spring Boot):**
- **Linguagem:** Java 21
- **Framework:** Spring Boot 3
- **Gerenciador de Dependências:** Maven
- **Banco de Dados:** PostgreSQL (com Flyway para migrações)
- **Autenticação:** JWT
- **Monitoramento:** Actuator

**Frontend (Angular):**
- **Framework:** Angular 19
- **Ambiente de Execução:** Node 22
- **Servidor de Produção:** Nginx

**Infraestrutura:**
- Docker e Docker Compose para orquestração de containers.

## Estrutura do Projeto

O projeto é um monorepo com as seguintes pastas principais:
- `backend/`: Contém a API Java Spring Boot.
- `frontend/`: Contém a aplicação Angular e a configuração do Nginx.
- `docker-compose.yml`: Define os serviços Docker para o ambiente completo.

## Comandos de Setup e Execução

### Configuração do Ambiente
1. Copie o arquivo `.env.example` para `.env` na raiz do projeto:
   ```bash
   cp .env.example .env
   ```
   **Importante:** Não comite o arquivo `.env` real, pois ele pode conter credenciais e segredos.

### Execução com Docker Compose
Para construir e iniciar todos os serviços (PostgreSQL, backend e frontend):
```bash
docker-compose up --build
```

**Acesso às Aplicações:**
- **Frontend:** `http://localhost:4200`
- **Backend API:** `http://localhost:8080`

### Desenvolvimento Local (fora do Docker)

**Backend:**
1. Navegue até a pasta `backend`:
   ```bash
   cd backend
   ```
2. Execute a aplicação Spring Boot:
   ```bash
   ./mvnw spring-boot:run
   ```

**Frontend:**
1. Navegue até a pasta `frontend`:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento Angular:
   ```bash
   ng serve --open
   ```

## Convenções de Código e Estilo

- **Backend (Java):** Seguir as convenções de código padrão do Spring Boot e Java. Utiliza Lombok para reduzir boilerplate.
- **Frontend (Angular):** Seguir as convenções de código padrão do Angular e TypeScript.

## Instruções de Teste

- **Backend:** Os testes unitários e de integração são executados como parte do ciclo de build do Maven. Podem ser executados via `./mvnw test` na pasta `backend`.
- **Frontend:** Os testes Angular podem ser executados via `ng test` na pasta `frontend`.

## Observações Adicionais

- O banco de dados PostgreSQL é inicializado automaticamente pelo Docker Compose.
- O Flyway executa migrações de banco de dados automaticamente ao iniciar o backend.
- O frontend está configurado para consumir a API do backend em `http://backend:8080` dentro da rede Docker.
