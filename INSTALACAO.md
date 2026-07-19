# 🚀 Guia de Instalação e Execução

## Vocação deste documento

Este guia tem como objetivo orientar a instalação, configuração e validação do projeto em ambientes locais ou com Docker, de forma simples e reproduzível.

## Pré-requisitos

### Obrigatórios
- Java 21 ou superior
- Maven 3.8+ ou wrapper do projeto
- Node.js 18+ e npm
- PostgreSQL 14+ (ou uso via Docker)

### Opcionais
- Docker e Docker Compose para execução completa do ambiente

## Opção 1: Execução com Docker (recomendada)

### 1. Criar o arquivo de ambiente

```bash
cp .env.example .env
```

> O arquivo `.env` deve permanecer local e não deve ser versionado.

### 2. Subir os serviços

```bash
docker-compose up --build
```

### 3. Acessar a aplicação

- Frontend: http://localhost:4200
- Backend: http://localhost:8080
- PostgreSQL: localhost:5432

### 4. Login inicial

- E-mail: admin@example.com
- Senha: admin123

## Opção 2: Execução local sem Docker

### 1. Preparar o banco de dados

Crie um banco PostgreSQL e ajuste as credenciais conforme o ambiente local.

### 2. Backend

```bash
cd backend
./mvnw test
./mvnw spring-boot:run
```

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

## Validação básica

### Backend

```bash
curl http://localhost:8080/actuator/health
```

### Frontend

Acesse http://localhost:4200 e confirme que a tela de login é carregada corretamente.

## Troubleshooting

### Problemas com banco de dados
- Verifique se o PostgreSQL está ativo.
- Confirme se as credenciais no arquivo de configuração batem com o ambiente.
- Veja os logs do backend para identificar migrações ou conexão com o banco.

### Porta ocupada
- Se a porta 8080 ou 4200 estiver em uso, altere a configuração local antes de iniciar os serviços.

### Dependências do frontend
- Se ocorrer erro ao instalar pacotes, limpe o cache do npm e reinstale as dependências.

## Boas práticas

- Mantenha o arquivo `.env` local e sem commit.
- Use o Docker para validar o fluxo completo sempre que possível.
- Antes de entregar alterações, teste o backend e o frontend afetados.

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
