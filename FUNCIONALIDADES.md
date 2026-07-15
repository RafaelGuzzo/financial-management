# 📋 Funcionalidades Implementadas

Este documento detalha todas as funcionalidades implementadas no Sistema de Gerenciamento Financeiro.

## ✅ Funcionalidades Principais

### 1. Gestão de Despesas

#### Listagem de Despesas
- Visualização em tabela com todas as despesas do mês selecionado
- Filtros por mês e ano
- Exibição de informações completas:
  - Data da despesa
  - Descrição
  - Valor em reais (formatado)
  - Categoria
  - Pessoa responsável
  - Forma de pagamento
  - Cartão utilizado (quando aplicável)
  - Informação de parcelas (X/Y)

#### Adição de Despesas
- Botão "Adicionar Despesa" que cria uma nova linha na tabela
- Edição inline diretamente na tabela
- Campos disponíveis:
  - **Data**: Seletor de data
  - **Descrição**: Campo de texto livre
  - **Valor**: Campo numérico com 2 casas decimais
  - **Categoria**: Dropdown com categorias cadastradas
  - **Pessoa**: Dropdown com pessoas cadastradas
  - **Forma de Pagamento**: Dropdown com opções:
    - Dinheiro
    - Cartão de Crédito
    - PIX
    - Débito
  - **Cartão**: Dropdown habilitado apenas quando forma = Cartão de Crédito
  - **Parcelas**: Campo numérico (1-48) habilitado apenas para Cartão de Crédito

#### Edição de Despesas
- Clique no ícone de editar (lápis) para entrar no modo de edição
- Todos os campos se tornam editáveis inline
- Botões de ação:
  - ✓ (check) para salvar
  - ✗ (x) para cancelar
- Validações em tempo real

#### Exclusão de Despesas
- Clique no ícone de excluir (lixeira)
- Confirmação antes de excluir
- Atualização automática dos gráficos e totais

#### Parcelamento em Cartão de Crédito
- Ao cadastrar uma despesa com cartão de crédito e parcelas > 1:
  - A primeira parcela é criada na data informada
  - Parcelas subsequentes são criadas automaticamente nos meses seguintes
  - Cada parcela tem descrição atualizada: "Descrição (Parcela 2/12)"
  - Valor é dividido igualmente entre as parcelas
  - Todas as parcelas ficam vinculadas ao mesmo cartão e categoria

### 2. Gráficos de Pizza Interativos

#### Gráfico por Categoria
- Exibe distribuição percentual das despesas por categoria
- Cores personalizadas para cada categoria
- Tooltip mostra:
  - Nome da categoria
  - Valor em reais
  - Percentual do total
- Atualização automática ao modificar despesas

#### Gráfico por Pessoa
- Exibe distribuição de gastos por pessoa
- Cores diferenciadas automaticamente
- Tooltip mostra:
  - Nome da pessoa
  - Valor total gasto
  - Percentual do total
- Útil para controle de gastos compartilhados

#### Gráfico por Forma de Pagamento
- Exibe distribuição por método de pagamento
- Categorias:
  - Dinheiro
  - Cartão de Crédito
  - PIX
  - Débito
- Tooltip mostra valor e percentual
- Ajuda a entender preferências de pagamento

### 3. Cards de Resumo

#### Total de Despesas
- Card vermelho destacando o total gasto no mês
- Valor formatado em reais (R$)
- Atualização em tempo real

#### Resumo por Categoria
- Lista todas as categorias com gastos
- Valor individual por categoria
- Formatação em moeda brasileira

#### Resumo por Pessoa
- Lista todas as pessoas com gastos
- Valor individual por pessoa
- Útil para divisão de contas

#### Resumo por Forma de Pagamento
- Lista formas de pagamento utilizadas
- Valor total por forma
- Ajuda no planejamento financeiro

### 4. Cadastro de Pessoas

#### Funcionalidades
- Listagem em tabela paginada
- Adicionar nova pessoa
- Editar pessoa existente
- Excluir pessoa
- Validação: nome obrigatório

#### Interface
- Formulário modal/inline
- Campos:
  - Nome (obrigatório)
- Ações:
  - Botão "Adicionar Pessoa"
  - Ícones de editar e excluir em cada linha
- Paginação configurável (5, 10, 20 itens)

### 5. Cadastro de Categorias

#### Funcionalidades
- Listagem em tabela paginada
- Adicionar nova categoria
- Editar categoria existente
- Excluir categoria
- Seletor de cor para identificação visual

#### Interface
- Formulário inline
- Campos:
  - Nome (obrigatório)
  - Cor (seletor de cor HTML5)
- Visualização da cor na tabela
- Paginação configurável

