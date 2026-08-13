# Ping Ping

A Discord reminder service that lets users connect their Discord account,
select a Discord channel, and schedule reminders that are delivered through
a Discord bot.

## Why I Built This

I wanted a simple, custom notification system that I could use for me and with my
friends instead of relying on generic reminder apps that has I have no control over it.

The goal was to build something small but practical while also exploring
how background jobs, Redis, BullMQ, Discord OAuth2, and Discord bots could
work together in a real application.

## Features

- User authentication
- Connect Discord account via OAuth2
- Select a Discord server and channel
- Create scheduled reminders
- Update and delete reminders
- Background reminder processing with BullMQ
- Redis-backed job queue
- Discord message delivery
- PostgreSQL persistence
- Docker-based local development

## Screenshots

### Discord Notification

![Discord Notification](docs/images/demo-1.gif)

## Tech Stack

### Backend

- Node.js
- TypeScript
- Express
- Drizzle ORM
- PostgreSQL
- Redis
- BullMQ
- Discord.js
- Better Auth
- Zod

### Frontend

- React
- TypeScript
- Vite
- ...

## Architecture

```text
Client
  │
  ▼
Express API
  │
  ├── Better Auth
  │
  ├── Reminder Service
  │      │
  │      ├── PostgreSQL
  │      │
  │      └── BullMQ
  │             │
  │             ▼
  │           Redis
  │             │
  │             ▼
  │        Reminder Worker
  │             │
  │             ▼
  │        Discord.js
  │             │
  │             ▼
  │        Discord Channel
  │
  └── Discord OAuth
```
````

## How It Works

1. User creates an account.
2. User connects their Discord account using OAuth2.
3. User selects a Discord server and channel.
4. User creates a reminder.
5. The reminder is stored in PostgreSQL.
6. A delayed BullMQ job is created.
7. Redis stores/manages the job.
8. The reminder worker processes the job when it becomes due.
9. The worker retrieves the reminder and Discord connection.
10. Discord.js sends the reminder to the selected channel.

## Getting Started

### Prerequisites

- Node.js
- Docker
- PostgreSQL
- Redis
- Discord Developer Application

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd ping-ping
```

Install dependencies:

```bash
npm install
```

Start PostgreSQL and Redis:

```bash
docker compose up -d
```

Create your environment file:

```bash
cp .env.example .env
```

Configure your environment variables.

### Database

Generate migrations:

```bash
npm run db:generate
```

Run migrations:

```bash
npm run db:migrate
```

### Development

Start the API:

```bash
npm run dev
```

Start the reminder worker:

```bash
npm run worker
```

## Environment Variables

Create a `.env` file based on `.env.example`.

```env
PORT=3000

REDIS_HOST=localhost
REDIS_PORT=6379

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ping-ping

DISCORD_BOT_TOKEN=
DISCORD_CLIENT_ID=
DISCORD_APP_ID=
DISCORD_CLIENT_SECRET=
DISCORD_REDIRECT_URI=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

TRUSTED_ORIGINS=
NODE_ENV=development
```

> Never commit `.env` or real Discord credentials to the repository.

## API

### Authentication

```http
POST /api/auth/sign-up/email
POST /api/auth/sign-in/email
GET  /api/auth/session
POST /api/auth/sign-out
```

### Discord

```http
GET    /api/discord/invite
GET    /api/discord/me
GET    /api/discord/guilds
GET    /api/discord/guilds/channels
```

### Discord Connections

```http
POST   /api/discord/connections
GET    /api/discord/connections
PATCH  /api/discord/connections/channel
DELETE /api/discord/connections
```

### Reminders

```http
POST   /api/reminders
GET    /api/reminders
GET    /api/reminders/:id
PATCH  /api/reminders/:id
DELETE /api/reminders/:id
```

## Background Jobs

Ping Ping uses BullMQ and Redis to process scheduled reminders asynchronously.

When a reminder is created:

```text
ReminderService
      │
      ▼
PostgreSQL
      │
      ▼
BullMQ
      │
      ▼
Redis
      │
      ▼
Reminder Worker
      │
      ▼
Discord Delivery Service
      │
      ▼
Discord
```

Jobs are identified using constants such as:

```ts
SEND_REMINDER_JOB = "send-reminder"
```

This allows additional background jobs to be added without putting all processing logic inside the worker.

## Discord Integration

Ping Ping uses Discord OAuth2 to allow users to connect their Discord account and select where reminders should be delivered.

The application stores the Discord connection associated with the user, including:

- Discord user ID
- Guild ID
- Channel ID
- Access token
- Refresh token
- Token expiration

The Discord bot is responsible for actually delivering messages.

## Example Reminder

```json
{
    "title": "Morning Run",
    "message": "Time to go running!",
    "scheduledAt": "2026-08-13T11:30:00.000Z"
}
```

The reminder is persisted in PostgreSQL and scheduled through BullMQ.

## Future Improvements

- [ ] Rich Discord embeds
- [ ] Reminder recurrence
- [ ] Reminder templates
- [ ] Interactive Discord buttons
