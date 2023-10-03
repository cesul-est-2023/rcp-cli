@echo off

npm -v >nul 2>&1
IF ERRORLEVEL 1 (
    echo nnpm não encontrado. Instale Node.js e tente novamente.
    exit /b 1
)

echo Instalando as dependências do projeto...
npm install
IF ERRORLEVEL 1 (
    echo Erro ao instalar as dependências!
    exit /b 1
)

echo Tornando o CLI disponível...
npm link
IF ERRORLEVEL 1 (
    echo Erro ao configurar o CLI.
    exit /b 1
)

echo rcp-cli instalado com sucesso!
