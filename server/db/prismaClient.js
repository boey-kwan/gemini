import env from 'dotenv'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log:
			env.NODE_ENV === 'development'
				? ['query', 'error', 'warn']
				: ['error'],
	})

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
