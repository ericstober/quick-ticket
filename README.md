# QuickTicket Support System

A simple support ticket system built with Next.js, TypeScript, Prisma ORM, Neon Postgres database, and Sentry for error tracking and performance monitoring.

## Features

- Create, view, and manage support tickets
- User authentication with JWT tokens
- Track errors and performance using Sentry
- Responsive design with Tailwind CSS
- Secure session handling with HttpOnly cookies
- Built with modern Next.js App Router & Server Actions

## Technologies

- **Next.js (App Router)**
- **TypeScript**
- **Prisma ORM**
- **Neon.tech (Postgres Database)**
- **Tailwind CSS**
- **Sentry (Error & Performance Monitoring)**

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/eric-stober/quick-ticket
cd quickticket
```

Install dependencies:

```bash
npm install
```

#### Sentry Setup

Create a new Sentry Project and run the Wizard command it gives you. This will create a new .env-sentry-plugin file. Rename it to .env. This will have your Sentry Auth Token in it.

#### Neon Database Setup

Create a Neon Postgres database and add the connection string to your .env file:

```bash
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=require"
```

#### Auth Setup

Add an auth secret to your .env file. You can run the following command to generate one:

```bash
openssl rand -hex 32
```

Then add it to your .env file:

```bash
NEXTAUTH_SECRET="<your_secret>"
```

#### Prisma Setup

Run the following command to generate the Prisma client and create the database tables:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

#### Run the App

Run the development server:

```bash
npm run dev
```
