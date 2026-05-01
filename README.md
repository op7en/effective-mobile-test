# User Service API

REST API сервис для управления пользователями с авторизацией и ролевым доступом.

## Стек

- Node.js + TypeScript
- Express
- PostgreSQL + Prisma ORM
- JWT + bcrypt
- Zod (валидация)
- Railway (деплой)

## Запуск локально

```bash
git clone https://github.com/op7en/effective-mobile-test
cd effective-mobile-test
npm install
# Создай .env по примеру .env.example
npx prisma migrate dev
npm run dev
```

## Переменные окружения

```env
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
```

## Эндпоинты

### Auth

| Метод | URL                | Описание    |
| ----- | ------------------ | ----------- |
| POST  | /api/auth/register | Регистрация |
| POST  | /api/auth/login    | Авторизация |

### Users (требуют Bearer токен)

| Метод | URL                  | Доступ                     |
| ----- | -------------------- | -------------------------- |
| GET   | /api/users/:id       | Админ или сам пользователь |
| GET   | /api/users           | Только админ               |
| PATCH | /api/users/:id/block | Админ или сам пользователь |

## Продакшн

https://effective-mobile-test-production.up.railway.app
