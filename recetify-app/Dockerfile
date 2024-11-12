# Usa la imagen oficial de Node.js versión 18 como base
FROM node:18

# Crea el directorio /usr/src/app dentro del contenedor
RUN mkdir -p /usr/src/app

# Establece /usr/src/app como el directorio de trabajo
WORKDIR /usr/src/app

COPY package*.json ./

# Instala las dependencias definidas en package.json
RUN npm install

COPY . .

# Expone el puerto 3000 para que la aplicación sea accesible
EXPOSE 3000

# Define el comando por defecto para iniciar la aplicación
CMD ["npm","start"]