import crypto from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z as Schema } from 'zod'
import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select()
    return {
      transactions,
    }
  })

  app.get('/:id', async (request) => {
    const getTransactionParamsSchema = Schema.object({
      id: Schema.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(request.params)

    const transactions = await knex('transactions').where('id', id).first()
    return {
      transactions,
    }
  })

  app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return {
      summary,
    }
  })

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
