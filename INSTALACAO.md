# 🚀 Guia de Instalação e Execução

Este guia fornece instruções detalhadas para configurar e executar o Sistema de Gerenciamento Financeiro.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em seu sistema:

### Obrigatórios
- **Java Development Kit (JDK) 21** ou superior
- **Node.js 18+** e **npm**
- **PostgreSQL 14+**
- **Maven 3.8+**

### Opcionais (para execução com Docker)
- **Docker** 20.10+
- **Docker Compose** 2.0+

## Opção 1: Execução com Docker (Recomendado)

Esta é a forma mais simples de executar o sistema completo.

### Passo 1: Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` conforme necessário. As configurações padrão geralmente funcionam bem para desenvolvimento local.

### Passo 2: Iniciar os Containers

Execute o comando para construir e iniciar todos os serviços:

```bash
docker-compose up --build
```

Este comando irá:
- Criar o container do PostgreSQL
- Construir e iniciar o backend Spring Boot
- Construir e iniciar o frontend Angular
- Configurar a rede entre os containers

### Passo 3: Acessar a Aplicação

Após alguns minutos, a aplicação estará disponível:

- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:8080
- **PostgreSQL:** localhost:5432

### Passo 4: Fazer Login

Use as credenciais padrão:
- **Email:** admin@example.com
- **Senha:** admin123

### Comandos Úteis do Docker

```bash
# Parar os containers
docker-compose down

# Ver logs em tempo real
docker-compose logs -f

# Ver logs apenas do backend
docker-compose logs -f backend

# Ver logs apenas do frontend
docker-compose logs -f frontend

# Reconstruir apenas um serviço
docker-compose up --build backend

# Limpar volumes (remove dados do banco)
docker-compose down -v
```

## Opção 2: Execução Manual (Desenvolvimento)

Para desenvolvimento local sem Docker, siga estes passos:

### Passo 1: Configurar o Banco de Dados

#### 1.1 Criar o Banco de Dados

Conecte-se ao PostgreSQL e execute:

```sql
CREATE DATABASE financial_management;
```

#### 1.2 Criar Usuário (Opcional)

```sql
CREATE USER financial_user WITH PASSWORD 'sua_senha_segura';
GRANT ALL PRIVILEGES ON DATABASE financial_management TO financial_user;
```

### Passo 2: Configurar o Backend

#### 2.1 Navegar até a pasta do backend

```bash
cd backend
```

#### 2.2 Configurar application.properties

Edite o arquivo `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/financial_management
spring.datasource.username=postgres
spring.datasource.password=sua_senha

# JPA Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# Flyway Configuration
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true
spring.flyway.locations=classpath:db/migration

# JWT Configuration
jwt.secret=sua-chave-secreta-muito-longa-e-segura-aqui
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

#### 2.3 Instalar Dependências e Compilar

```bash
./mvnw clean install
```

Se estiver no Windows:
```bash
mvnw.cmd clean install
```

#### 2.4 Executar o Backend

```bash
./mvnw spring-boot:run
```

O backend estará disponível em: http://localhost:8080

Você pode verificar se está funcionando acessando:
- Health check: http://localhost:8080/actuator/health

### Passo 3: Configurar o Frontend

#### 3.1 Navegar até a pasta do frontend

```bash
cd frontend
```

#### 3.2 Instalar Dependências

```bash
npm install
```

Este processo pode levar alguns minutos na primeira vez.

#### 3.3 Configurar o Ambiente

Edite o arquivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

#### 3.4 Executar o Frontend

```bash
npm start
```

Ou:

```bash
ng serve
```

O frontend estará disponível em: http://localhost:4200

O navegador será aberto automaticamente.

### Passo 4: Fazer Login

Use as credenciais padrão:
- **Email:** admin@example.com
- **Senha:** admin123

## Verificação da Instalação

### Backend

Teste os endpoints da API:

```bash
# Health check
curl http://localhost:8080/actuator/health

