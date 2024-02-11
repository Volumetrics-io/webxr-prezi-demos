# Docker container to run sample project
# To run provide your certificates as secret keys
FROM node:lts-bullseye

ENV DEBIAN_FRONTEND=noninteractive
RUN apt update -qqy && apt upgrade -qqy
RUN npm install -g http-server
WORKDIR /app
ENTRYPOINT ["http-server", "-S", "-C", "cert.pem", "-K", "key.pem", "-o"]
