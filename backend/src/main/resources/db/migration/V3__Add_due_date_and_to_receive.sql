-- Adicionar campos dueDate e isToReceive na tabela expenses
ALTER TABLE expenses ADD COLUMN due_date DATE;
ALTER TABLE expenses ADD COLUMN is_to_receive BOOLEAN DEFAULT FALSE;

-- Atualizar despesas existentes para ter is_to_receive como false
UPDATE expenses SET is_to_receive = FALSE WHERE is_to_receive IS NULL;
