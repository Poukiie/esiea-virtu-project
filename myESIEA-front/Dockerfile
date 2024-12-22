# Utiliser une image Node.js officielle
FROM node:18

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code source
COPY . .

# Exposer le port (port du frontend)
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
