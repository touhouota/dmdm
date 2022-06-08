FROM node:slim
WORKDIR /usr/src/app
RUN npm install @google/clasp -g