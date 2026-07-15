# Instruções Específicas para o Frontend (Angular)

Este arquivo contém instruções detalhadas para o GitHub Copilot ao trabalhar no diretório `frontend/` do projeto `financial-management`.

## Visão Geral do Módulo

O módulo `frontend/` é uma aplicação web desenvolvida com Angular 19 e TypeScript. Ele fornece a interface do usuário para o sistema de gerenciamento financeiro, consumindo a API do backend. A aplicação é empacotada para produção usando Nginx.

## Tecnologias Específicas

- **Framework:** Angular 19
- **Linguagem:** TypeScript
- **Gerenciador de Pacotes:** npm
- **Ferramentas:** Angular CLI
- **UI Framework:** Angular Material, CoreUI
- **Gráficos:** Chart.js, ng2-charts
- **Servidor de Produção:** Nginx

## Estrutura de Diretórios e Convenções

O diretório `frontend/src/app/` segue a estrutura padrão de projetos Angular:
- `app/`: Contém os módulos, componentes, serviços e rotas da aplicação.
- `assets/`: Contém recursos estáticos como imagens, ícones, etc.
- `environments/`: Contém configurações de ambiente (desenvolvimento, produção).
- `styles/`: Contém arquivos de estilo globais.

## Comandos de Build e Teste

### Instalar Dependências
Para instalar todas as dependências do projeto:
```bash
cd frontend
npm install
```

### Executar Aplicação em Desenvolvimento
Para iniciar o servidor de desenvolvimento Angular:
```bash
cd frontend
ng serve --open
```

### Build para Produção
Para construir a aplicação para produção (os arquivos estáticos serão gerados em `frontend/dist/`):
```bash
cd frontend
ng build --configuration production
```

### Executar Testes
Para executar os testes unitários da aplicação Angular:
```bash
cd frontend
ng test
```

## Boas Práticas e Considerações

- **Componentização:** Siga o padrão de componentização do Angular, criando componentes reutilizáveis e bem definidos.
- **Serviços:** Utilize serviços para lógica de negócios e comunicação com a API do backend, mantendo os componentes focados na apresentação.
- **Rotas:** Gerencie a navegação da aplicação usando o roteador Angular.
- **Gerenciamento de Estado:** Considere o uso de padrões de gerenciamento de estado (e.g., RxJS, NGRX) para aplicações mais complexas.
- **Estilização:** Utilize SCSS ou CSS para estilização, seguindo as convenções do projeto (e.g., BEM, módulos CSS).
- **Consumo de API:** A aplicação frontend consome a API do backend. Certifique-se de que as chamadas HTTP estejam configuradas corretamente para o ambiente de desenvolvimento e produção (dentro do Docker, o backend é acessível via `http://backend:8080`).
- **Otimização:** Ao realizar builds de produção, o Angular CLI já aplica otimizações como tree-shaking e minificação. Considere otimizações adicionais para imagens e outros assets.
