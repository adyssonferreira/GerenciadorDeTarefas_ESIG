FROM node:20-alpine AS build
WORKDIR /app

# Instala o Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia apenas arquivos de dependências primeiro
COPY package*.json ./
RUN npm ci

# Copia o código fonte
COPY . .

# Build de produção (aplica fileReplacements)
RUN ng build --configuration=production

# Estágio de produção
FROM nginx:alpine
COPY --from=build /app/dist/gerenciador-tarefas/browser /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/mime.types /etc/nginx/mime.types

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]