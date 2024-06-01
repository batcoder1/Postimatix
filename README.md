# Multimode volume generator

## Set environment variables

To run in local, you have to set the environment variables on docker-compose.yml file
```bash
   environment:
      - NODE_ENV=production
      - OWNER=$OWNER
      - OWNER_PK=$OWNER_PK
```

To run in cloud, the environment variables have to be set on cloud platform and must be encrypted

## Build container

```bash
  docker-compose build
```

## Start container

```bash
 docker-compose up -d
```
