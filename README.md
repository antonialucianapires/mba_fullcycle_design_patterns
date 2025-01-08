### Instalar dependências
Execute o comando `yarn install`

### Executar aplicação e testes

#### Banco de dados
1. Execute o comando `docker-compose up -d` para criar um container do postgres.
2. Entrar no container com o comando  `docker exec -it postgres-container bash` e executar `psql -U admin -d app`

#### Testes
Execute o comando `npx jest`