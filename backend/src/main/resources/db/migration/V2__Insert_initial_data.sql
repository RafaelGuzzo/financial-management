-- Insere categorias padrão
INSERT INTO categories (name, color, created_at, updated_at)
VALUES
    ('Alimentação', '#FF5733', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Transporte', '#33FF57', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Moradia', '#3357FF', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Lazer', '#F033FF', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Saúde', '#33FFF5', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Educação', '#FF33F5', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insere usuário admin padrão (senha: admin123)
INSERT INTO users (name, email, password, role, created_at, updated_at)
VALUES (
    'Admin',
    'admin@example.com',
    '$2a$12$CSv6WPn4fS23ZQXiMZCWMevprmRvkReCl2FRG4TIVFhz2XiyXVnwq',
    'ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);