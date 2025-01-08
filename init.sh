#!/bin/bash

# Variáveis de conexão
DB_USER="admin"
DB_PASSWORD="admin123"
DB_NAME="app"
DB_HOST="localhost"
DB_PORT="5432"

# Executa o create.sql no banco de dados
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -f /tmp/create.sql
