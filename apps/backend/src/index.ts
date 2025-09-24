import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import type { CustomContext, CustomEnv } from '~/types/locals'
import { env } from '~/env'

const port = Number(process.env.PORT) || 8080
const app = new Hono<CustomEnv>()

app.use(cors())

app.get('/', (c) => {
  return c.text(`Hello Hono! in env: ${env.NODE_ENV}`)
})

if (process.env.NODE_ENV === 'localhost') {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`)
}

app.onError((e, c: CustomContext) => {
  console.error('Error:', e)
  return c.text('Internal Server Error', 500)
})

serve({
  fetch: app.fetch,
  port,
})
