# Use uma imagem base do Node.js
FROM node:22

RUN apt-get update && apt-get install -y iputils-ping inetutils-traceroute net-tools dnsutils iproute2

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm ci --production

# Build app
#RUN npm run build --production

# Expose port
EXPOSE 3333

ENTRYPOINT ["./entrypoint.sh"]