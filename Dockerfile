FROM node:14.3.0

WORKDIR /opt/app/

COPY backend/package*.json ./
RUN npm install --no-optional

COPY backend/src src/

COPY frontend/build public/

EXPOSE 3004

CMD ["node", "src/index.js"]
