import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg' // Використовуй дефолтний імпорт для стабільності в ESM
import * as dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg
const connectionString = process.env.DATABASE_URL

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// Створюємо клієнт з адаптером
const prisma = new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error']
})

export default prisma