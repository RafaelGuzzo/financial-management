# 1. Visão Geral da Arquitetura

## Objetivo da aplicação

O frontend do projeto é uma aplicação Angular SPA para gestão financeira pessoal, com foco em:

- cadastro e acompanhamento de despesas;
- organização por categorias, pessoas e cartões;
- visualização de relatórios mensais;
- autenticação baseada em JWT.

## Estrutura principal do frontend

A aplicação está organizada sob o diretório src/app com uma separação clara entre:

- componentes de interface inspirados no CoreUI Admin Angular Template Free;
- componentes de tela: auth, home, expenses, cards, categories, persons, reports;
- serviços de acesso a API: expense.service, category.service, person.service, card.service, report.service;
- modelos compartilhados: expense, category, person, card, report-response, auth-response;
- utilidades comuns: guards, interceptors, layout e componentes compartilhados.

## Padrões arquiteturais observados

### 1. Componentes standalone

A aplicação usa Angular standalone components, o que reduz a necessidade de módulos de feature e facilita a composição de componentes reutilizáveis.

### 2. Serviços como camada de integração

Os serviços fazem a comunicação com o backend via HttpClient. Eles são fornecidos em nível raiz, seguindo o padrão Angular de injeção.

### 3. Rotas protegidas

As rotas principais são protegidas por authGuard, que valida a presença de um token válido antes de liberar o acesso. O fluxo de autenticação é centralizado em AuthService.

### 4. Interceptação de erros

O interceptor de erro padroniza a experiência para respostas 401, 403 e demais falhas. Isso evita duplicação de tratamento em cada componente.

## Fluxos principais

### Autenticação

- Login e cadastro são telas independentes.
- O token de acesso é armazenado no localStorage.
- O estado de login é gerenciado via BehaviorSubject em AuthService.

### Dashboard e despesas

- A tela Home concentra o calendário mensal, a listagem de despesas e os gráficos.
- A seleção de mês/ano controla a consulta de despesas e relatórios.
- O componente ExpenseCharts exibe gráficos por categoria, pessoa e forma de pagamento.

### Cadastros auxiliares

- Cards, Categories e Persons possuem telas e serviços próprios.
- Esses dados servem como base para o cadastro de despesas.

## Tecnologias e bibliotecas principais

- Angular 20
- RxJS
- Bootstrap e CoreUI para layout e componentes
- Angular Material para feedback e interações
- ng2-charts + Chart.js para visualização
- Angular Router para navegação

## Pontos de extensão

A arquitetura atual favorece a extensão por:

- inclusão de novas telas em rotas protegidas;
- criação de novos serviços para recursos adicionais;
- reutilização de modelos e interceptors;
- evolução para um estado mais centralizado, se o app crescer.
