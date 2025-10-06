-- Tabela de usuários (users)
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pessoas (persons)
CREATE TABLE persons (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias (categories)
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de cartões (cards)
CREATE TABLE cards (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    invoice_due_date INT NOT NULL,
    invoice_closing_date INT NOT NULL,
    person_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de despesas (expenses)
CREATE TABLE expenses (
    id BIGSERIAL PRIMARY KEY,
    value DECIMAL(19,4) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    installment INT,
    current_installment INT,
    is_recurring BOOLEAN DEFAULT false,
    payment_method VARCHAR(20) NOT NULL,
    category_id BIGINT NOT NULL,
    person_id BIGINT NOT NULL,
    card_id BIGINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Adiciona constraints de chave estrangeira
ALTER TABLE cards ADD CONSTRAINT fk_card_person
    FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE CASCADE;

ALTER TABLE expenses ADD CONSTRAINT fk_expense_category
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE;

ALTER TABLE expenses ADD CONSTRAINT fk_expense_person
    FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE CASCADE;

ALTER TABLE expenses ADD CONSTRAINT fk_expense_card
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE SET NULL;

-- Adiciona constraints de unicidade
ALTER TABLE users ADD CONSTRAINT uk_user_email UNIQUE (email);

-- Adiciona índices para melhorar performance
CREATE INDEX idx_card_person ON cards(person_id);
CREATE INDEX idx_expense_category ON expenses(category_id);
CREATE INDEX idx_expense_person ON expenses(person_id);
CREATE INDEX idx_expense_card ON expenses(card_id);
CREATE INDEX idx_expense_date ON expenses(date);