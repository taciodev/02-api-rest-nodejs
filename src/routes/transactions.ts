import { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'
import { z as Schema } from 'zod'
import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = Schema.object({
      title: Schema.string(),
      amount: Schema.number(),
      type: Schema.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send()
  })
}
