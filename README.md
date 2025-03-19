# Front Markts Todo V2

Este é o repositório do projeto **Front Markts Todo V2**. Abaixo estão as instruções para rodar o projeto utilizando Docker.

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Como rodar o projeto

Siga os passos abaixo para rodar o projeto:

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/front-markts-todo-v2.git
   cd front-markts-todo-v2
   ```
2. Construa e inicie os containers Docker:

   ```bash
   docker-compose up --build 
   	ou 
   docker compose up --build
   ```
3. Acesse o projeto no navegador:

   O projeto estará disponível em `http://localhost:3000` (ou na porta configurada no `docker-compose.yml`).

## Comandos úteis

- **Parar os containers**:

  ```bash
  docker-compose down
  ```
- **Reiniciar os containers**:

  ```bash
  docker-compose restart
  ```
- **Acessar o terminal de um container**:

  ```bash
  docker exec -it nome-do-container bash
  ```

## Estrutura do Projeto

- `src/`: Código-fonte do projeto.
- `docker-compose.yml`: Configuração do Docker Compose.
- `Dockerfile`: Configuração do container Docker.

## Tecnologias envolvidas no 

- Vite
- React.js
- Tailwind
- Typescript
- ESLint
- Docker

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
