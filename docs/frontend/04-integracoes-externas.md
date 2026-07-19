# 4. Integrações Externas

## 1. Backend REST

A camada frontend integra-se com um backend REST exposto em URL configurada em environment.ts.

Endpoint base:

- http://localhost:8080/api

## 2. Endpoints principais consumidos

### Autenticação

- POST /auth/authenticate
- POST /auth/register
- POST /auth/refresh

### Despesas

- POST /expenses
- PUT /expenses/:id
- GET /expenses/date-range
- DELETE /expenses/:id

### Categorias

- GET /categories
- GET /categories/:id
- POST /categories
- PUT /categories/:id
- DELETE /categories/:id

### Pessoas

- GET /persons
- GET /persons/:id
- POST /persons
- PUT /persons/:id
- DELETE /persons/:id

### Cartões

- GET /cards
- GET /cards/person/:personId
- GET /cards/:id
- POST /cards
- PUT /cards/:id
- DELETE /cards/:id

### Relatórios

- GET /reports/monthly?year=...&month=...

## 3. Persistência de sessão

O token de acesso é armazenado em localStorage pelo AuthService. Esse mecanismo é usado para manter a sessão do usuário no navegador.

## 4. Tratamento de erros

O interceptor de erro padroniza respostas HTTP, especialmente:

- 401: expiração/invalidade de sessão;
- 403: acesso não autorizado;
- demais erros: exibição de mensagem amigável via snackbar.

## 5. Bibliotecas visuais e de gráficos

Além do backend, a aplicação depende de bibliotecas externas para interface e visualização:

- CoreUI para componentes de UI;
- Bootstrap para estilos e grid;
- Angular Material para feedback e seleção;
- ng2-charts e Chart.js para gráficos.

## 6. Observações

Atualmente, a aplicação não apresenta integrações com serviços externos de pagamento, cloud ou terceiros além do backend próprio e das bibliotecas de UI/visualização.
