# Use a imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de dependências
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que a aplicação utiliza
EXPOSE 5173

# Comando para iniciar a aplicação
CMD ["npm", "start"]
