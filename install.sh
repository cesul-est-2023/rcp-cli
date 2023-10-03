#!/bin/bash

if ! command -v npm &> /dev/null
then
    echo "npm não encontrado. Instale Node.js e tente novamente."
    exit 1
fi

echo "Instalando as dependências do projeto..."
npm install

if [ $? -ne 0 ]; then
    echo "Erro ao instalar as dependências!"
    exit 1
fi

echo "Tornando o CLI disponível..."
npm link

if [ $? -ne 0 ]; then
    echo "Erro ao configurar o CLI."
    exit 1
fi

echo "rcp-cli instalado com sucesso!"
