import z from 'zod'

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
})

export const env = env.Schema.parse(process.env)
