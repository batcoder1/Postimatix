# Postimatix

Bot that creates social media posts using AI

## Set environment variables

To run in local, you have to set the environment variables on docker-compose.yml file
```bash
    environment:
      - NODE_ENV=production
      - OWNER=$OWNER
      - OWNER_PK=$OWNER_PK
      - OPENAI_API_KEY=$OPENAI_API_KEY
      - TWITTER_USERNAME=$TWITTER_USERNAME
      - X_APP_KEY=$X_APP_KEY
      - X_APP_SECRET=$X_APP_SECRET
      - X_ACCESS_TOKEN=$X_ACCESS_TOKEN
      - X_ACCESS_SECRET=$X_ACCESS_SECRET
      - LINKEDIN_TOKEN=$LINKEDIN_TOKEN
      - INSTAGRAM_ACCESS_TOKEN=$INSTAGRAM_ACCESS_TOKEN
      - INSTAGRAM_API_VERSION=$INSTAGRAM_API_VERSION
```


## Build container

```bash
  docker-compose build
```

## Start container

```bash
 docker-compose up -d
```
