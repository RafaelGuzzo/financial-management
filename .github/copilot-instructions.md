# Instruções gerais para o GitHub Copilot

Este repositório é um monorepo fullstack para gestão financeira pessoal.

## Visão geral

- Backend: Java 21 + Spring Boot 3.4.4 + Maven + PostgreSQL + Flyway + JWT + Actuator.
- Frontend: Angular 20 + TypeScript 5.9 + RxJS + CoreUI Admin Angular Template Free (baseado em https://github.com/coreui/coreui-free-angular-admin-template) + Bootstrap + ng2-charts.
- Infraestrutura: Docker Compose para execução do ambiente completo.

## Regras gerais

- Preserve a arquitetura existente e prefira alterações pequenas, focadas e compatíveis.
- Mantenha separação clara entre backend e frontend; evite acoplar demais as camadas.
- Siga os padrões já adotados no projeto: convenções de nomes, organização de pastas e estilo de código.
- Não altere a estrutura fundamental do projeto sem necessidade e sem validação.
- Não comite segredos nem arquivos locais sensíveis, como .env reais.

## Estrutura esperada

- backend/: aplicação Spring Boot com Maven.
- frontend/: aplicação Angular com npm.
- docker-compose.yml e arquivos de ambiente na raiz do repositório.

## Comandos principais

Backend:
```bash
cd backend
./mvnw test
./mvnw spring-boot:run
```

Frontend:
```bash
cd frontend
npm install
npm start
npm run build
```

## Boas práticas para contribuições

- Priorize legibilidade e consistência sobre soluções excessivamente complexas.
- Para mudanças de API, mantenha compatibilidade sempre que possível.
- Para mudanças de banco, prefira migrações Flyway em backend/src/main/resources/db/migration/.
- Para mudanças visuais ou de fluxo, valide o impacto no frontend e no backend relacionado.
- Quando possível, rode os testes ou builds relevantes antes de concluir a tarefa.

## Documentação do frontend

A documentação técnica do frontend está concentrada em docs/ e foi organizada para apoiar tanto manutenção quanto trabalho com agentes de IA:

- docs/frontend/01-visao-geral-arquitetura.md: visão geral da arquitetura, organização do frontend e uso do template CoreUI Admin Angular Free.
- docs/frontend/02-regras-de-negocio.md: regras de negócio observadas nas telas e serviços.
- docs/frontend/03-modelos-de-dominio.md: modelos usados no domínio financeiro da aplicação.
- docs/frontend/04-integracoes-externas.md: integrações com backend, sessão e bibliotecas externas.
- docs/specs/: diretório para especificações, fluxos e detalhes adicionais quando necessário.
