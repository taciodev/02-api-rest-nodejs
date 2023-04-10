// import crypto from 'node:crypto'
import fastify from 'fastify'
import { env } from './.env/index'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server is running')
  })
