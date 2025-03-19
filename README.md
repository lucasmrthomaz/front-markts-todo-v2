# Front Markts Todo V2

Este é o repositório do projeto **Front Markts Todo V2**. Abaixo estão as instruções para rodar o projeto utilizando Docker.

## Prévia
![image](https://github.com/user-attachments/assets/8388c5e8-6986-405b-ae05-30e68113c079)
![image](https://github.com/user-attachments/assets/03f99f29-f1e4-4ca0-8209-bed15cc5ba16)
![image](https://github.com/user-attachments/assets/45cc2b39-8405-4ab5-b2b1-ae32d5fb16a1)

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