# Login (deve retornar um token JWT)
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### Frontend

1. Acesse http://localhost:4200
2. Você deve ver a tela de login
3. Faça login com as credenciais padrão
4. Você deve ser redirecionado para a página inicial

## Solução de Problemas Comuns

### Problema: Erro de conexão com o banco de dados

**Sintoma:** Backend não inicia, erro "Connection refused" ou "FATAL: database does not exist"

**Solução:**
1. Verifique se o PostgreSQL está rodando:
   ```bash
   # Linux/Mac
   sudo systemctl status postgresql
   
   # Windows
   # Verifique no Gerenciador de Serviços
   ```

2. Verifique se o banco de dados existe:
   ```bash
   psql -U postgres -l
   ```

3. Verifique as credenciais no `application.properties`

### Problema: Porta 8080 já está em uso

**Sintoma:** Erro "Port 8080 is already in use"

**Solução:**
1. Encontre o processo usando a porta:
   ```bash
   # Linux/Mac
   lsof -i :8080
   
   # Windows
   netstat -ano | findstr :8080
   ```

2. Mate o processo ou altere a porta no `application.properties`:
   ```properties
   server.port=8081
   ```

### Problema: Erro ao instalar dependências do npm

**Sintoma:** Erros durante `npm install`

**Solução:**
1. Limpe o cache do npm:
   ```bash
   npm cache clean --force
   ```

2. Delete a pasta `node_modules` e `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   ```

3. Instale novamente:
   ```bash
   npm install
   ```

### Problema: Erro de CORS no frontend

**Sintoma:** Erro "CORS policy" no console do navegador

**Solução:**
1. Verifique se o backend está configurado para aceitar requisições do frontend
2. No backend, o arquivo `SecurityConfig.java` deve ter configuração CORS adequada
3. Verifique se a URL da API no frontend está correta

### Problema: Migrações Flyway falhando

**Sintoma:** Erro ao iniciar o backend relacionado ao Flyway

**Solução:**
1. Limpe o histórico do Flyway:
   ```sql
   DROP TABLE IF EXISTS flyway_schema_history;
   ```

2. Recrie o banco de dados:
   ```sql
   DROP DATABASE financial_management;
   CREATE DATABASE financial_management;
   ```

3. Reinicie o backend

## Configurações Avançadas

### Alterar a Porta do Backend

Edite `application.properties`:
```properties
server.port=8081
```

Não esqueça de atualizar a URL no frontend!

### Alterar a Porta do Frontend

Execute com a flag `--port`:
```bash
ng serve --port 4201
```

### Habilitar Logs SQL

Para ver as queries SQL executadas, edite `application.properties`:
```properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

### Configurar Profile de Produção

Crie `application-prod.properties`:
```properties
spring.datasource.url=jdbc:postgresql://seu-servidor:5432/financial_management
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
```

Execute com:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=prod
```

## Build para Produção

### Backend

```bash
cd backend
./mvnw clean package -DskipTests
```

O arquivo JAR estará em `target/financial-management-0.0.1-SNAPSHOT.jar`

Execute com:
```bash
java -jar target/financial-management-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd frontend
npm run build
```

Os arquivos estáticos estarão em `dist/frontend/browser/`

Sirva com qualquer servidor web (Nginx, Apache, etc.)

## Próximos Passos

Após a instalação bem-sucedida:

1. Explore a interface e funcionalidades
2. Cadastre suas próprias categorias
3. Adicione pessoas
4. Cadastre seus cartões
5. Comece a registrar suas despesas
6. Visualize os gráficos e relatórios

Para mais informações sobre as funcionalidades, consulte o arquivo `FUNCIONALIDADES.md`.

## Suporte

Se você encontrar problemas não listados aqui:

1. Verifique os logs do backend e frontend
2. Consulte a documentação do Spring Boot e Angular
3. Abra uma issue no repositório do projeto

## Referências

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Angular Documentation](https://angular.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
