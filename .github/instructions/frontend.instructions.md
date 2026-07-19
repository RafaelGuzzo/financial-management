# Instruções específicas para o frontend

Este arquivo orienta alterações no módulo frontend do projeto.

## Stack atual

- Angular 20
- TypeScript 5.9
- RxJS
- Angular Material + CoreUI
- Chart.js + ng2-charts
- Bootstrap 5

## Convenções de desenvolvimento

- Prefira componentes standalone e organização por feature em frontend/src/app/.
- Mantenha componentes focados em apresentação; use serviços para comunicação com a API.
- Reutilize modelos e serviços existentes antes de criar novas abstrações.
- Consuma configurações de ambiente a partir de frontend/src/environments/.
- Estilos devem seguir a estrutura atual, preferindo arquivos SCSS próximos ao contexto do componente ou ao estilo global em frontend/src/scss/.
- O frontend é baseado no CoreUI Admin Angular Template Free (https://github.com/coreui/coreui-free-angular-admin-template). Ao ajustar layout, componentes visuais, cards, tabelas ou navegação, preserve a estética e os padrões do template.
- Ao alterar contratos de API, ajuste o consumo no frontend e valide o impacto nas telas afetadas.

## Comandos úteis

```bash
cd frontend
npm install
npm start
npm run build
npm test
```

## Critérios de qualidade

- Mantenha mudanças pequenas e consistentes com o padrão existente.
- Evite duplicação de lógica e de templates.
- Valide builds e testes quando a mudança afetar comportamento visual ou de fluxo.
- Preserve acessibilidade e experiência do usuário.
