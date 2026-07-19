# 3. Modelos de Domínio

## Modelo principal: Expense

Representa uma despesa cadastrada pelo usuário.

Campos principais:

- id: identificador da despesa;
- value: valor da despesa;
- description: descrição da despesa;
- date: data da despesa;
- installment: número da parcela, quando aplicável;
- currentInstallment: parcela atual, quando houver informações adicionais;
- isRecurring: indica se a despesa é recorrente;
- dueDate: data de vencimento, especialmente usada para cartões;
- isToReceive: indica se a despesa é uma conta a receber;
- paymentMethod: forma de pagamento;
- categoryId: identificador da categoria;
- personId: identificador da pessoa;
- cardId: identificador do cartão, quando aplicável.

## Categoria

Representa uma categoria de gasto.

Campos:

- id;
- name;
- color.

## Pessoa

Representa a pessoa vinculada à despesa.

Campos:

- id;
- name.

## Cartão

Representa um cartão de crédito ou débito associado a uma pessoa.

Campos:

- id;
- name;
- invoiceDueDate: dia de vencimento da fatura;
- invoiceClosingDate: dia de fechamento da fatura;
- personId: identificação da pessoa dona ou responsável pelo cartão.

## Relatório mensal

Representa a estrutura retornada pela API de relatórios.

Campos:

- year;
- month;
- totalExpenses;
- expensesByPerson;
- expensesByCategory;
- expensesByCard;
- expensesByPaymentMethod;
- totalToReceive.

## Autenticação

### AuthResponse

Usado no fluxo de login e cadastro.

Campos esperados:

- accessToken;
- refreshToken, quando aplicável;
- dados do usuário.

### User

Modelo mínimo usado na tela inicial para representar o usuário autenticado.
