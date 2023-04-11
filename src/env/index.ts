import { config } from 'dotenv'
import { z as Schema } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = Schema.object({
  NODE_ENV: Schema.enum(['development', 'test', 'production']).default(
    'production',
  ),
  DATABASE_URL: Schema.string(),
  PORT: Schema.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Invalid enviroment variables!', _env.error.format())
  throw new Error('Invalid enviroment variables!')
}

export const env = _env.data
