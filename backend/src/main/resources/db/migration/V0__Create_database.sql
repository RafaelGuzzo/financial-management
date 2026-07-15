DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'financialmanagement') THEN
        CREATE DATABASE financialmanagement;
    END IF;
END
$$;