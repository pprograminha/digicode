# DIGITAL REPUBLIC CODE CHALLENGE

## Para iniciar o projeto, execute os seguintes comandos:

**-- web**

Instale as dependências:
```zsh 
pnpm install
```
Inicie o NextJS:
```zsh
pnpm dev
// npm run dev
// yarn dev
```


**-- server**

Copie o .env.example em .env:
```zsh 
cp .env.example .env
```
Inicie o container Postgres:
```zsh 
docker-compose up -d
```
Instale as dependências:
```zsh 
pnpm install
```
Execute as migrations do Prisma ORM:
```zsh
pnpm prisma migrate dev
// npx prisma migrate dev
// yarn prisma migrate dev
```
Execute as seeders do Prisma ORM:
```zsh
pnpm prisma db seed
// npx prisma db seed
// yarn prisma db seed
```
Inicie servidor:
```zsh
pnpm dev
// npm run dev
// yarn dev
```