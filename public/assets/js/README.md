# Mega-Sena API e Frontend

Este projeto consiste em uma aplicação web para consultar resultados da Mega-Sena. Ele inclui um backend Node.js com Express e PostgreSQL para gerenciar os dados dos concursos, e um frontend simples em JavaScript para exibir os resultados.

## Funcionalidades Atuais

- **Consulta do Último Concurso**: Exibe os detalhes do concurso mais recente da Mega-Sena.
- **Consulta por Número de Concurso**: Permite buscar os detalhes de qualquer concurso da Mega-Sena pelo seu número.
- **Formatação de Dados**: Apresenta a data do sorteio e os valores monetários em formatos localizados (português do Brasil).

## Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express.js
  - PostgreSQL (como banco de dados)
  - `dotenv` (para gerenciamento de variáveis de ambiente)
- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (Vanilla JS)

## Configuração do Projeto

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)
- PostgreSQL (servidor de banco de dados)

### Instalação

1.  **Clone o repositório**:

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd mega-sena
    ```

2.  **Instale as dependências do backend**:

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente**:
    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

    ```
    DB_USER=seu_usuario_postgres
    DB_HOST=localhost
    DB_DATABASE=seu_banco_de_dados
    DB_PASSWORD=sua_senha_postgres
    DB_PORT=5432
    PORT=3005 # Porta para o servidor Express
    ```

4.  **Configure o banco de dados PostgreSQL**:
    Crie um banco de dados e uma tabela `megasena` conforme a estrutura necessária para armazenar os dados dos concursos. Você precisará popular esta tabela com os dados dos sorteios da Mega-Sena.

### Execução

Para iniciar o servidor backend:

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000` (ou na porta que você configurou em `PORT`).

## Endpoints da API

- `GET /api`: Retorna os dados do último concurso da Mega-Sena.
- `GET /api/:concurso`: Retorna os dados de um concurso específico, onde `:concurso` é o número do concurso.

## Entrega Futura: Consulta de Palpite

Uma funcionalidade planejada para o futuro é a **Consulta de Palpite**. Esta funcionalidade permitirá que o usuário insira uma sequência de 6 números (um palpite) e a aplicação irá verificar em todos os concursos já registrados no banco de dados quantas vezes esse palpite teria acertado 4, 5 ou 6 dezenas.

**Detalhes da Funcionalidade:**

- O usuário poderá inserir seus 6 números através de um formulário no frontend.
- O backend receberá esses números e fará uma varredura em todos os concursos históricos.
- Para cada concurso, será contabilizado o número de acertos (4, 5 ou 6 dezenas) do palpite do usuário.
- O resultado exibirá a contagem total de vezes que o palpite teria ganhado na quadra, quina e sena.
