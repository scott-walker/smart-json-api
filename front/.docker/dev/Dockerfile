FROM node:alpine

WORKDIR /app

# COPY . .
# COPY ./.docker/dev/entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# Make it easier 🙃😇
RUN apk add --no-cache bash && echo "alias ll='ls -lah'" >> /root/.bashrc

ENTRYPOINT ["/entrypoint.sh"]
