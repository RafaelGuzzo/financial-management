# 💰 Financial Management

Aplicação fullstack (Java + Angular) para gerenciamento financeiro pessoal.  
Projeto estruturado em **monorepo**, com pastas separadas para o **backend (Spring Boot)** e o **frontend (Angular)**, e ambiente completo de execução via **Docker Compose**.

---

## 🚀 Tecnologias

### 🔹 Backend
- Java 21  
- Spring Boot 3  
- Maven  
- PostgreSQL  
- Flyway (migrações automáticas)
- JWT (autenticação)
- Actuator (monitoramento de health check)

### 🔹 Frontend
- Angular 19  
- Node 22  
- Nginx (servidor de build de produção)

### 🔹 Infraestrutura
- Docker  
- Docker Compose  
- Rede isolada entre containers  
- Variáveis de ambiente via `.env`

---

## 📂 Estrutura do projeto

```
financial-management/
│
├── backend/          # API Java Spring Boot
│   ├── src/
│   ├── Dockerfile
│   ├── pom.xml
│   └── ...
│
├── frontend/         # Aplicação Angular + Nginx
│   ├── src/
│   ├── Dockerfile
│   └── ...
│
├── docker-compose.yml
├── .env.example       # Exemplo de variáveis de ambiente
└── README.md
```

---

## ⚙️ Configuração do ambiente

Antes de subir a aplicação, copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

> ⚠️ **Não comite seu arquivo `.env` real!**  
> Ele pode conter credenciais e segredos locais.

---

## 🐳 Execução com Docker

Para construir e subir todos os serviços (PostgreSQL, backend e frontend):

```bash
docker-compose up --build
```

Os containers subirão automaticamente com a rede configurada.

### 🔸 Acesso às aplicações

| Serviço   | URL de acesso            |
|------------|--------------------------|
| Frontend   | http://localhost:4200    |
| Backend API | http://localhost:8080    |
| PostgreSQL | localhost:5432 (Docker)  |

---

## 🧩 Variáveis de ambiente principais

| Variável | Descrição | Valor padrão |
|-----------|------------|---------------|
| `POSTGRES_USER` | Usuário do banco | postgres |
| `POSTGRES_PASSWORD` | Senha do banco | postgres |
| `POSTGRES_DB` | Nome do banco | financialmanagement |
| `BACKEND_PORT` | Porta da API | 8080 |
| `FRONTEND_PORT` | Porta do app | 4200 |
| `JWT_SECRET` | Segredo do token JWT | (valor no .env) |

---

## 🧠 Observações

- O banco **PostgreSQL** é inicializado automaticamente com o banco definido em `POSTGRES_DB`.  
- O **Spring Boot** usa o profile `prod` por padrão, configurado via `application-prod.properties`.  
- O **Flyway** executa migrações automaticamente ao subir o container.  
- O frontend consome a API em `http://backend:8080` dentro da rede Docker.

---

## 🧪 Desenvolvimento local (opcional)

Se quiser rodar apenas o backend ou frontend localmente, fora do Docker:

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
ng serve --open
```

---

## 📝 Licença

Distribuído sob a licença MIT.  
Sinta-se livre para usar, modificar e contribuir. 💡

---

### 💻 Autor
**Rafael Guzzo**  
Desenvolvedor Back-end | Java, Spring, Angular  
📍 Brasil  
🔗 [github.com/RafaelGuzzo](https://github.com/RafaelGuzzo)
