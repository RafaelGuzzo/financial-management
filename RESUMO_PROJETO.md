# 📊 Resumo Executivo - Sistema de Gerenciamento Financeiro

## Vocação do projeto

Este projeto é uma aplicação fullstack voltada ao controle financeiro pessoal e compartilhado, com foco em simplicidade, clareza e acompanhamento rápido de gastos. A proposta central é permitir que o usuário registre despesas, acompanhe tendências e tome decisões com base em dados organizados.

## Público-alvo

- Pessoas que desejam controlar despesas do dia a dia.
- Famílias ou grupos que dividem gastos.
- Usuários que precisam de uma visão rápida de categorias, pessoas e formas de pagamento.

## Stack e arquitetura

### Backend
- Java 21 + Spring Boot 3.4.4
- Maven, Spring Data JPA, Spring Security, JWT e Flyway
- PostgreSQL como banco principal
- Estrutura em camadas para separação clara entre API, regras de negócio e persistência

### Frontend
- Angular 20 + TypeScript 5.9
- CoreUI, Bootstrap, Angular Material e ng2-charts
- Interface responsiva para uso em diferentes dispositivos

## Valor entregue

- Cadastro, edição e exclusão de despesas com validações claras
- Controle por categoria, pessoa, forma de pagamento e cartão
- Parcelamento em cartão de crédito com acompanhamento mensal
- Resumos e gráficos interativos para análise rápida
- Autenticação baseada em JWT para acesso controlado

## Pontos fortes

- Interface intuitiva e com feedback visual
- Estrutura modular e organizada para evolução
- Separação entre backend e frontend, favorecendo manutenção
- Documentação e configuração básica para execução local ou com Docker

## Evolução recomendada

- Adicionar módulo de receitas para visão completa do fluxo financeiro
- Implementar metas e orçamento por categoria
- Criar relatórios históricos mais completos e exportação de dados
- Expandir a experiência para uso mobile ou offline
