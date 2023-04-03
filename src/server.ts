// import crypto from 'node:crypto'
import fastify from 'fastify'
import { knex } from './database'
import { env } from './.env/index'

const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions').select('*')
  return transaction
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server is running')
  })
