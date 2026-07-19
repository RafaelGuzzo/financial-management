# 2. Regras de Negócio

## 1. Autenticação e autorização

- O usuário precisa estar autenticado para acessar as telas principais.
- O acesso é controlado por authGuard.
- Se o token expira ou é inválido, a aplicação encerra a sessão e redireciona para a tela de login.

## 2. Cadastro de despesas

Uma despesa deve conter, no mínimo:

- descrição;
- valor maior que zero;
- categoria;
- pessoa;
- forma de pagamento.

Além disso:

- o valor deve ser positivo;
- pagamento em cartão de crédito exige a seleção de um cartão;
- a criação e atualização de despesas são feitas a partir do mesmo fluxo de edição da tela Home.

## 3. Tratamento de cartões de crédito

Quando a forma de pagamento é cartão de crédito e há um cartão selecionado, a aplicação calcula automaticamente a data de vencimento com base em:

- data da compra;
- fechamento da fatura do cartão;
- data de vencimento do cartão.

Esse cálculo é realizado no frontend antes do envio da despesa ao backend.

## 4. Parcelamento e recorrência

A interface suporta:

- parcelamento via campo installment;
- recorrência via flag isRecurring.

Esses dados são enviados ao backend junto com a despesa.

## 5. Despesas a receber

A aplicação permite marcar uma despesa como "a receber" através da flag isToReceive. Esse conceito é relevante para a visão de relatórios e organização financeira.

## 6. Organização por entidades auxiliares

As despesas estão vinculadas a entidades auxiliares:

- categoria;
- pessoa;
- cartão.

Essas entidades são mantidas separadamente e usadas para estruturar melhor a análise financeira.

## 7. Relatórios mensais

O sistema permite consultar um relatório mensal com base em:

- ano;
- mês.

O relatório inclui:

- total de despesas;
- despesas por pessoa;
- despesas por categoria;
- despesas por cartão;
- despesas por forma de pagamento;
- valor total a receber.

## 8. Interação com a interface

A tela principal permite:

- mudar o mês e o ano de exibição;
- editar e salvar despesas inline;
- excluir despesas;
- navegar para a tela de criação/edição de despesas.