#### Categorias Padrão
O sistema vem com categorias pré-cadastradas:
- Alimentação (#FF5733)
- Transporte (#33FF57)
- Moradia (#3357FF)
- Lazer (#F033FF)
- Saúde (#33FFF5)
- Educação (#FF33F5)

### 6. Cadastro de Cartões

#### Funcionalidades
- Listagem em tabela paginada
- Adicionar novo cartão
- Editar cartão existente
- Excluir cartão
- Vinculação com pessoa titular

#### Interface
- Formulário inline
- Campos:
  - Nome do cartão (obrigatório)
  - Pessoa titular (dropdown, obrigatório)
  - Dia de fechamento da fatura (1-31)
  - Dia de vencimento da fatura (1-31)
- Exibição do nome da pessoa na listagem
- Paginação configurável

### 7. Autenticação e Segurança

#### Sistema de Login
- Autenticação via JWT
- Tela de login com email e senha
- Token armazenado no localStorage
- Interceptor HTTP para adicionar token automaticamente
- Redirecionamento automático se não autenticado

#### Usuário Padrão
- Email: admin@example.com
- Senha: admin123
- Criado automaticamente na primeira execução

#### Segurança
- Senhas criptografadas com BCrypt
- Tokens JWT com expiração configurável
- Rotas protegidas no backend
- Guards no frontend

## 🎨 Interface do Usuário

### Design
- Framework CoreUI 5 para componentes
- Bootstrap 5 para layout responsivo
- Angular Material para componentes adicionais
- Ícones CoreUI Icons
- Design moderno e limpo

### Responsividade
- Layout adaptável para desktop, tablet e mobile
- Tabelas com scroll horizontal em telas pequenas
- Gráficos redimensionáveis
- Menu lateral colapsável

### Experiência do Usuário
- Feedback visual em todas as ações
- Mensagens de sucesso e erro (toasts)
- Confirmações antes de exclusões
- Loading states durante requisições
- Validações em tempo real

## 🔄 Fluxo de Dados

### Backend → Frontend
1. API REST retorna dados em JSON
2. Services Angular fazem requisições HTTP
3. Componentes recebem dados via Observables
4. Interface é atualizada automaticamente

### Frontend → Backend
1. Usuário interage com formulários
2. Dados são validados no frontend
3. Requisição HTTP é enviada
4. Backend valida e processa
5. Resposta é retornada
6. Interface é atualizada

## 📊 Relatórios

### Relatório Mensal
Endpoint: `GET /api/reports/monthly?year=2024&month=12`

Retorna:
```json
{
  "year": 2024,
  "month": 12,
  "totalExpenses": 5432.10,
  "expensesByCategory": {
    "Alimentação": 1200.50,
    "Transporte": 800.00,
    "Moradia": 2000.00
  },
  "expensesByPerson": {
    "João": 3000.00,
    "Maria": 2432.10
  },
  "expensesByCard": {
    "Nubank": 1500.00,
    "C6 Bank": 800.00
  },
  "expensesByPaymentMethod": {
    "CREDIT_CARD": 2300.00,
    "PIX": 1500.00,
    "CASH": 1632.10
  }
}
```

## 🔧 Validações Implementadas

### Despesas
- ✅ Valor deve ser maior que zero
- ✅ Data é obrigatória
- ✅ Descrição é obrigatória
- ✅ Categoria é obrigatória
- ✅ Pessoa é obrigatória
- ✅ Forma de pagamento é obrigatória
- ✅ Cartão obrigatório quando forma = Cartão de Crédito
- ✅ Parcelas entre 1 e 48

### Categorias
- ✅ Nome obrigatório
- ✅ Cor obrigatória

### Pessoas
- ✅ Nome obrigatório

### Cartões
- ✅ Nome obrigatório
- ✅ Pessoa titular obrigatória
- ✅ Dia de fechamento entre 1 e 31
- ✅ Dia de vencimento entre 1 e 31

## 🚀 Melhorias Implementadas

### Performance
- Lazy loading de módulos
- Paginação no backend
- Índices no banco de dados
- Cache de dados estáticos

### Usabilidade
- Edição inline na tabela
- Filtros rápidos por mês/ano
- Feedback visual imediato
- Confirmações de ações destrutivas

### Manutenibilidade
- Código modular e organizado
- Separação de responsabilidades
- Componentes reutilizáveis
- Documentação inline

## 📈 Métricas e KPIs

O sistema permite acompanhar:
- Total de gastos mensais
- Distribuição por categoria
- Gastos por pessoa
- Preferências de pagamento
- Evolução temporal (com filtros)
- Identificação de padrões de consumo

## 🎯 Casos de Uso Principais

1. **Controle de Gastos Pessoais**
   - Registrar todas as despesas diárias
   - Visualizar onde o dinheiro está sendo gasto
   - Identificar oportunidades de economia

2. **Gestão de Gastos Compartilhados**
   - Cadastrar múltiplas pessoas
   - Atribuir despesas a cada pessoa
   - Visualizar distribuição de gastos
   - Facilitar acerto de contas

3. **Controle de Cartões de Crédito**
   - Cadastrar múltiplos cartões
   - Registrar compras parceladas
   - Acompanhar faturas futuras
   - Evitar surpresas no vencimento

4. **Análise de Padrões de Consumo**
   - Visualizar gastos por categoria
   - Identificar categorias com maior gasto
   - Comparar diferentes períodos
   - Tomar decisões baseadas em dados

## 🔮 Próximas Funcionalidades (Sugestões)

- [ ] Receitas (além de despesas)
- [ ] Transferências entre contas
- [ ] Orçamento por categoria
- [ ] Alertas de gastos excessivos
- [ ] Exportação para Excel/PDF
- [ ] Gráficos de evolução temporal
- [ ] Dashboard com múltiplos períodos
- [ ] Importação de extratos bancários
- [ ] Metas de economia
- [ ] Comparativo mensal/anual
- [ ] Notificações de vencimentos
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)
